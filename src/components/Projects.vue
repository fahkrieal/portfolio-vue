<script setup>
import { projectsData } from '@/data/projects'
import ProjectItem from '@/components/ProjectItem.vue'
</script>

<template>
  <section id="projects" class="section-wrapper projects-section">
    <div class="site-container">
      <!-- Section Header -->
      <div class="section-header-editorial">
        <div class="section-kicker">
          <span class="section-kicker-dot"></span>
          <span>02 // SELECTED WORK</span>
        </div>
        <div class="projects-header-split">
          <h2 class="section-title-huge">
            CURATED ENGINEERING<br />EXHIBITION
          </h2>
          <p class="projects-lead-text">
            Kumpulan proyek sistem web pilihan yang merefleksikan perancangan arsitektur RESTful API, pemodelan basis data terstruktur, dan antarmuka interaktif yang presisi.
          </p>
        </div>
      </div>

      <!-- Project Exhibition Feed -->
      <div class="projects-feed">
        <ProjectItem
          v-for="(project, index) in projectsData"
          :key="project.id"
          :project="project"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  background: transparent;
}

.projects-header-split {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;
  align-items: flex-end;
}

.projects-lead-text {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--text-secondary);
  max-width: 500px;
}

.projects-feed {
  display: flex;
  flex-direction: column;
}

@media (max-width: 992px) {
  .projects-header-split {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
