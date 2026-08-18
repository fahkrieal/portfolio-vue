<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Menu, X, ArrowUpRight } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('hero')

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Portfolio' },
  { id: 'skills', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20

  if (route.path === '/') {
    const scrollPos = window.scrollY + 200
    for (let i = navItems.length - 1; i >= 0; i--) {
      const section = document.getElementById(navItems[i].id)
      if (section && section.offsetTop <= scrollPos) {
        activeSection.value = navItems[i].id
        break
      }
    }
  }
}

const navigateToSection = (sectionId) => {
  isMobileMenuOpen.value = false
  if (route.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    })
  } else {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="site-navbar"
    :class="{ 'has-scrolled': isScrolled, 'menu-open': isMobileMenuOpen }"
  >
    <div class="site-container navbar-container">
      <!-- Brand Logo -->
      <a
        href="#hero"
        class="brand-tag font-mono"
        data-cursor="LINK"
        @click.prevent="navigateToSection('hero')"
      >
        <span>fahkrie.dev</span>
      </a>

      <!-- Desktop Navigation Menu -->
      <nav class="desktop-nav-menu font-mono" aria-label="Main Navigation">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="nav-link-btn"
          :class="{ 'is-active': activeSection === item.id }"
          data-cursor="LINK"
          @click="navigateToSection(item.id)"
        >
          <span class="active-dot" v-if="activeSection === item.id"></span>
          {{ item.label }}
        </button>

        <a
          href="/cv.pdf"
          target="_blank"
          class="nav-cv-pill"
          data-cursor="PDF"
        >
          <span>CV</span>
          <ArrowUpRight :size="12" />
        </a>
      </nav>

      <!-- Mobile Hamburger Button -->
      <button
        class="mobile-toggle-btn"
        aria-label="Toggle Navigation Menu"
        @click="toggleMobileMenu"
      >
        <Menu v-if="!isMobileMenuOpen" :size="20" />
        <X v-else :size="20" />
      </button>
    </div>

    <!-- Mobile Drawer Overlay -->
    <transition name="drawer-fade">
      <div v-if="isMobileMenuOpen" class="mobile-nav-drawer">
        <div class="drawer-inner font-mono">
          <div class="drawer-status">
            <span class="status-amber-dot"></span>
            <span>AVAILABLE FOR WORK &amp; INTERNSHIP</span>
          </div>

          <div class="drawer-links">
            <button
              v-for="(item, idx) in navItems"
              :key="item.id"
              class="drawer-link"
              :class="{ 'is-active': activeSection === item.id }"
              @click="navigateToSection(item.id)"
            >
              <span class="drawer-idx">0{{ idx + 1 }}</span>
              <span class="drawer-label font-display">{{ item.label }}</span>
            </button>

            <a
              href="/cv.pdf"
              target="_blank"
              class="drawer-link cv font-display"
              @click="isMobileMenuOpen = false"
            >
              <span class="drawer-idx">06</span>
              <span class="drawer-label">Download CV (PDF)</span>
              <ArrowUpRight :size="18" />
            </a>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.site-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  z-index: 100;
  display: flex;
  align-items: center;
  transition: background var(--transition-normal), backdrop-filter var(--transition-normal), border-color var(--transition-normal);
  border-bottom: 1px solid transparent;
}

.site-navbar.has-scrolled,
.site-navbar.menu-open {
  background: #0c0e12 !important;
  backdrop-filter: blur(20px);
  border-bottom-color: var(--border-hairline);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

/* Brand */
.brand-tag {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  opacity: 0.9;
  transition: opacity var(--transition-fast), color var(--transition-fast);
}

.brand-tag:hover {
  opacity: 1;
  color: var(--accent-amber);
}

/* Desktop Menu */
.desktop-nav-menu {
  display: none;
  align-items: center;
  gap: 1.75rem;
}

@media (min-width: 768px) {
  .desktop-nav-menu {
    display: inline-flex;
  }
}

.nav-link-btn {
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--text-secondary);
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: color var(--transition-fast);
}

.nav-link-btn:hover {
  color: var(--text-primary);
}

.nav-link-btn.is-active {
  color: var(--text-primary);
}

.active-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent-amber);
  box-shadow: 0 0 6px var(--accent-amber);
}

.nav-cv-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem 0.65rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent-amber);
  background: var(--accent-amber-subtle);
  border-radius: 999px;
  border: 1px solid rgba(229, 168, 91, 0.2);
  transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
}

.nav-cv-pill:hover {
  background: var(--accent-amber);
  color: #0c0e12;
  border-color: var(--accent-amber);
}

/* Mobile Toggle Button */
.mobile-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: #141822;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
  transition: border-color var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
}

.mobile-toggle-btn:hover,
.mobile-toggle-btn:active {
  border-color: var(--accent-amber);
  color: var(--accent-amber);
  background: #1a202c;
}

@media (min-width: 768px) {
  .mobile-toggle-btn {
    display: none;
  }
}

.mobile-nav-drawer {
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: calc(100dvh - var(--header-height));
  background: #0c0e12 !important;
  border-top: 1px solid var(--border-hairline);
  padding: 2rem var(--container-padding);
  z-index: 99999;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* Mobile Specific Navbar Rules - Always Solid Opaque on Mobile */
@media (max-width: 767px) {
  .site-navbar {
    background: #0c0e12 !important;
    backdrop-filter: none;
    border-bottom: 1px solid var(--border-hairline);
  }
}

.drawer-inner {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.drawer-status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  color: var(--accent-amber);
}

.status-amber-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-amber);
  box-shadow: 0 0 8px var(--accent-amber);
}

.drawer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.drawer-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  text-align: left;
  border-bottom: 1px solid var(--border-hairline);
  color: var(--text-secondary);
  transition: color var(--transition-fast);
}

.drawer-link.is-active {
  color: var(--text-primary);
  border-bottom-color: var(--accent-amber);
}

.drawer-idx {
  font-size: 0.75rem;
  color: var(--accent-amber);
}

.drawer-label {
  font-size: 1.25rem;
  font-weight: 700;
  color: inherit;
}

.drawer-link.cv {
  color: var(--accent-amber);
}

.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
