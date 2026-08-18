<script setup>
import { ArrowUp } from 'lucide-vue-next'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <footer class="site-footer">
    <div class="site-container footer-inner">
      <div class="footer-brand-side">
        <div class="footer-logo font-display">
          <span>MF</span>
          <span class="footer-logo-divider">/</span>
          <span class="footer-logo-text font-mono">FAHKRIE.DEV</span>
        </div>
        <p class="footer-copy font-mono">
          © 2026 Muhamad Fahkrie Al Mufid. Engineered with Vue 3, Vite &amp; Three.js.
        </p>
      </div>

      <div class="footer-action-side">
        <button
          class="back-to-top-btn font-mono"
          data-cursor="TOP"
          @click="scrollToTop"
        >
          <span>BACK TO TOP</span>
          <ArrowUp :size="14" />
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--border-hairline);
  background: transparent;
  padding: 3rem 0 4rem;
  position: relative;
  z-index: 10;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-brand-side {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-logo {
  font-size: 1rem;
  font-weight: 800;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.footer-logo-divider {
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

.footer-logo-text {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
}

.footer-copy {
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.02em;
}

.back-to-top-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-hairline);
  border-radius: 2px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
  transition: color var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
}

.back-to-top-btn:hover {
  color: var(--text-primary);
  border-color: var(--accent-amber);
  background: rgba(229, 168, 91, 0.05);
}
</style>
