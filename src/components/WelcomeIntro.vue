<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Code2, User, Globe } from 'lucide-vue-next'

const emit = defineEmits(['finish'])

const isVisible = ref(true)
const isExiting = ref(false)

const wordsRow1 = [
  { text: 'Welcome', variant: 'primary', delay: 180 },
  { text: 'to', variant: 'accent', delay: 290 },
  { text: 'my', variant: 'primary', delay: 400 }
]

const wordsRow2 = [
  { text: 'Portfolio', variant: 'muted', delay: 540 },
  { text: 'Website', variant: 'muted', delay: 680 }
]

let autoTimer = null

const handleDismiss = () => {
  if (isExiting.value) return
  isExiting.value = true
  if (autoTimer) clearTimeout(autoTimer)

  setTimeout(() => {
    isVisible.value = false
    emit('finish')
  }, 600)
}

const handleKeyDown = (e) => {
  if (['Escape', 'Enter', ' '].includes(e.key)) {
    e.preventDefault()
    handleDismiss()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  // Auto transition after cinematic sequence finishes
  autoTimer = setTimeout(() => {
    handleDismiss()
  }, 2500)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (autoTimer) clearTimeout(autoTimer)
})
</script>

<template>
  <transition name="intro-curtain">
    <div
      v-if="isVisible"
      class="welcome-intro-screen"
      :class="{ 'is-exiting': isExiting }"
      tabindex="0"
      aria-label="Welcome screen. Click anywhere to proceed."
      @click="handleDismiss"
    >
      <!-- Background Grid & Glow -->
      <div class="intro-bg-grid" aria-hidden="true"></div>
      <div class="intro-center-glow" aria-hidden="true"></div>

      <div class="intro-content-container">
        <!-- Dynamic Staggered Animated Feature Icons -->
        <div class="intro-icon-pills" aria-hidden="true">
          <div class="icon-pill pill-code">
            <Code2 :size="16" />
          </div>
          <div class="icon-pill pill-user active">
            <User :size="17" />
            <div class="pill-pulse-ring"></div>
          </div>
          <div class="icon-pill pill-globe">
            <Globe :size="16" />
          </div>
        </div>

        <!-- ==========================================================
             CRISP WORD-BY-WORD REVEAL (Zero Blur, No Clipping on 'to')
             ========================================================== -->
        <div class="intro-headline-wrapper font-display">
          <!-- Row 1: Welcome to my -->
          <div class="word-row row-1">
            <span
              v-for="word in wordsRow1"
              :key="word.text"
              class="word-span"
              :class="word.variant"
              :style="{ '--word-delay': `${word.delay}ms` }"
            >
              {{ word.text }}
            </span>
          </div>

          <!-- Row 2: Portfolio Website -->
          <div class="word-row row-2">
            <span
              v-for="word in wordsRow2"
              :key="word.text"
              class="word-span"
              :class="word.variant"
              :style="{ '--word-delay': `${word.delay}ms` }"
            >
              {{ word.text }}
            </span>
          </div>
        </div>

        <!-- ==========================================================
             CHOREOGRAPHED FOOTER: Name -> Expanding Amber Line
             ========================================================== -->
        <div class="intro-footer-sequence font-mono">
          <!-- 1. Person's Name -->
          <div class="intro-meta-name">
            <span>MUHAMAD FAHKRIE AL MUFID</span>
          </div>

          <!-- 2. Expanding Amber Accent Line -->
          <div class="intro-amber-divider" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.welcome-intro-screen {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  background-color: #060709;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
  cursor: pointer;
  outline: none;
  padding: max(1.5rem, env(safe-area-inset-top)) 1.25rem max(1.5rem, env(safe-area-inset-bottom));
  transition: transform 0.65s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.65s ease;
}

.welcome-intro-screen.is-exiting {
  transform: translateY(-100%);
  opacity: 0.95;
}

/* Background Atmosphere */
.intro-bg-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
  pointer-events: none;
}

.intro-center-glow {
  position: absolute;
  width: min(90vw, 650px);
  height: min(90vw, 650px);
  background: radial-gradient(circle, rgba(229, 168, 91, 0.07) 0%, rgba(6, 7, 9, 0) 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

/* Container */
.intro-content-container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: clamp(1.75rem, 4.5vh, 2.75rem);
  padding: 1.5rem;
  max-width: 960px;
  width: 100%;
}

/* Dynamic Animated Pill Icons */
.intro-icon-pills {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.icon-pill {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #0f131a;
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9aa1ad;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.7);
  position: relative;
}

.pill-code {
  opacity: 0;
  animation: icon-pop-left 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.05s forwards;
}

.pill-user {
  opacity: 0;
  animation: icon-pop-center 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.15s forwards;
}

.pill-globe {
  opacity: 0;
  animation: icon-pop-right 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.25s forwards;
}

.icon-pill.active {
  border-color: rgba(229, 168, 91, 0.7);
  color: #e5a85b;
  box-shadow: 0 0 20px rgba(229, 168, 91, 0.25);
}

.pill-pulse-ring {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 1px solid rgba(229, 168, 91, 0.4);
  animation: pulse-ring 2.2s infinite ease-out;
  pointer-events: none;
}

/* Headline Wrapper */
.intro-headline-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.word-row {
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: clamp(0.75rem, 2vw, 1.6rem);
  row-gap: 0.25rem;
}

.word-span {
  display: inline-block;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.035em;
  opacity: 0;
  transform: translateY(28px) scale(0.96);
  animation: word-reveal 0.75s cubic-bezier(0.16, 1, 0.3, 1) var(--word-delay) forwards;
  will-change: transform, opacity;
  padding: 0 0.08em; /* Generous padding to prevent italic clipping */
}

/* Word Style Variants */
.word-span.primary {
  color: #f4f4f2;
}

.word-span.accent {
  color: #e5a85b;
  font-style: italic;
  font-weight: 600;
  letter-spacing: 0.01em;
  padding: 0 0.15em; /* Extra breathing space for italic slant */
}

.word-span.muted {
  color: #5c6473;
}

.row-1 .word-span {
  font-size: clamp(2.2rem, 6.8vw, 5.25rem);
}

.row-2 .word-span {
  font-size: clamp(1.85rem, 5.4vw, 4.35rem);
}

/* Footer Choreography */
.intro-footer-sequence {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

/* 1. Name */
.intro-meta-name {
  font-size: clamp(0.6875rem, 1.2vw, 0.8125rem);
  letter-spacing: 0.16em;
  color: #9aa1ad;
  opacity: 0;
  transform: translateY(10px);
  animation: meta-fade-up 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards;
}

/* 2. Expanding Amber Divider */
.intro-amber-divider {
  width: 140px;
  height: 1.5px;
  background: #e5a85b;
  box-shadow: 0 0 8px rgba(229, 168, 91, 0.5);
  border-radius: 999px;
  transform-origin: center;
  transform: scaleX(0);
  opacity: 0;
  animation: divider-expand 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.95s forwards;
}

/* ==========================================================
   KEYFRAME ANIMATIONS (Snappy, Clean, Zero Blur)
   ========================================================== */
@keyframes icon-pop-left {
  0% {
    opacity: 0;
    transform: translateY(-20px) rotate(-15deg) scale(0.6);
  }
  70% {
    transform: translateY(2px) rotate(3deg) scale(1.08);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotate(0) scale(1);
  }
}

@keyframes icon-pop-center {
  0% {
    opacity: 0;
    transform: translateY(-24px) scale(0.5);
  }
  70% {
    transform: translateY(2px) scale(1.15);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes icon-pop-right {
  0% {
    opacity: 0;
    transform: translateY(-20px) rotate(15deg) scale(0.6);
  }
  70% {
    transform: translateY(2px) rotate(-3deg) scale(1.08);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotate(0) scale(1);
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.45);
    opacity: 0;
  }
}

@keyframes word-reveal {
  0% {
    opacity: 0;
    transform: translateY(28px) scale(0.96);
  }
  75% {
    opacity: 1;
    transform: translateY(-2px) scale(1.01);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes divider-expand {
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
}

@keyframes meta-fade-up {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 0.85;
    transform: translateY(0);
  }
}

/* Curtain Exit Transition */
.intro-curtain-leave-active {
  transition: transform 0.65s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.65s ease;
}

.intro-curtain-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* ==========================================================
   ACCESSIBILITY: PREFERS-REDUCED-MOTION
   ========================================================== */
@media (prefers-reduced-motion: reduce) {
  .word-span,
  .icon-pill,
  .intro-meta-name {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  .pill-pulse-ring {
    display: none !important;
  }

  .intro-amber-divider {
    animation: none !important;
    transform: scaleX(1) !important;
    opacity: 1 !important;
  }
}

/* Mobile Screen Tuning */
@media (max-width: 480px) {
  .intro-content-container {
    gap: 1.5rem;
    padding: 1rem;
  }

  .word-row {
    column-gap: 0.5rem;
  }

  .row-1 .word-span {
    font-size: clamp(2rem, 9.5vw, 2.75rem);
  }

  .row-2 .word-span {
    font-size: clamp(1.65rem, 7.8vw, 2.25rem);
  }

  .intro-amber-divider {
    width: 110px;
  }
}
</style>
