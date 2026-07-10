<script setup>
import { Monitor, Server, Database, Wrench } from 'lucide-vue-next'

const skills = [
  {
    title: 'Frontend Engineering',
    icon: Monitor,
    description: 'Building responsive and modern user interfaces.',
    items: ['Vue.js', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    title: 'Backend Engineering',
    icon: Server,
    description: 'Developing scalable APIs and web applications.',
    items: ['Laravel', 'PHP', 'REST API', 'Sanctum'],
  },
  {
    title: 'Database & API',
    icon: Database,
    description: 'Managing data structures and backend integration.',
    items: ['MySQL', 'Database Design', 'API Integration'],
  },
  {
    title: 'Development Workflow',
    icon: Wrench,
    description: 'Tools used for collaboration and deployment.',
    items: ['Git', 'GitHub', 'Postman', 'Figma', 'TailAdmin'],
  },
]
</script>

<template>
  <section id="skills" class="skill-section">
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
    
    <!-- Ambient glow -->
    <div class="skill-glow"></div>

    <div class="skill-container">
      <!-- Header -->
      <div class="skill-header" data-aos="fade-up">
        <span class="skill-kicker">
          <span class="skill-kicker-dot"></span>
          Skills
        </span>

        <h2 class="skill-heading">Technologies &amp; Expertise</h2>

        <p class="skill-subtext">
          Tools, technologies, and frameworks I use to design, develop, and deploy modern web
          applications.
        </p>
      </div>

      <!-- Index list -->
      <div class="skill-list">
        <div
          v-for="(skill, index) in skills"
          :key="skill.title"
          class="skill-row"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <span class="skill-index">
            {{ String(index + 1).padStart(2, '0') }}
          </span>

          <div class="skill-icon-wrap">
            <component :is="skill.icon" :size="22" class="skill-icon" />
          </div>

          <div class="skill-row-head">
            <h3 class="skill-row-title">{{ skill.title }}</h3>
            <p class="skill-row-desc">{{ skill.description }}</p>
          </div>

          <div class="skill-tags">
            <span v-for="item in skill.items" :key="item" class="skill-tag">
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
