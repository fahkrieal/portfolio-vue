<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const containerRef = ref(null)
const cardAssemblyRef = ref(null)
const glareRef = ref(null)

// Physics & Interaction State
let isDragging = false
let startPointerX = 0
let startPointerY = 0

// Position, Velocity & Rotation Values
let posX = 0
let posY = 0
let velX = 0
let velY = 0

// Mouse Hover Tilt (Smoothed)
let hoverTiltX = 0
let hoverTiltY = 0
let currentTiltX = 0
let currentTiltY = 0

// Restrained Physical Spring Constants
const springK = 0.08      // Restoring force stiffness
const damping = 0.84      // Air resistance / inertia damping

let rafId = null
let observer = null
let isVisible = true
let prefersReducedMotion = false
let isTouchDevice = false

// Pointer Drag Event Handlers (Desktop Only)
const onPointerDown = (e) => {
  if (isTouchDevice || prefersReducedMotion) return
  if (e.button !== 0) return // Only primary mouse button

  isDragging = true
  startPointerX = e.clientX - posX
  startPointerY = e.clientY - posY

  if (containerRef.value) {
    try {
      containerRef.value.setPointerCapture(e.pointerId)
    } catch {
      // Ignore if pointer capture fails
    }
  }
}

const onPointerMove = (e) => {
  if (isTouchDevice || prefersReducedMotion) return

  if (isDragging) {
    const rawX = e.clientX - startPointerX
    const rawY = e.clientY - startPointerY

    // Elastic distance constraint (Prevents unnatural stretching)
    const maxDistance = 160
    const dist = Math.hypot(rawX, rawY)
    if (dist > maxDistance) {
      const angle = Math.atan2(rawY, rawX)
      posX = Math.cos(angle) * maxDistance + (rawX - Math.cos(angle) * maxDistance) * 0.15
      posY = Math.sin(angle) * maxDistance + (rawY - Math.sin(angle) * maxDistance) * 0.15
    } else {
      posX = rawX
      posY = rawY
    }
  } else {
    // Subtle Physical 3D Tilt on Hover
    if (!cardAssemblyRef.value) return
    const rect = cardAssemblyRef.value.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Restrained rotation limits (max ±12 degrees)
    hoverTiltY = ((mouseX - centerX) / centerX) * 12
    hoverTiltX = -((mouseY - centerY) / centerY) * 12

    // Specular Sheen Glare
    if (glareRef.value) {
      const gx = (mouseX / rect.width) * 100
      const gy = (mouseY / rect.height) * 100
      glareRef.value.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, 0.22) 0%, transparent 60%)`
    }
  }
}

const onPointerUp = (e) => {
  if (isDragging) {
    isDragging = false
    try {
      if (containerRef.value && containerRef.value.hasPointerCapture(e.pointerId)) {
        containerRef.value.releasePointerCapture(e.pointerId)
      }
    } catch {
      // Ignore if already released
    }
  }
}

const onPointerLeave = () => {
  hoverTiltX = 0
  hoverTiltY = 0
  if (glareRef.value) {
    glareRef.value.style.background = 'transparent'
  }
}

// Main Physics Simulation Loop
const updatePhysics = (currentTime) => {
  if (!isVisible || prefersReducedMotion) {
    rafId = requestAnimationFrame(updatePhysics)
    return
  }

  if (!isDragging) {
    // Idle Natural Micro-Gravity Sway
    const idleSway = Math.sin(currentTime * 0.0015) * 1.5

    // Hooke's Law Restoring Spring Force
    const forceX = -springK * (posX - idleSway)
    const forceY = -springK * posY

    velX = (velX + forceX) * damping
    velY = (velY + forceY) * damping

    posX += velX
    posY += velY

    // Smoothly interpolate hover tilt
    currentTiltX += (hoverTiltX - currentTiltX) * 0.12
    currentTiltY += (hoverTiltY - currentTiltY) * 0.12
  } else {
    velX = 0
    velY = 0
    currentTiltX += (hoverTiltX - currentTiltX) * 0.15
    currentTiltY += (hoverTiltY - currentTiltY) * 0.15
  }

  // Realistic dynamic pendulum rotation
  const swingAngle = (posX * 0.15 + velX * 0.35).toFixed(2)
  const totalRotX = (currentTiltX + posY * 0.05).toFixed(2)
  const totalRotY = (currentTiltY + posX * 0.07).toFixed(2)

  // Apply 3D Transform to Card Assembly
  if (cardAssemblyRef.value) {
    cardAssemblyRef.value.style.transform = `
      translate3d(${posX.toFixed(1)}px, ${posY.toFixed(1)}px, 0)
      rotateZ(${swingAngle}deg)
      rotateX(${totalRotX}deg)
      rotateY(${totalRotY}deg)
    `
  }

  // Update Dynamic SVG Lanyard Ribbon Geometry
  const strapSvg = containerRef.value?.querySelector('.lanyard-strap-svg')
  if (strapSvg) {
    const anchorX = 140
    const anchorY = 0
    const targetX = 140 + posX * 0.85
    const targetY = 125 + posY * 0.85

    const ctrlX = anchorX + posX * 0.25
    const ctrlY = anchorY + (targetY - anchorY) * 0.55

    const pathData = `M ${anchorX} ${anchorY} Q ${ctrlX} ${ctrlY} ${targetX} ${targetY}`
    const paths = strapSvg.querySelectorAll('.strap-path')
    paths.forEach((p) => p.setAttribute('d', pathData))

    const textPathCurve = strapSvg.querySelector('#strapCurve')
    if (textPathCurve) {
      textPathCurve.setAttribute('d', pathData)
    }
  }

  rafId = requestAnimationFrame(updatePhysics)
}

onMounted(() => {
  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  isTouchDevice = window.matchMedia('(hover: none) or (max-width: 768px)').matches

  // Pause when scrolled out of viewport
  if (containerRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(containerRef.value)
  }

  rafId = requestAnimationFrame(updatePhysics)
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (observer && containerRef.value) observer.disconnect()
})
</script>

<template>
  <div
    ref="containerRef"
    class="lanyard-container"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @mouseleave="onPointerLeave"
  >
    <!-- ==========================================================
         01 — LANYARD STRAP (Dynamic SVG with Restrained Typography)
         ========================================================== -->
    <svg
      class="lanyard-strap-svg"
      viewBox="0 0 280 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <!-- Strap Reference Curve for Text -->
        <path
          id="strapCurve"
          d="M 140 0 Q 140 62 140 125"
        />
        <!-- Metallic Gradient for Clip -->
        <linearGradient id="clipMetalGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#334155" />
          <stop offset="35%" stop-color="#94a3b8" />
          <stop offset="70%" stop-color="#cbd5e1" />
          <stop offset="100%" stop-color="#1e293b" />
        </linearGradient>
      </defs>

      <!-- 1. Soft Shadow Behind Strap -->
      <path
        class="strap-path"
        d="M 140 0 Q 140 62 140 125"
        stroke="rgba(0,0,0,0.85)"
        stroke-width="34"
        stroke-linecap="round"
      />

      <!-- 2. Dark Webbing Outer Ribbon Base -->
      <path
        class="strap-path"
        d="M 140 0 Q 140 62 140 125"
        stroke="#0d1017"
        stroke-width="28"
        stroke-linecap="round"
      />

      <!-- 3. Inner Fabric Texture Edge Binding -->
      <path
        class="strap-path"
        d="M 140 0 Q 140 62 140 125"
        stroke="#151922"
        stroke-width="24"
        stroke-linecap="round"
      />

      <!-- 4. Satin Center Sheen -->
      <path
        class="strap-path"
        d="M 140 0 Q 140 62 140 125"
        stroke="rgba(255,255,255,0.04)"
        stroke-width="12"
        stroke-linecap="round"
      />

      <!-- 5. Dual Fine Gold/Amber Border Stitching Lines -->
      <path
        class="strap-path"
        d="M 140 0 Q 140 62 140 125"
        stroke="rgba(229,168,91,0.3)"
        stroke-width="1.2"
        stroke-dasharray="3 3"
      />

      <!-- 6. Restrained Monospace Typography: FAHKRIE.DEV -->
      <text
        font-family="monospace"
        font-weight="700"
        font-size="9"
        letter-spacing="3.5px"
        fill="rgba(244,244,242,0.7)"
        dy="3.5"
      >
        <textPath
          href="#strapCurve"
          startOffset="26%"
          text-anchor="middle"
        >
          FAHKRIE.DEV
        </textPath>
      </text>
    </svg>

    <!-- ==========================================================
         02 — SUSPENDED ID CARD ASSEMBLY (Connector + Clip + Badge)
         ========================================================== -->
    <div
      ref="cardAssemblyRef"
      class="lanyard-card-assembly"
      :class="{ 'is-dragging': isDragging }"
    >
      <!-- Metallic Swivel Connector & Spring Hook Assembly -->
      <div class="swivel-connector-rig" aria-hidden="true">
        <!-- Top Strap Ring -->
        <div class="swivel-ring"></div>
        <!-- Swivel Metal Body & Rivet -->
        <div class="swivel-body">
          <div class="metal-highlight"></div>
          <div class="metal-rivet"></div>
        </div>
        <!-- Bottom Hook Clasp entering Card Punch Hole -->
        <div class="swivel-clasp-hook"></div>
      </div>

      <!-- Physical Identity Badge Surface (Matte Premium Coated Badge) -->
      <div class="id-badge-card">
        <!-- Dynamic Specular Glare Sheen Layer -->
        <div ref="glareRef" class="badge-glare-overlay" aria-hidden="true"></div>

        <!-- Top Header Bar -->
        <div class="badge-header-row font-mono">
          <div class="badge-status-dot-wrap">
            <span class="badge-pulse-dot"></span>
            <span>MF—001 // S07</span>
          </div>
          <span class="badge-inst-code">ITI.AC.ID</span>
        </div>

        <!-- High-Contrast Editorial Portrait Photo Box -->
        <div class="badge-photo-frame">
          <img
            src="/profile.jpg"
            alt="Muhamad Fahkrie Al Mufid"
            class="badge-photo-img"
            draggable="false"
            loading="eager"
          />
          <div class="photo-ambient-vignette"></div>
        </div>

        <!-- Identity Details & Technical Metadata -->
        <div class="badge-meta-panel font-mono">
          <div class="badge-role-row">
            <span class="badge-role-label">FULL-STACK DEVELOPER</span>
            <span class="badge-year-tag">2026</span>
          </div>

          <div class="badge-name-row">
            <h3 class="badge-name-headline font-display">M. Fahkrie Al Mufid</h3>
          </div>

          <div class="badge-specs-grid">
            <div class="spec-col">
              <span class="spec-label">PROGRAM</span>
              <span class="spec-value font-body">Informatics Engineering</span>
            </div>
            <div class="spec-col text-right">
              <span class="spec-label">INSTITUTION</span>
              <span class="spec-value font-body">Institut Teknologi Indonesia</span>
            </div>
          </div>

          <!-- Bottom Technical Barcode & Serial -->
          <div class="badge-barcode-row" aria-hidden="true">
            <div class="barcode-graphic"></div>
            <span class="barcode-serial">202110370311-2026</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lanyard-container {
  position: relative;
  width: 100%;
  max-width: 340px;
  min-height: 490px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  touch-action: none;
  user-select: none;
  cursor: grab;
  perspective: 1200px;
}

.lanyard-container:active {
  cursor: grabbing;
}

/* Dynamic Lanyard SVG */
.lanyard-strap-svg {
  position: absolute;
  top: -70px;
  left: 50%;
  transform: translateX(-50%);
  width: 280px;
  height: 140px;
  pointer-events: none;
  z-index: 1;
  overflow: visible;
}

/* Card 3D Assembly */
.lanyard-card-assembly {
  position: relative;
  width: 100%;
  margin-top: 42px;
  transform-style: preserve-3d;
  will-change: transform;
  z-index: 3;
}

/* Metallic Swivel Connector & Hook Rig */
.swivel-connector-rig {
  position: absolute;
  top: -26px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 4;
  pointer-events: none;
}

.swivel-ring {
  width: 20px;
  height: 20px;
  border: 3.5px solid #64748b;
  border-radius: 50%;
  margin-bottom: -6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
}

.swivel-body {
  width: 30px;
  height: 15px;
  background: linear-gradient(180deg, #94a3b8 0%, #334155 100%);
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.metal-highlight {
  position: absolute;
  top: 1px;
  left: 2px;
  right: 2px;
  height: 2px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1px;
}

.metal-rivet {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.swivel-clasp-hook {
  width: 10px;
  height: 14px;
  border: 2.5px solid #64748b;
  border-top: none;
  border-radius: 0 0 5px 5px;
  margin-top: -1px;
}

/* Physical Identity Badge (Matte Premium Coated Plastic Badge) */
.id-badge-card {
  position: relative;
  width: 100%;
  background: #dbe1ea;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  padding: 0.875rem;
  box-shadow: 
    0 32px 65px -12px rgba(0, 0, 0, 0.95),
    0 0 0 1px rgba(255, 255, 255, 0.15),
    inset 0 2px 3px rgba(255, 255, 255, 0.8);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Specular Glare Layer */
.badge-glare-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  border-radius: inherit;
  transition: background 0.05s linear;
}

/* Top Monospace Bar */
.badge-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.25rem;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #1e293b;
}

.badge-status-dot-wrap {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: #b47b30;
}

.badge-pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #e5a85b;
  box-shadow: 0 0 6px #e5a85b;
}

.badge-inst-code {
  color: #64748b;
}

/* Photo Box */
.badge-photo-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 4.4;
  border-radius: 8px;
  overflow: hidden;
  background: #060709;
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.6);
}

.badge-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  filter: grayscale(90%) contrast(1.18) brightness(0.95);
  pointer-events: none;
  transition: filter 0.3s ease, transform 0.4s ease;
}

.lanyard-container:hover .badge-photo-img {
  filter: grayscale(35%) contrast(1.15) brightness(1);
  transform: scale(1.02);
}

.photo-ambient-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 65%, rgba(6, 7, 9, 0.75) 100%);
  pointer-events: none;
}

/* Identity Bottom Panel */
.badge-meta-panel {
  background: #0d1017;
  border-radius: 8px;
  padding: 0.875rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.badge-role-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.5625rem;
  font-weight: 700;
}

.badge-role-label {
  letter-spacing: 0.12em;
  color: #e5a85b;
}

.badge-year-tag {
  color: #94a3b8;
  letter-spacing: 0.08em;
}

.badge-name-row {
  display: flex;
  flex-direction: column;
}

.badge-name-headline {
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #f4f4f2;
}

.badge-specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  padding: 0.4rem 0;
  border-top: 1px dashed rgba(255, 255, 255, 0.08);
  border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
}

.spec-col {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.spec-col.text-right {
  text-align: right;
}

.spec-label {
  font-size: 0.5625rem;
  color: #64748b;
  letter-spacing: 0.08em;
}

.spec-value {
  font-size: 0.6875rem;
  font-weight: 600;
  color: #cbd5e1;
}

.badge-barcode-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.15rem;
}

.barcode-graphic {
  height: 12px;
  width: 75px;
  background-image: repeating-linear-gradient(
    to right,
    #94a3b8 0px,
    #94a3b8 1px,
    transparent 1px,
    transparent 3px,
    #94a3b8 3px,
    #94a3b8 5px,
    transparent 5px,
    transparent 7px
  );
  opacity: 0.6;
}

.barcode-serial {
  font-size: 0.5625rem;
  color: #64748b;
  letter-spacing: 0.08em;
}

/* Responsiveness */
@media (max-width: 992px) {
  .lanyard-container {
    max-width: 270px;
    min-height: 385px;
    padding-top: 55px;
    margin: 0 auto;
    cursor: default;
  }
  .lanyard-container:active {
    cursor: default;
  }
  .lanyard-strap-svg {
    top: -15px;
    width: 240px;
    height: 125px;
  }
  .lanyard-card-assembly {
    margin-top: 25px;
  }
  .id-badge-card {
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .lanyard-container {
    max-width: 240px;
    min-height: 350px;
    padding-top: 48px;
  }
  .lanyard-strap-svg {
    top: -15px;
    width: 220px;
    height: 115px;
  }
  .lanyard-card-assembly {
    margin-top: 20px;
  }
  .badge-photo-frame {
    aspect-ratio: 4 / 4.2;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .lanyard-card-assembly {
    transform: none !important;
  }
  .badge-photo-img {
    transition: none !important;
  }
}
</style>
