<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const cursorRef = ref(null)
const label = ref('')
const isHovered = ref(false)
const isVisible = ref(false)

let mouseX = -100
let mouseY = -100
let currentX = -100
let currentY = -100
let rafId = null

const updatePosition = (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
  if (!isVisible.value) isVisible.value = true

  // Check if hovering an element with custom cursor attribute
  const target = e.target.closest('[data-cursor], a, button')
  if (target) {
    isHovered.value = true
    label.value = target.getAttribute('data-cursor') || ''
  } else {
    isHovered.value = false
    label.value = ''
  }
}

const handleMouseLeave = () => {
  isVisible.value = false
}

const animate = () => {
  // Smooth spring lerp
  currentX += (mouseX - currentX) * 0.2
  currentY += (mouseY - currentY) * 0.2

  if (cursorRef.value) {
    cursorRef.value.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
  }

  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  // Only enable on fine pointer devices without reduced motion
  const isFinePointer = window.matchMedia('(pointer: fine)').matches
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (isFinePointer && !prefersReduced) {
    window.addEventListener('mousemove', updatePosition, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    rafId = requestAnimationFrame(animate)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', updatePosition)
  document.removeEventListener('mouseleave', handleMouseLeave)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div
    ref="cursorRef"
    class="custom-cursor-follower"
    :class="{
      'is-active': isHovered,
      'has-label': !!label,
      'is-visible': isVisible,
    }"
  >
    <div class="cursor-dot"></div>
    <span v-if="label" class="cursor-label">{{ label }}</span>
  </div>
</template>

<style scoped>
.custom-cursor-follower {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate3d(-100px, -100px, 0);
  transition: opacity 0.2s ease, width 0.25s var(--ease-expo), height 0.25s var(--ease-expo), background-color 0.25s ease;
  margin-top: -5px;
  margin-left: -5px;
}

.custom-cursor-follower.is-visible {
  opacity: 1;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--accent-amber);
  box-shadow: 0 0 10px rgba(229, 168, 91, 0.6);
  transition: transform 0.2s ease;
}

.custom-cursor-follower.is-active:not(.has-label) .cursor-dot {
  transform: scale(2.2);
  background-color: var(--text-primary);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.5);
}

.custom-cursor-follower.has-label {
  width: 72px;
  height: 72px;
  margin-top: -36px;
  margin-left: -36px;
  background: rgba(15, 18, 24, 0.9);
  border: 1px solid var(--accent-amber);
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
}

.custom-cursor-follower.has-label .cursor-dot {
  display: none;
}

.cursor-label {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-primary);
}

@media (pointer: coarse), (prefers-reduced-motion: reduce) {
  .custom-cursor-follower {
    display: none !important;
  }
}
</style>
