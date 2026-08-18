<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const containerRef = ref(null)
const cardAssemblyRef = ref(null)
const glareRef = ref(null)

// Drag & Physics State
let isDragging = false
let startPointerX = 0
let startPointerY = 0

// Position, Velocity & Rotation
let posX = 0
let posY = 0
let velX = 0
let velY = 0

// Hover 3D Tilt
let hoverTiltX = 0
let hoverTiltY = 0
let currentTiltX = 0
let currentTiltY = 0

// Spring Parameters
const springK = 0.082     // Spring tension
const damping = 0.83      // Air damping

let rafId = null

// Pointer Drag Handlers
const onPointerDown = (e) => {
  isDragging = true
  startPointerX = e.clientX - posX
  startPointerY = e.clientY - posY

  if (containerRef.value) {
    containerRef.value.setPointerCapture(e.pointerId)
  }
}

const onPointerMove = (e) => {
  if (isDragging) {
    const rawX = e.clientX - startPointerX
    const rawY = e.clientY - startPointerY

    // Elastic distance boundary
    const maxDistance = 180
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
    // 3D Tilt on Hover
    if (!cardAssemblyRef.value) return
    const rect = cardAssemblyRef.value.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    hoverTiltY = ((mouseX - centerX) / centerX) * 14
    hoverTiltX = -((mouseY - centerY) / centerY) * 14

    if (glareRef.value) {
      const gx = (mouseX / rect.width) * 100
      const gy = (mouseY / rect.height) * 100
      glareRef.value.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, 0.26) 0%, transparent 60%)`
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
    } catch (err) {
      void err
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

// Continuous Physics Animation Loop
const updatePhysics = () => {
  if (!isDragging) {
    // Hooke's Law Spring Force towards (0, 0)
    const forceX = -springK * posX
    const forceY = -springK * posY

    velX = (velX + forceX) * damping
    velY = (velY + forceY) * damping

    posX += velX
    posY += velY

    currentTiltX += (hoverTiltX - currentTiltX) * 0.12
    currentTiltY += (hoverTiltY - currentTiltY) * 0.12
  } else {
    velX = 0
    velY = 0
    currentTiltX += (hoverTiltX - currentTiltX) * 0.12
    currentTiltY += (hoverTiltY - currentTiltY) * 0.12
  }

  // Realistic dynamic pendulum swing
  const swingAngle = (posX * 0.16 + velX * 0.4).toFixed(2)
  const totalRotX = (currentTiltX + posY * 0.05).toFixed(2)
  const totalRotY = (currentTiltY + posX * 0.07).toFixed(2)

  // Apply Transform to Card Assembly
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
  }

  rafId = requestAnimationFrame(updatePhysics)
}

onMounted(() => {
  rafId = requestAnimationFrame(updatePhysics)
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div
    ref="containerRef"
    class="physics-lanyard-wrapper"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @mouseleave="onPointerLeave"
  >
    <!-- Dynamic SVG Lanyard Strap Connecting from Top Viewport -->
    <svg
      class="lanyard-strap-svg"
      viewBox="0 0 280 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <!-- Metallic Gradient for Clasp -->
        <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#475569" />
          <stop offset="35%" stop-color="#94a3b8" />
          <stop offset="70%" stop-color="#e2e8f0" />
          <stop offset="100%" stop-color="#334155" />
        </linearGradient>
      </defs>

      <!-- 1. Soft Drop Shadow Behind Strap -->
      <path
        class="strap-path"
        d="M 140 0 Q 140 62 140 125"
        stroke="rgba(0,0,0,0.85)"
        stroke-width="36"
        stroke-linecap="round"
      />
      <!-- 2. Dark Webbing Outer Ribbon Base -->
      <path
        class="strap-path"
        d="M 140 0 Q 140 62 140 125"
        stroke="#0a0d13"
        stroke-width="30"
        stroke-linecap="round"
      />
      <!-- 3. Inner Fabric Texture Edge Binding -->
      <path
        class="strap-path"
        d="M 140 0 Q 140 62 140 125"
        stroke="#151a24"
        stroke-width="26"
        stroke-linecap="round"
      />
      <!-- 4. Satin Center Webbing Sheen -->
      <path
        class="strap-path"
        d="M 140 0 Q 140 62 140 125"
        stroke="rgba(255,255,255,0.06)"
        stroke-width="12"
        stroke-linecap="round"
      />
      <!-- 5. Dual Fine Border Stitching Lines -->
      <path
        class="strap-path"
        d="M 140 0 Q 140 62 140 125"
        stroke="rgba(229,168,91,0.35)"
        stroke-width="1.5"
        stroke-dasharray="3 3"
      />
    </svg>

    <!-- Suspended 3D ID Badge Card Assembly -->
    <div
      ref="cardAssemblyRef"
      class="card-3d-assembly"
      :class="{ 'is-dragging': isDragging }"
    >
      <!-- Gunmetal Swivel Clasp Assembly -->
      <div class="swivel-metal-assembly" aria-hidden="true">
        <div class="metal-swivel-ring"></div>
        <div class="metal-swivel-body">
          <div class="metal-shine-highlight"></div>
          <div class="metal-center-rivet"></div>
        </div>
        <div class="metal-hook-clasp"></div>
      </div>

      <!-- High-End Polaroid / ID Badge Frame -->
      <div class="polaroid-id-card">
        <!-- Dynamic Sheen Light Glare -->
        <div ref="glareRef" class="card-glare-sheen" aria-hidden="true"></div>

        <!-- Top Monospace Bar -->
        <div class="badge-top-row font-mono">
          <div class="badge-status-dot-wrap">
            <span class="badge-pulse-dot"></span>
            <span>MF—001 // S07</span>
          </div>
          <span class="badge-inst-code">ITI.AC.ID</span>
        </div>

        <!-- High-Contrast Profile Photo Box -->
        <div class="badge-image-container">
          <img
            src="/profile.jpg"
            alt="Muhamad Fahkrie Al Mufid"
            class="badge-portrait-photo"
            draggable="false"
            loading="eager"
          />
          <div class="portrait-vignette-overlay"></div>
        </div>

        <!-- Identity Bottom Monospace Metadata Panel -->
        <div class="badge-identity-panel font-mono">
          <div class="badge-role-row">
            <span class="badge-role-tag">FULL-STACK DEVELOPER</span>
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

          <div class="badge-bottom-bar" aria-hidden="true">
            <div class="barcode-graphic"></div>
            <span class="barcode-id">202110370311-2026</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.physics-lanyard-wrapper {
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

.physics-lanyard-wrapper:active {
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

/* Card Assembly */
.card-3d-assembly {
  position: relative;
  width: 100%;
  margin-top: 42px;
  transform-style: preserve-3d;
  will-change: transform;
  z-index: 3;
}

/* Metallic Swivel Clasp */
.swivel-metal-assembly {
  position: absolute;
  top: -26px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 4;
}

.metal-swivel-ring {
  width: 20px;
  height: 20px;
  border: 3.5px solid #64748b;
  border-radius: 50%;
  margin-bottom: -6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
}

.metal-swivel-body {
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

.metal-shine-highlight {
  position: absolute;
  top: 1px;
  left: 2px;
  right: 2px;
  height: 2px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1px;
}

.metal-center-rivet {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.metal-hook-clasp {
  width: 10px;
  height: 14px;
  border: 2.5px solid #64748b;
  border-top: none;
  border-radius: 0 0 5px 5px;
  margin-top: -1px;
}

/* Polaroid ID Card Surface */
.polaroid-id-card {
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

/* Glare Layer */
.card-glare-sheen {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  border-radius: inherit;
  transition: background 0.05s linear;
}

/* Top Monospace Bar */
.badge-top-row {
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
.badge-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 4.4;
  border-radius: 8px;
  overflow: hidden;
  background: #060709;
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.6);
}

.badge-portrait-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  filter: grayscale(90%) contrast(1.18) brightness(0.95);
  pointer-events: none;
  transition: filter 0.3s ease, transform 0.4s ease;
}

.physics-lanyard-wrapper:hover .badge-portrait-photo {
  filter: grayscale(35%) contrast(1.15) brightness(1);
  transform: scale(1.02);
}

.portrait-vignette-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 65%, rgba(6, 7, 9, 0.75) 100%);
  pointer-events: none;
}

/* Identity Bottom Panel */
.badge-identity-panel {
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

.badge-role-tag {
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

.badge-bottom-bar {
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

.barcode-id {
  font-size: 0.5625rem;
  color: #64748b;
  letter-spacing: 0.08em;
}

/* Responsiveness */
@media (max-width: 768px) {
  .physics-lanyard-wrapper {
    max-width: 290px;
    min-height: 420px;
  }
}

@media (max-width: 480px) {
  .physics-lanyard-wrapper {
    max-width: 260px;
    min-height: 380px;
  }
}
</style>
