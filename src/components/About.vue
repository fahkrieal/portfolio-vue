<script setup>
import { Layers, Database, Cpu, MapPin } from 'lucide-vue-next'

const competencies = [
  {
    icon: Cpu,
    title: 'Backend & RESTful API',
    desc: 'Membangun arsitektur server dengan Laravel, autentikasi Sanctum, middleware keamanan, dan standardisasi endpoint JSON yang terstruktur.',
  },
  {
    icon: Database,
    title: 'Database Architecture',
    desc: 'Merancang skema relasi MySQL dari normalisasi 1NF hingga 3NF dengan optimasi indexing untuk mencegah bottleneck query.',
  },
  {
    icon: Layers,
    title: 'Reactive Frontend Systems',
    desc: 'Menyusun antarmuka modular dengan Vue.js 3 Composition API, Tailwind CSS, dan state management yang responsif di seluruh perangkat.',
  },
  {
    icon: MapPin,
    title: 'Spatial & GIS Integration',
    desc: 'Implementasi pemetaan geospatial interaktif menggunakan Leaflet.js dan OpenStreetMap layer berbasis koordinat latitude & longitude.',
  },
]

const journeyTimeline = [
  {
    period: '2021 — SEKARANG',
    role: 'S1 Teknik Informatika (Semester 7)',
    institution: 'Institut Teknologi Indonesia',
    highlight: 'Fokus pada Software Engineering, Algoritma, Basis Data, dan Arsitektur Web.',
  },
  {
    period: '2026',
    role: 'Full-Stack Developer (Projects)',
    institution: 'Sistem Prediksi Servis & ProFileX SaaS',
    highlight: 'Implementasi backend REST API Laravel, autentikasi token, dan frontend Vue.js.',
  },
  {
    period: '2026',
    role: 'Spatial GIS Developer',
    institution: 'CoffeeFinder Interactive System',
    highlight: 'Perancangan sistem informasi geografis berbasis peta interaktif dengan filter fasilitas spasial.',
  },
]
</script>

<template>
  <section id="about" class="section-wrapper about-section">
    <div class="site-container">
      <!-- Section Header -->
      <div class="section-header-editorial">
        <div class="section-kicker font-mono">
          <span class="section-kicker-dot"></span>
          <span>01 / ABOUT ME</span>
        </div>
        <h2 class="section-title-huge font-display">
          MENGGABUNGKAN REKAYASA SISTEM<br />DENGAN KUALITAS INTERAKSI.
        </h2>
      </div>

      <!-- Main Asymmetrical Grid -->
      <div class="about-main-grid">
        <!-- Left: Narrative Column -->
        <div class="about-narrative-column">
          <div class="about-quote-box">
            <p class="about-quote-text font-display">
              "Fokus saya adalah membangun perangkat lunak web yang bekerja dengan andal di balik layar dan terasa intuitif serta menyenangkan saat digunakan."
            </p>
          </div>

          <div class="about-text-paragraphs">
            <p>
              Saya adalah mahasiswa Teknik Informatika di <strong>Institut Teknologi Indonesia</strong> yang saat ini menempuh <strong>Semester 7</strong>. Ketertarikan saya berakar pada pengembangan web menyeluruh (full-stack development)—mulai dari membedah alur logika backend, merancang endpoint API yang aman, hingga merajut interaksi antarmuka yang cepat dan responsif.
            </p>
            <p>
              Dalam setiap proyek, saya selalu memprioritaskan kerapian struktur kode, integritas data pada database MySQL, serta kemudahan bagi pengguna akhir saat berinteraksi dengan sistem.
            </p>
          </div>

          <!-- Competency Cards Grid -->
          <div class="competency-cards-grid">
            <div
              v-for="item in competencies"
              :key="item.title"
              class="competency-card"
            >
              <div class="competency-header">
                <component :is="item.icon" :size="20" class="competency-icon" />
                <h3 class="competency-title font-mono">{{ item.title }}</h3>
              </div>
              <p class="competency-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Right: Education & Timeline Panel -->
        <div class="about-timeline-panel">
          <div class="panel-header font-mono">
            <span>TIMELINE &amp; AKADEMIK</span>
            <span class="panel-status font-mono">SEMESTER 07</span>
          </div>

          <div class="timeline-list">
            <div
              v-for="(item, idx) in journeyTimeline"
              :key="idx"
              class="timeline-card"
            >
              <div class="timeline-meta-row font-mono">
                <span class="timeline-period">{{ item.period }}</span>
                <span class="timeline-dot-sep">•</span>
                <span class="timeline-inst">{{ item.institution }}</span>
              </div>
              <h4 class="timeline-role font-display">{{ item.role }}</h4>
              <p class="timeline-highlight">{{ item.highlight }}</p>
            </div>
          </div>

          <!-- Quick Skills Monospace Matrix -->
          <div class="academic-focus-box">
            <span class="focus-title font-mono">CORE DOMAINS:</span>
            <div class="focus-pills font-mono">
              <span class="mono-pill">Full-Stack Architecture</span>
              <span class="mono-pill">RESTful API Design</span>
              <span class="mono-pill">MySQL Schema Normalization</span>
              <span class="mono-pill">Web GIS &amp; Spatial Bounds</span>
              <span class="mono-pill">Modern UI Engineering</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  background: transparent;
}

.about-main-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(2.5rem, 5vw, 5rem);
  align-items: start;
}

/* Left Narrative */
.about-narrative-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about-quote-box {
  border-left: 2px solid var(--accent-amber);
  padding-left: 1.5rem;
}

.about-quote-text {
  font-size: clamp(1.125rem, 1.5vw, 1.35rem);
  font-weight: 600;
  line-height: 1.5;
  color: var(--text-primary);
}

.about-text-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

.about-text-paragraphs strong {
  color: var(--text-primary);
  font-weight: 600;
}

/* Competency Grid */
.competency-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-top: 0.5rem;
}

.competency-card {
  background: rgba(15, 18, 24, 0.6);
  border: 1px solid var(--border-hairline);
  padding: 1.25rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  transition: border-color var(--transition-fast), background var(--transition-fast), transform var(--transition-fast);
}

.competency-card:hover {
  border-color: rgba(229, 168, 91, 0.4);
  background: rgba(229, 168, 91, 0.03);
  transform: translateY(-2px);
}

.competency-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.competency-icon {
  color: var(--accent-amber);
}

.competency-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.competency-desc {
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--text-secondary);
}

/* Right Timeline Panel */
.about-timeline-panel {
  background: #0a0d12;
  border: 1px solid var(--border-hairline);
  border-radius: 6px;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.875rem;
  border-bottom: 1px solid var(--border-hairline);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.panel-status {
  color: var(--accent-amber);
}

.timeline-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border-hairline);
}

.timeline-card:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.timeline-meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.6875rem;
}

.timeline-period {
  color: var(--accent-amber);
  font-weight: 600;
}

.timeline-dot-sep {
  color: var(--text-muted);
}

.timeline-inst {
  color: var(--text-secondary);
}

.timeline-role {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}

.timeline-highlight {
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--text-muted);
}

/* Academic Focus Box */
.academic-focus-box {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px dashed var(--border-hairline);
}

.focus-title {
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.focus-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* Mobile Responsiveness */
@media (max-width: 992px) {
  .about-main-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 600px) {
  .competency-cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
