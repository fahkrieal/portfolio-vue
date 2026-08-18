<script setup>
import { Cpu, Database, GitBranch, Layers } from 'lucide-vue-next'

const categories = [
  {
    id: 'frontend',
    title: 'FRONTEND ARCHITECTURE',
    icon: Layers,
    index: '01',
    description: 'Pembangunan antarmuka pengguna modern yang reaktif, modular, dan cepat.',
    skills: [
      { name: 'Vue.js 3', focus: 'Composition API, Vue Router, Single-File Components' },
      { name: 'JavaScript (ES6+)', focus: 'Async/Await, DOM manipulation, Module Bundling' },
      { name: 'Tailwind CSS', focus: 'Utility-first styling, Custom design tokens, Responsiveness' },
      { name: 'HTML5 & CSS3', focus: 'Semantic markup, CSS Grid, Flexbox, Variable Animations' },
      { name: 'Three.js / WebGL', focus: 'Procedural 3D scenes, Canvas integration, Optimization' },
    ]
  },
  {
    id: 'backend',
    title: 'BACKEND & API ENGINEERING',
    icon: Cpu,
    index: '02',
    description: 'Perancangan logika server, pengamanan endpoint, dan arsitektur RESTful API.',
    skills: [
      { name: 'Laravel Framework', focus: 'MVC pattern, Routing, Eloquent ORM, Middleware' },
      { name: 'PHP 8+', focus: 'Object-Oriented Programming, Type Safety, Exception Handling' },
      { name: 'RESTful API Design', focus: 'JSON resource transformations, HTTP status codes, Validation' },
      { name: 'Laravel Sanctum', focus: 'Token-based API authentication & SPA security' },
    ]
  },
  {
    id: 'database',
    title: 'DATABASE & SPATIAL SYSTEMS',
    icon: Database,
    index: '03',
    description: 'Pemodelan data relasional, efisiensi query, dan sistem informasi geografis.',
    skills: [
      { name: 'MySQL', focus: 'Relational schema design, Foreign keys, Indexing, Transactions' },
      { name: 'Database Normalization', focus: '1NF to 3NF schema structuring to prevent data redundancy' },
      { name: 'Leaflet.js & OpenStreetMap', focus: 'Interactive map rendering, Layer controls, Custom markers' },
      { name: 'Spatial Coordinate Querying', focus: 'Latitude & Longitude coordinate filtering & bounding box' },
    ]
  },
  {
    id: 'workflow',
    title: 'DEVELOPMENT WORKFLOW & TOOLS',
    icon: GitBranch,
    index: '04',
    description: 'Standar pengujian, kolaborasi kode sumber, dan otomatisasi tooling pengembang.',
    skills: [
      { name: 'Git & GitHub', focus: 'Version control, Branching strategies, Commit standards' },
      { name: 'Postman', focus: 'API endpoint testing, Payload debugging, Collection documentation' },
      { name: 'Vite Ecosystem', focus: 'Fast HMR, Modern build pipeline, Asset bundling' },
      { name: 'Figma to Code', focus: 'Translating design specifications into responsive web components' },
    ]
  }
]
</script>

<template>
  <section id="skills" class="section-wrapper skills-section">
    <div class="site-container">
      <!-- Section Header -->
      <div class="section-header-editorial">
        <div class="section-kicker font-mono">
          <span class="section-kicker-dot"></span>
          <span>03 / TECH STACK</span>
        </div>
        <div class="skills-header-split">
          <h2 class="section-title-huge font-display">
            TECHNOLOGIES &amp;<br />EXPERTISE MATRIX
          </h2>
          <p class="skills-lead-text">
            Ekosistem teknologi dan perangkat rekayasa perangkat lunak yang saya gunakan untuk membangun sistem web yang stabil, skalabel, dan efisien.
          </p>
        </div>
      </div>

      <!-- Technical Matrix Grid -->
      <div class="tech-matrix-grid">
        <div
          v-for="category in categories"
          :key="category.id"
          class="matrix-category-panel"
        >
          <!-- Category Header -->
          <div class="category-header-row font-mono">
            <div class="category-title-group">
              <span class="category-index">{{ category.index }}</span>
              <component :is="category.icon" :size="16" class="category-icon" />
              <h3 class="category-title">{{ category.title }}</h3>
            </div>
          </div>

          <p class="category-description">{{ category.description }}</p>

          <!-- Skills List -->
          <div class="category-skills-list">
            <div
              v-for="skill in category.skills"
              :key="skill.name"
              class="matrix-skill-row"
            >
              <div class="skill-main-info">
                <span class="skill-name font-mono">{{ skill.name }}</span>
                <span class="skill-focus-text">{{ skill.focus }}</span>
              </div>
              <span class="skill-status-tag font-mono">CORE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  background: transparent;
}

.skills-header-split {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;
  align-items: flex-end;
}

.skills-lead-text {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--text-secondary);
  max-width: 500px;
}

/* Matrix Grid */
.tech-matrix-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.75rem;
  margin-top: 1rem;
}

.matrix-category-panel {
  background: #0a0d12;
  border: 1px solid var(--border-hairline);
  border-radius: 6px;
  padding: clamp(1.25rem, 3vw, 2rem);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.matrix-category-panel:hover {
  border-color: rgba(229, 168, 91, 0.35);
  box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.8);
}

.category-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.875rem;
  border-bottom: 1px solid var(--border-hairline);
}

.category-title-group {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.category-index {
  color: var(--accent-amber);
  font-weight: 700;
  font-size: 0.8125rem;
}

.category-icon {
  color: var(--accent-amber);
}

.category-title {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--text-primary);
}

.category-description {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

/* Skills List */
.category-skills-list {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.matrix-skill-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.875rem;
  padding: 0.75rem 0.875rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-hairline);
  border-radius: 3px;
  transition: background var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
}

.matrix-skill-row:hover {
  background: rgba(229, 168, 91, 0.04);
  border-color: rgba(229, 168, 91, 0.4);
  transform: translateX(3px);
}

.skill-main-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.skill-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.skill-focus-text {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.35;
}

.skill-status-tag {
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--accent-amber);
  background: var(--accent-amber-subtle);
  padding: 0.2rem 0.45rem;
  border-radius: 2px;
  white-space: nowrap;
}

/* Responsiveness */
@media (max-width: 992px) {
  .skills-header-split {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .tech-matrix-grid {
    grid-template-columns: 1fr;
  }
}
</style>
