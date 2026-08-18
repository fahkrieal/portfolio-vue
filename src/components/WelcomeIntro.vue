<script setup>
import { ref, onMounted } from 'vue'
import { Code2, User, Globe } from 'lucide-vue-next'

const emit = defineEmits(['finish'])

const isVisible = ref(true)
const isExiting = ref(false)

const handleDismiss = () => {
  if (isExiting.value) return
  isExiting.value = true
  setTimeout(() => {
    isVisible.value = false
    emit('finish')
  }, 600)
}

onMounted(() => {
  // Auto transition after 1.8 seconds
  const timer = setTimeout(() => {
    handleDismiss()
  }, 1900)

  return () => clearTimeout(timer)
})
</script>

<template>
  <transition name="intro-curtain">
    <div
      v-if="isVisible"
      class="welcome-intro-screen"
      :class="{ 'is-exiting': isExiting }"
      @click="handleDismiss"
    >
      <!-- Background Grid & Glow -->
      <div class="intro-bg-grid" aria-hidden="true"></div>
      <div class="intro-center-glow" aria-hidden="true"></div>

      <div class="intro-content-container">
        <!-- Top Triple Feature Icons (Code, User, Globe) -->
        <div class="intro-icon-pills" aria-hidden="true">
          <div class="icon-pill">
            <Code2 :size="16" />
          </div>
          <div class="icon-pill active">
            <User :size="16" />
          </div>
          <div class="icon-pill">
            <Globe :size="16" />
          </div>
        </div>

        <!-- Main Welcome Headlines -->
        <div class="intro-text-block font-display">
          <h1 class="welcome-line-1">
            Welcome <span class="to-text">to</span> my
          </h1>
          <h2 class="welcome-line-2">
            Portfolio Website
          </h2>
        </div>

        <!-- Subtitle & Loading Bar -->
        <div class="intro-footer-meta font-mono">
          <div class="intro-meta-name">MUHAMAD FAHKRIE AL MUFID</div>
          <div class="intro-loading-track">
            <div class="intro-loading-bar"></div>
          </div>
          <div class="intro-skip-hint">CLICK ANYWHERE TO SKIP</div>
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
  background-color: #060709;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
  cursor: pointer;
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
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
  pointer-events: none;
}

.intro-center-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(229, 168, 91, 0.08) 0%, rgba(6, 7, 9, 0) 70%);
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
  gap: 2.25rem;
  padding: 2rem;
  max-width: 900px;
  width: 100%;
}

/* Icons */
.intro-icon-pills {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  animation: intro-fade-down 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.icon-pill {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(15, 18, 24, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9aa1ad;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
  transition: border-color 0.3s ease, color 0.3s ease;
}

.icon-pill.active {
  border-color: rgba(229, 168, 91, 0.6);
  color: #e5a85b;
  box-shadow: 0 0 20px rgba(229, 168, 91, 0.2);
}

/* Headline */
.intro-text-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: intro-zoom-in 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
}

.welcome-line-1 {
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #f4f4f2;
  line-height: 1.05;
  text-transform: none;
  display: inline-block;
}

.to-text {
  font-weight: 600;
  color: #e5a85b;
  font-style: italic;
}

.welcome-line-2 {
  font-size: clamp(2rem, 5.5vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  color: #5c6473;
  line-height: 1.05;
  text-transform: none;
}

/* Footer Meta */
.intro-footer-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
  animation: intro-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
}

.intro-meta-name {
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  color: #9aa1ad;
}

.intro-loading-track {
  width: 140px;
  height: 2px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  overflow: hidden;
  position: relative;
}

.intro-loading-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0%;
  background: #e5a85b;
  box-shadow: 0 0 8px #e5a85b;
  animation: loading-progress 1.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.intro-skip-hint {
  font-size: 0.5625rem;
  letter-spacing: 0.16em;
  color: #5c6473;
  opacity: 0.7;
}

/* Keyframe Animations */
@keyframes intro-fade-down {
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes intro-zoom-in {
  0% { opacity: 0; transform: scale(0.92) translateY(15px); filter: blur(8px); }
  100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
}

@keyframes intro-fade-up {
  0% { opacity: 0; transform: translateY(15px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes loading-progress {
  0% { width: 0%; }
  50% { width: 65%; }
  100% { width: 100%; }
}

/* Transitions */
.intro-curtain-leave-active {
  transition: transform 0.65s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.65s ease;
}

.intro-curtain-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
