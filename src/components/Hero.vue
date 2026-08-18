<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ArrowDown, Download, Github } from 'lucide-vue-next'
import Lanyard from '@/components/Lanyard.vue'
import Scene3D from '@/components/Scene3D.vue'

const headlineRef = ref(null)

const scrollToProjects = () => {
  const el = document.getElementById('projects')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// Subtle Variable Proximity Interaction
const handleHeadlineHover = (e) => {
  if (!headlineRef.value) return
  const rect = headlineRef.value.getBoundingClientRect()
  const mouseX = (e.clientX - rect.left) / rect.width
  const letterSpacing = -0.035 + (mouseX - 0.5) * 0.012
  headlineRef.value.style.letterSpacing = `${letterSpacing}em`
}

const resetHeadlineHover = () => {
  if (!headlineRef.value) return
  headlineRef.value.style.letterSpacing = '-0.035em'
}

// =========================================================================
// Interactive Typewriter Animation (Name -> Availability -> Loop)
// =========================================================================
const phrases = [
  'Muhamad Fahkrie Al Mufid',
  '+ AVAILABLE FOR WORK & INTERNSHIP'
]

const currentText = ref('')
let phraseIndex = 0
let charIndex = 0
let isDeleting = false
let typingTimeout = null

const typeLoop = () => {
  const currentPhrase = phrases[phraseIndex]

  if (!isDeleting) {
    // Typing forward
    currentText.value = currentPhrase.substring(0, charIndex + 1)
    charIndex++

    if (charIndex === currentPhrase.length) {
      // Completed phrase, wait 2.2 seconds before deleting
      isDeleting = true
      typingTimeout = setTimeout(typeLoop, 2200)
      return
    }
    typingTimeout = setTimeout(typeLoop, 75)
  } else {
    // Deleting backward
    currentText.value = currentPhrase.substring(0, charIndex - 1)
    charIndex--

    if (charIndex === 0) {
      // Finished deleting, switch to next phrase
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      typingTimeout = setTimeout(typeLoop, 400)
      return
    }
    typingTimeout = setTimeout(typeLoop, 35)
  }
}

onMounted(() => {
  typeLoop()
})

onBeforeUnmount(() => {
  if (typingTimeout) clearTimeout(typingTimeout)
})
</script>

<template>
  <section id="hero" class="hero-section">
    <!-- Studio Ambient Lighting Glow Layer -->
    <Scene3D />

    <div class="site-container hero-container">
      <div class="hero-grid">
        <!-- ==========================================================
             LEFT: Editorial Typography & Identity
             ========================================================== -->
        <div class="hero-left-content">
          <!-- Interactive Dynamic Typewriter Terminal Prompt -->
          <div class="hero-typewriter-kicker font-mono">
            <span class="typewriter-text">{{ currentText }}</span>
            <span class="typewriter-cursor">_</span>
          </div>

          <!-- Massive Editorial Display Headline -->
          <div
            ref="headlineRef"
            class="hero-title-wrapper"
            @mousemove="handleHeadlineHover"
            @mouseleave="resetHeadlineHover"
          >
            <h1 class="hero-main-title font-display">
              <span class="title-row primary">Full-Stack</span>
              <span class="title-row accent-muted">Developer</span>
            </h1>
          </div>

          <!-- Subtitle / Role Tag -->
          <div class="hero-role-sub font-mono">
            <span>Informatics Engineering (S07) // Full-Stack Developer</span>
          </div>

          <!-- Authentic Biography Description -->
          <p class="hero-description-lead">
            Menciptakan website modern dengan tampilan clean, responsif, dan elegan. Mengubah ide, kebutuhan arsitektur sistem, dan desain menjadi pengalaman digital yang menarik, cepat, dan mudah digunakan.
          </p>

          <!-- Core Tech Pills -->
          <div class="hero-tech-pills font-mono">
            <span class="tech-pill">Laravel</span>
            <span class="tech-pill">Vue.js</span>
            <span class="tech-pill">MySQL</span>
            <span class="tech-pill">Tailwind CSS</span>
            <span class="tech-pill">REST API</span>
          </div>

          <!-- Magnetic Actions -->
          <div class="hero-action-row">
            <button
              class="btn-magnetic btn-primary-editorial"
              data-cursor="OPEN"
              @click="scrollToProjects"
            >
              <span>VIEW WORK</span>
              <ArrowDown :size="15" />
            </button>

            <a
              href="/cv.pdf"
              target="_blank"
              class="btn-magnetic btn-secondary-editorial"
              data-cursor="PDF"
            >
              <Download :size="15" />
              <span>DOWNLOAD CV</span>
            </a>

            <a
              href="https://github.com/fahkrieal"
              target="_blank"
              class="btn-magnetic btn-secondary-editorial icon-btn"
              aria-label="GitHub Profile"
              data-cursor="CODE"
            >
              <Github :size="16" />
            </a>
          </div>

          <!-- Monospace Micro-meta -->
          <div class="hero-editorial-meta font-mono">
            <div class="meta-row">
              <span class="meta-icon">↓</span>
              <span>explore my work below</span>
            </div>
            <div class="meta-row">
              <span class="meta-icon">↗</span>
              <span>open to full-time, internship &amp; freelance opportunities</span>
            </div>
          </div>
        </div>

        <!-- ==========================================================
             RIGHT: Physics Suspended Identity Badge (Lanyard)
             ========================================================== -->
        <div class="hero-right-content">
          <Lanyard />
        </div>
      </div>

      <!-- Bottom Center Minimal Scroll Indicator -->
      <div class="hero-bottom-status">
        <button class="hero-scroll-trigger font-mono" @click="scrollToProjects">
          <span>SCROLL</span>
          <span class="scroll-arrow-icon">↓</span>
        </button>
        <span class="hero-index-indicator font-mono">01 / 04</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  padding-top: calc(var(--header-height) + 1.25rem);
  padding-bottom: 2rem;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - var(--header-height) - 2.5rem);
  width: 100%;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: center;
  margin: auto 0;
  position: relative;
  z-index: 2;
}

/* Left Column */
.hero-left-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Typewriter Kicker */
.hero-typewriter-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--accent-amber);
  min-height: 1.5rem;
}

.typewriter-text {
  color: var(--accent-amber);
}

.typewriter-cursor {
  color: var(--accent-amber);
  font-weight: 800;
  animation: cursor-blink 0.85s infinite steps(2, start);
}

@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Title Wrapper */
.hero-title-wrapper {
  transition: letter-spacing 0.2s ease-out;
}

.hero-main-title {
  font-size: clamp(2.4rem, 6.2vw, 5.5rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.035em;
  text-transform: uppercase;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
}

.title-row.primary {
  color: var(--text-primary);
}

.title-row.accent-muted {
  color: #727a8a;
  text-shadow: 0 0 40px rgba(255, 255, 255, 0.05);
}

/* Role Subtitle */
.hero-role-sub {
  font-size: 0.8125rem;
  color: var(--text-muted);
  letter-spacing: 0.06em;
}

/* Description */
.hero-description-lead {
  font-size: clamp(0.9375rem, 1.1vw, 1.0625rem);
  line-height: 1.65;
  color: var(--text-secondary);
  max-width: 540px;
}

/* Tech Pills */
.hero-tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.tech-pill {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-hairline);
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  transition: border-color var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
}

.tech-pill:hover {
  border-color: var(--accent-amber);
  color: var(--text-primary);
  background: var(--accent-amber-subtle);
}

/* Actions */
.hero-action-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.btn-magnetic.icon-btn {
  padding: 0.8125rem 1rem;
}

/* Micro Meta */
.hero-editorial-meta {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  margin-top: 0.25rem;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-icon {
  color: var(--accent-amber);
}

/* Right Column */
.hero-right-content {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
}

/* Bottom Status */
.hero-bottom-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-hairline);
  margin-top: 1.25rem;
  z-index: 2;
}

.hero-scroll-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  transition: color var(--transition-fast);
}

.hero-scroll-trigger:hover {
  color: var(--accent-amber);
}

.scroll-arrow-icon {
  color: var(--accent-amber);
  animation: scroll-bounce 2.2s infinite ease-in-out;
}

@keyframes scroll-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
}

.hero-index-indicator {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

/* Mobile Breakpoints */
@media (max-width: 992px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding-top: 0.5rem;
  }
  .hero-right-content {
    order: -1;
  }
  .hero-section {
    padding-top: calc(var(--header-height) + 1rem);
  }
}

@media (max-width: 480px) {
  .hero-main-title {
    font-size: 2.25rem;
    line-height: 1;
  }
  .hero-action-row {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
  .btn-magnetic {
    width: 100%;
  }
}
</style>
