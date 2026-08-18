<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const containerRef = ref(null)

let mouseX = 0
let mouseY = 0
let currentX = 0
let currentY = 0
let rafId = null

const handlePointerMove = (e) => {
  const { innerWidth, innerHeight } = window
  mouseX = (e.clientX / innerWidth) * 100
  mouseY = (e.clientY / innerHeight) * 100
}

const updateGlow = () => {
  currentX += (mouseX - currentX) * 0.06
  currentY += (mouseY - currentY) * 0.06

  if (containerRef.value) {
    containerRef.value.style.background = `
      radial-gradient(circle at ${currentX}% ${currentY}%, rgba(229, 168, 91, 0.04) 0%, transparent 45%),
      radial-gradient(circle at 25% 35%, rgba(255, 255, 255, 0.035) 0%, transparent 55%)
    `
  }

  rafId = requestAnimationFrame(updateGlow)
}

onMounted(() => {
  mouseX = 25
  mouseY = 35
  currentX = 25
  currentY = 35
  window.addEventListener('mousemove', handlePointerMove, { passive: true })
  rafId = requestAnimationFrame(updateGlow)
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  window.removeEventListener('mousemove', handlePointerMove)
})
</script>

<template>
  <div ref="containerRef" class="scene-ambient-lighting" aria-hidden="true"></div>
</template>

<style scoped>
.scene-ambient-lighting {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
  transition: background 0.1s ease;
}
</style>
