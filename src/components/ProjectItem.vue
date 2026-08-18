<script setup>
import { ArrowUpRight, Github } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})

const router = useRouter()

const openCaseStudy = () => {
  router.push(`/work/${props.project.slug}`)
}
</script>

<template>
  <article
    class="project-card-editorial"
    :class="{ 'is-reverse': index % 2 === 1 }"
  >
    <!-- Media Visual Frame -->
    <div
      class="project-media-wrapper"
      data-cursor="VIEW"
      @click="openCaseStudy"
    >
      <div class="project-media-shell">
        <div class="project-image-box">
          <img
            :src="project.image"
            :alt="project.title"
            class="project-img"
            loading="lazy"
          />
          <div class="project-vignette"></div>
        </div>

        <!-- Corner Floating Quick Badge -->
        <div class="project-media-badge font-mono">
          <span>CASE STUDY // {{ project.year }}</span>
          <ArrowUpRight :size="13" />
        </div>
      </div>
    </div>

    <!-- Editorial Details Column -->
    <div class="project-details-column">
      <!-- Index & Meta -->
      <div class="project-index-row font-mono">
        <span class="project-number">{{ project.index }}</span>
        <div class="project-tag-group">
          <span class="project-category-badge">{{ project.category }}</span>
          <span class="project-role-badge">{{ project.role }}</span>
        </div>
      </div>

      <!-- Title & Subtitle -->
      <div class="project-title-group">
        <h3
          class="project-heading font-display"
          data-cursor="VIEW"
          @click="openCaseStudy"
        >
          {{ project.title }}
        </h3>
        <p class="project-subtitle font-mono">{{ project.subtitle }}</p>
      </div>

      <!-- Summary Narrative -->
      <p class="project-summary">
        {{ project.summary }}
      </p>

      <!-- Tech Badges -->
      <div class="project-tech-chips font-mono">
        <span
          v-for="item in project.tech"
          :key="item"
          class="tech-chip"
        >
          {{ item }}
        </span>
      </div>

      <!-- Actions -->
      <div class="project-button-row">
        <button
          class="btn-magnetic btn-primary-editorial"
          data-cursor="OPEN"
          @click="openCaseStudy"
        >
          <span>VIEW CASE STUDY</span>
          <ArrowUpRight :size="15" />
        </button>

        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          class="btn-magnetic btn-secondary-editorial"
          data-cursor="CODE"
          aria-label="GitHub Repository"
        >
          <Github :size="15" />
          <span>SOURCE CODE</span>
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card-editorial {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(2.5rem, 5vw, 5rem);
  align-items: center;
  padding: clamp(3rem, 6vw, 5.5rem) 0;
  border-bottom: 1px solid var(--border-hairline);
}

.project-card-editorial.is-reverse {
  grid-template-columns: 0.85fr 1.15fr;
}

.project-card-editorial.is-reverse .project-media-wrapper {
  order: 2;
}

.project-card-editorial.is-reverse .project-details-column {
  order: 1;
}

/* Media Column */
.project-media-wrapper {
  cursor: pointer;
}

.project-media-shell {
  position: relative;
  background: #0d1017;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  padding: 0.5rem;
  box-shadow: 
    0 20px 40px -15px rgba(0, 0, 0, 0.85),
    0 0 1px 1px rgba(255, 255, 255, 0.05);
  transition: transform var(--transition-medium), border-color var(--transition-medium), box-shadow var(--transition-medium);
}

.project-media-wrapper:hover .project-media-shell {
  transform: translateY(-4px);
  border-color: rgba(229, 168, 91, 0.4);
  box-shadow: 
    0 30px 60px -15px rgba(0, 0, 0, 0.95),
    0 0 25px rgba(229, 168, 91, 0.12);
}

.project-image-box {
  position: relative;
  aspect-ratio: 16 / 10;
  border-radius: 4px;
  overflow: hidden;
  background: #060709;
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.6s var(--ease-expo), filter 0.6s ease;
  filter: brightness(0.92) contrast(1.05);
}

.project-media-wrapper:hover .project-img {
  transform: scale(1.03);
  filter: brightness(1) contrast(1.08);
}

.project-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 70%, rgba(6, 7, 9, 0.6) 100%);
  pointer-events: none;
}

.project-media-badge {
  position: absolute;
  bottom: 1.25rem;
  right: 1.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  background: rgba(6, 7, 9, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--text-primary);
  transition: background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
}

.project-media-wrapper:hover .project-media-badge {
  background: var(--accent-amber);
  color: var(--bg-primary);
  border-color: var(--accent-amber);
}

/* Details Column */
.project-details-column {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.project-index-row {
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
}

.project-number {
  font-size: clamp(2.25rem, 4vw, 3.5rem);
  font-weight: 700;
  color: var(--accent-amber);
  line-height: 0.9;
  letter-spacing: -0.04em;
}

.project-tag-group {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.project-category-badge {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-primary);
}

.project-role-badge {
  font-size: 0.6875rem;
  color: var(--text-muted);
}

.project-title-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.project-heading {
  font-size: clamp(1.75rem, 2.8vw, 2.25rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.project-heading:hover {
  color: var(--accent-amber);
}

.project-subtitle {
  font-size: 0.8125rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.project-summary {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-secondary);
}

/* Tech Chips */
.project-tech-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-chip {
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-hairline);
  padding: 0.25rem 0.625rem;
  border-radius: 2px;
  transition: border-color var(--transition-fast), color var(--transition-fast);
}

.tech-chip:hover {
  border-color: var(--accent-amber);
  color: var(--text-primary);
}

/* Buttons */
.project-button-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.875rem;
  margin-top: 0.5rem;
}

/* Responsiveness */
@media (max-width: 992px) {
  .project-card-editorial,
  .project-card-editorial.is-reverse {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .project-card-editorial.is-reverse .project-media-wrapper {
    order: 0;
  }
  .project-card-editorial.is-reverse .project-details-column {
    order: 1;
  }
}

@media (max-width: 480px) {
  .project-button-row {
    flex-direction: column;
    align-items: stretch;
  }
  .project-button-row .btn-magnetic {
    width: 100%;
  }
}
</style>
