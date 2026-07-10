<template>
  <section id="projects" class="projects">
    <!-- Section divider -->
    <div class="section-divider">
      <span class="section-divider-line"></span>
      <span class="section-divider-dot"></span>
      <span class="section-divider-line"></span>
    </div>

    <!-- Background -->

    <div class="section-bg">
      <div class="section-grid"></div>

      <div class="section-light-left"></div>

      <div class="section-light-right"></div>

      <div class="section-center-glow"></div>

      <div class="section-noise"></div>
    </div>

    <!-- Container -->

    <div class="projects-container">
      <!-- ============================= -->
      <!-- HEADER -->
      <!-- ============================= -->

      <div class="projects-header" data-aos="fade-up">
        <div class="projects-badge">Featured Projects</div>

        <h2 class="projects-title">Selected Work</h2>

        <p class="projects-description">
          Beberapa project yang menunjukkan kemampuan saya dalam membangun aplikasi web modern
          menggunakan Laravel, Vue.js, MySQL, REST API, dan teknologi pendukung lainnya.
        </p>
      </div>

      <!-- ============================= -->
      <!-- PROJECT LIST -->
      <!-- ============================= -->

      <div class="projects-list">
        <article
          v-for="(project, index) in projects"
          :key="project.title"
          class="project-card"
          :class="{
            reverse: index % 2,
          }"
          data-aos="fade-up"
          :data-aos-delay="index * 150"
        >
          <!-- IMAGE -->

          <div class="project-image-column">
            <div class="project-image-wrapper">
              <img :src="project.image" :alt="project.title" class="project-image" loading="lazy" />
            </div>
          </div>

          <!-- CONTENT -->

          <div class="project-content">
            <div class="project-line"></div>

            <span class="project-role">
              {{ project.role }}
            </span>

            <h3 class="project-name">
              {{ project.title }}
            </h3>

            <p class="project-text">
              {{ project.description }}
            </p>

            <!-- Tech -->

            <div class="project-tech-list">
              <span v-for="tech in project.tech" :key="tech" class="project-tech">
                {{ tech }}
              </span>
            </div>

            <!-- Action -->

            <div class="project-actions">
              <a :href="project.github" target="_blank" class="project-button">
                <Github :size="18" />

                <span> View on GitHub </span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Github } from 'lucide-vue-next'

/* ==========================================================
   PROJECT DATA
========================================================== */

const projects = [
  {
    title: 'Sistem Prediksi Servis Motor',

    role: 'Academic Project',

    image: '/projects/mmssport.png',

    description:
      'Aplikasi prediksi jadwal servis kendaraan berbasis web dengan dashboard monitoring, riwayat servis, manajemen kendaraan, serta sistem prediksi servis berbasis kilometer.',

    tech: ['Laravel', 'Vue.js', 'MySQL', 'REST API'],

    github: '#',
  },

  {
    title: 'ProFileX',

    role: 'Academic Project',

    image: '/projects/profilex.png',

    description:
      'Platform SaaS modern untuk membuat Company Profile dengan autentikasi, dashboard admin, subscription, payment, dan REST API.',

    tech: ['Laravel', 'Vue.js', 'Sanctum', 'TailAdmin'],

    github: '#',
  },

  {
    title: 'CoffeeFinder',

    role: 'Academic Project',

    image: '/projects/coffeefinder.png',

    description:
      'Sistem Informasi Geografis untuk menemukan coffee shop menggunakan peta interaktif, pencarian lokasi, dan filter fasilitas.',

    tech: ['Vue.js', 'Leaflet', 'OpenStreetMap', 'Laravel'],

    github: '#',
  },
]
</script>
