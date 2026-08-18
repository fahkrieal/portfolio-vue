<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { projectsData } from '@/data/projects'
import { ArrowLeft, ArrowUpRight, Github, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()
const router = useRouter()

const currentSlug = computed(() => route.params.slug)

const project = computed(() => {
  return projectsData.find((p) => p.slug === currentSlug.value) || projectsData[0]
})

const currentIndex = computed(() => {
  return projectsData.findIndex((p) => p.slug === project.value.slug)
})

const prevProject = computed(() => {
  const prevIdx = (currentIndex.value - 1 + projectsData.length) % projectsData.length
  return projectsData[prevIdx]
})

const nextProject = computed(() => {
  const nextIdx = (currentIndex.value + 1) % projectsData.length
  return projectsData[nextIdx]
})

const goBackToWork = () => {
  router.push('/').then(() => {
    setTimeout(() => {
      const el = document.getElementById('projects')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  })
}

const navigateToProject = (slug) => {
  router.push(`/work/${slug}`).then(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}
</script>

<template>
  <div class="case-study-page">
    <Navbar />

    <div class="app-background-grid" aria-hidden="true"></div>

    <main class="case-study-main">
      <div class="site-container">
        <!-- Back Navigation Bar -->
        <div class="case-study-nav-bar">
          <button
            class="back-to-work-btn font-mono"
            data-cursor="BACK"
            @click="goBackToWork"
          >
            <ArrowLeft :size="15" />
            <span>BACK TO ALL WORK</span>
          </button>

          <span class="case-study-index-tag font-mono">
            {{ project.index }} / 03
          </span>
        </div>

        <!-- Project Hero Header -->
        <header class="case-study-hero">
          <div class="project-kicker-row font-mono">
            <span class="kicker-pill">{{ project.category }}</span>
            <span class="kicker-year">{{ project.year }}</span>
          </div>

          <h1 class="case-study-title">
            {{ project.title }}
          </h1>

          <p class="case-study-subtitle font-mono">
            {{ project.subtitle }}
          </p>

          <!-- Key Metrics Grid -->
          <div class="case-study-stats-bar">
            <div
              v-for="stat in project.stats"
              :key="stat.label"
              class="stat-cell"
            >
              <span class="stat-label font-mono">{{ stat.label }}</span>
              <span class="stat-value">{{ stat.value }}</span>
            </div>
          </div>
        </header>

        <!-- Main Project Screenshot -->
        <div class="case-study-media-frame">
          <img
            :src="project.image"
            :alt="project.title"
            class="case-study-image"
          />
        </div>

        <!-- Case Study Body Content -->
        <div class="case-study-grid-content">
          <!-- Main Narrative Column -->
          <div class="case-study-narrative-col">
            <!-- 01: Overview -->
            <section class="case-section">
              <div class="case-section-kicker font-mono">01 // OVERVIEW</div>
              <h2 class="case-section-heading">Project Context &amp; Purpose</h2>
              <p class="case-paragraph">{{ project.overview }}</p>
            </section>

            <!-- 02: Problem -->
            <section class="case-section">
              <div class="case-section-kicker font-mono">02 // THE PROBLEM</div>
              <h2 class="case-section-heading">Challenges Addressed</h2>
              <p class="case-paragraph">{{ project.problem }}</p>
            </section>

            <!-- 03: Architecture & Engineering -->
            <section class="case-section">
              <div class="case-section-kicker font-mono">03 // ARCHITECTURE</div>
              <h2 class="case-section-heading">System Design &amp; Implementation</h2>
              <p class="case-paragraph">{{ project.approach }}</p>

              <div class="architecture-bullet-list">
                <div
                  v-for="(item, idx) in project.architecture"
                  :key="idx"
                  class="arch-item"
                >
                  <CheckCircle2 :size="16" class="arch-icon" />
                  <span class="arch-text">{{ item }}</span>
                </div>
              </div>
            </section>

            <!-- 04: Key Features -->
            <section class="case-section">
              <div class="case-section-kicker font-mono">04 // CAPABILITIES</div>
              <h2 class="case-section-heading">Core System Features</h2>
              <ul class="features-list">
                <li
                  v-for="(feature, idx) in project.features"
                  :key="idx"
                  class="feature-list-item"
                >
                  <span class="feature-bullet font-mono">0{{ idx + 1 }}.</span>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </section>

            <!-- 05: Engineering Challenges -->
            <section class="case-section">
              <div class="case-section-kicker font-mono">05 // RESOLUTION</div>
              <h2 class="case-section-heading">Engineering Trade-offs &amp; Challenges</h2>
              <p class="case-paragraph">{{ project.challenges }}</p>
            </section>
          </div>

          <!-- Sidebar Sticky Column -->
          <aside class="case-study-sidebar">
            <div class="sidebar-sticky-panel">
              <div class="sidebar-section">
                <span class="sidebar-title font-mono">TECH STACK MATRIX</span>
                <div class="sidebar-tags">
                  <span
                    v-for="tech in project.tech"
                    :key="tech"
                    class="sidebar-tech-tag font-mono"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div class="sidebar-section">
                <span class="sidebar-title font-mono">REPOSITORY &amp; LINKS</span>
                <div class="sidebar-links-list">
                  <a
                    v-if="project.github"
                    :href="project.github"
                    target="_blank"
                    class="sidebar-link-btn"
                    data-cursor="CODE"
                  >
                    <Github :size="16" />
                    <span>View GitHub Source</span>
                    <ArrowUpRight :size="14" />
                  </a>

                  <a
                    v-if="project.liveUrl"
                    :href="project.liveUrl"
                    target="_blank"
                    class="sidebar-link-btn highlight"
                    data-cursor="OPEN"
                  >
                    <span>Launch Live App</span>
                    <ArrowUpRight :size="14" />
                  </a>
                </div>
              </div>

              <div class="sidebar-section">
                <span class="sidebar-title font-mono">STATUS</span>
                <span class="sidebar-status-value font-mono">{{ project.status }}</span>
              </div>
            </div>
          </aside>
        </div>

        <!-- Project Pagination Bar -->
        <nav class="case-study-pagination" aria-label="Project Navigation">
          <button
            class="pagination-nav-btn prev"
            data-cursor="PREV"
            @click="navigateToProject(prevProject.slug)"
          >
            <ChevronLeft :size="20" />
            <div class="pagination-meta">
              <span class="pagination-sub font-mono">PREVIOUS PROJECT</span>
              <span class="pagination-title font-display">{{ prevProject.title }}</span>
            </div>
          </button>

          <button
            class="pagination-nav-btn next"
            data-cursor="NEXT"
            @click="navigateToProject(nextProject.slug)"
          >
            <div class="pagination-meta text-right">
              <span class="pagination-sub font-mono">NEXT PROJECT</span>
              <span class="pagination-title font-display">{{ nextProject.title }}</span>
            </div>
            <ChevronRight :size="20" />
          </button>
        </nav>
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.case-study-page {
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
}

.case-study-main {
  padding-top: calc(var(--header-height) + 2.5rem);
  padding-bottom: 6rem;
  flex: 1;
}

/* Nav Bar */
.case-study-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-hairline);
  margin-bottom: 3rem;
}

.back-to-work-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
  transition: color var(--transition-fast), transform var(--transition-fast);
}

.back-to-work-btn:hover {
  color: var(--accent-amber);
  transform: translateX(-4px);
}

.case-study-index-tag {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent-amber);
}

/* Hero Header */
.case-study-hero {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 3.5rem;
}

.project-kicker-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.kicker-pill {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-amber);
  background: var(--accent-amber-subtle);
  padding: 0.25rem 0.625rem;
  border-radius: 2px;
}

.kicker-year {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.case-study-title {
  font-size: clamp(2.5rem, 5.5vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: var(--text-primary);
  text-transform: uppercase;
}

.case-study-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.5;
  max-width: 800px;
}

/* Stats Bar */
.case-study-stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--border-hairline);
  border-bottom: 1px solid var(--border-hairline);
  margin-top: 1.5rem;
}

.stat-cell {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.stat-value {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* Media Frame */
.case-study-media-frame {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: #0a0d12;
  border: 1px solid var(--border-subtle);
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9);
  margin-bottom: 4.5rem;
}

.case-study-image {
  width: 100%;
  max-height: 620px;
  object-fit: cover;
  object-position: top center;
}

/* Content Grid */
.case-study-grid-content {
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: clamp(3rem, 6vw, 5.5rem);
  align-items: start;
}

.case-study-narrative-col {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.case-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.case-section-kicker {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--accent-amber);
}

.case-section-heading {
  font-size: clamp(1.375rem, 2.2vw, 1.875rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.case-paragraph {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

/* Architecture List */
.architecture-bullet-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-top: 0.5rem;
}

.arch-item {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-hairline);
  border-radius: 4px;
}

.arch-icon {
  color: var(--accent-amber);
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.arch-text {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--text-secondary);
}

/* Features List */
.features-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-list-item {
  display: flex;
  align-items: baseline;
  gap: 0.875rem;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--text-secondary);
}

.feature-bullet {
  color: var(--accent-amber);
  font-weight: 600;
  font-size: 0.8125rem;
}

/* Sidebar */
.case-study-sidebar {
  position: relative;
}

.sidebar-sticky-panel {
  position: sticky;
  top: calc(var(--header-height) + 2rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background: #0a0d12;
  border: 1px solid var(--border-hairline);
  border-radius: 4px;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-title {
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

.sidebar-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.sidebar-tech-tag {
  font-size: 0.75rem;
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-hairline);
  padding: 0.35rem 0.625rem;
  border-radius: 2px;
}

.sidebar-links-list {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.sidebar-link-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-primary);
  transition: background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
}

.sidebar-link-btn:hover {
  background: var(--accent-amber);
  color: var(--bg-primary);
  border-color: var(--accent-amber);
}

.sidebar-status-value {
  font-size: 0.8125rem;
  color: var(--accent-amber);
}

/* Pagination */
.case-study-pagination {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 6rem;
  padding-top: 3rem;
  border-top: 1px solid var(--border-hairline);
}

.pagination-nav-btn {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-hairline);
  border-radius: 4px;
  flex: 1;
  transition: border-color var(--transition-fast), background var(--transition-fast);
  text-align: left;
}

.pagination-nav-btn.next {
  justify-content: flex-end;
}

.pagination-nav-btn:hover {
  border-color: var(--accent-amber);
  background: rgba(229, 168, 91, 0.04);
}

.pagination-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.pagination-sub {
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  color: var(--accent-amber);
}

.pagination-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
}

@media (max-width: 992px) {
  .case-study-grid-content {
    grid-template-columns: 1fr;
  }
  .case-study-stats-bar {
    grid-template-columns: repeat(2, 1fr);
  }
  .case-study-pagination {
    flex-direction: column;
  }
}
</style>
