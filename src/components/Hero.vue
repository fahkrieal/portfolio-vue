<template>
  <section id="hero" class="hero">
    <!-- ========================= -->
    <!-- Background -->
    <!-- ========================= -->

    <div class="section-bg">
      <div class="section-grid"></div>

      <div class="section-light-left"></div>

      <div class="section-light-right"></div>

      <div class="section-light-top"></div>

      <div class="section-spotlight"></div>

      <div class="section-noise"></div>
    </div>

    <!-- ========================= -->
    <!-- Container -->
    <!-- ========================= -->

    <div class="hero-container">
      <div class="hero-grid">
        <!-- ========================= -->
        <!-- LEFT -->
        <!-- ========================= -->

        <div class="hero-content" data-aos="fade-right">
          <!-- Badge -->

          <div class="hero-badge">
            <span class="hero-badge-dot"></span>

            <span> Available for Internship & Opportunities </span>
          </div>

          <!-- Name -->

          <h1 class="hero-title">
            Muhamad

            <span class="hero-accent"> Fahkrie </span>

            Al Mufid
          </h1>

          <!-- Role -->

          <h2 class="hero-role">Full Stack Developer</h2>

          <!-- Description -->

          <p class="hero-description">
            Mahasiswa Teknik Informatika yang berfokus pada pengembangan aplikasi web modern
            menggunakan Laravel, Vue.js, MySQL, Tailwind CSS, dan REST API.
          </p>

          <!-- Tech Stack -->

          <div class="hero-stack">
            <span>Laravel</span>

            <span class="hero-stack-dot">•</span>

            <span>Vue.js</span>

            <span class="hero-stack-dot">•</span>

            <span>MySQL</span>

            <span class="hero-stack-dot">•</span>

            <span>REST API</span>
          </div>

          <!-- Button -->

          <div class="hero-actions">
            <a href="/cv.pdf" target="_blank" class="hero-btn hero-btn-primary"> Download CV </a>

            <a
              href="https://github.com/fahkrieal"
              target="_blank"
              class="hero-btn hero-btn-secondary"
            >
              GitHub
            </a>
          </div>
        </div>

        <!-- ========================= -->
        <!-- PHOTO -->
        <!-- ========================= -->

        <div class="hero-image-wrapper" data-aos="fade-left">
          <div ref="photoRef" class="hero-image-shell">
            <!-- Glow -->

            <div class="hero-image-glow"></div>

            <!-- Orbit -->

            <div class="hero-orbit hero-orbit-1"></div>

            <div class="hero-orbit hero-orbit-2"></div>

            <!-- Border -->

            <div class="hero-image-border">
              <div class="hero-image-frame">
                <img src="/profile.jpg" alt="Muhamad Fahkrie Al Mufid" class="hero-image" />
              </div>
            </div>
          </div>

          <!-- Floating Card -->

          <div class="hero-floating-card">
            <div class="hero-floating-dot"></div>

            <div>
              <small> ROLE </small>

              <strong> Junior Developer </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import { Download, Github, ArrowDown } from 'lucide-vue-next'

/* ---------------------------------------
   TECH STACK
--------------------------------------- */

const techStack = ['Laravel', 'Vue.js', 'MySQL', 'REST API']

/* ---------------------------------------
   PHOTO REF
--------------------------------------- */

const photoRef = ref(null)

let animationFrame = null

/* ---------------------------------------
   MOUSE TILT
--------------------------------------- */

const handleMouseMove = (e) => {
  if (!photoRef.value) return

  cancelAnimationFrame(animationFrame)

  animationFrame = requestAnimationFrame(() => {
    const rect = photoRef.value.getBoundingClientRect()

    const x = e.clientX - rect.left

    const y = e.clientY - rect.top

    const centerX = rect.width / 2

    const centerY = rect.height / 2

    const rotateY = ((x - centerX) / centerX) * 8

    const rotateX = -((y - centerY) / centerY) * 8

    photoRef.value.style.transform = `
      perspective(1400px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.02)
      `
  })
}

/* ---------------------------------------
   RESET
--------------------------------------- */

const resetPhoto = () => {
  if (!photoRef.value) return

  photoRef.value.style.transform = `
    perspective(1400px)
    rotateX(0deg)
    rotateY(0deg)
    scale(1)
    `
}

/* ---------------------------------------
   MOUNT
--------------------------------------- */

onMounted(() => {
  if (!photoRef.value) return

  photoRef.value.addEventListener('mousemove', handleMouseMove)

  photoRef.value.addEventListener('mouseleave', resetPhoto)
})

/* ---------------------------------------
   CLEANUP
--------------------------------------- */

onBeforeUnmount(() => {
  if (!photoRef.value) return

  photoRef.value.removeEventListener('mousemove', handleMouseMove)

  photoRef.value.removeEventListener('mouseleave', resetPhoto)
})
</script>
