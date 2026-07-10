<template>
  <header ref="navbarRef" class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-shell">
      <!-- ========================= -->
      <!-- Logo -->
      <!-- ========================= -->

      <a href="#hero" class="navbar-logo">
        <span class="logo-white"> Fahkrie </span>

        <span class="logo-cyan"> .dev </span>
      </a>

      <!-- ========================= -->
      <!-- Desktop Navigation -->
      <!-- ========================= -->

      <nav class="navbar-nav">
        <a href="#hero" class="nav-item"> Home </a>

        <a href="#about" class="nav-item"> About </a>

        <a href="#skills" class="nav-item"> Skills </a>

        <a href="#projects" class="nav-item"> Projects </a>

        <a href="#contact" class="nav-item"> Contact </a>
      </nav>

      <!-- ========================= -->
      <!-- Mobile Button -->
      <!-- ========================= -->

      <button class="navbar-toggle" @click="toggleMenu">
        <Menu v-if="!isOpen" :size="22" />

        <X v-else :size="22" />
      </button>
    </div>

    <!-- ========================= -->
    <!-- Mobile Menu -->
    <!-- ========================= -->

    <transition name="mobile">
      <div v-if="isOpen" class="mobile-menu">
        <a href="#hero" @click="closeMenu"> Home </a>

        <a href="#about" @click="closeMenu"> About </a>

        <a href="#skills" @click="closeMenu"> Skills </a>

        <a href="#projects" @click="closeMenu"> Projects </a>

        <a href="#contact" @click="closeMenu"> Contact </a>
      </div>
    </transition>
  </header>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Menu, X } from 'lucide-vue-next'

/* ========================================
   STATE
======================================== */

const isOpen = ref(false)
const isScrolled = ref(false)

/* ========================================
   NAVBAR REF
======================================== */

const navbarRef = ref(null)

/* ========================================
   MENU
======================================== */

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

/* ========================================
   SCROLL
======================================== */

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

/* ========================================
   RESIZE
======================================== */

const handleResize = () => {
  if (window.innerWidth > 992) {
    closeMenu()
  }
}

/* ========================================
   CLICK OUTSIDE
======================================== */

const handleClickOutside = (event) => {
  if (navbarRef.value && !navbarRef.value.contains(event.target)) {
    closeMenu()
  }
}

/* ========================================
   ESC
======================================== */

const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

/* ========================================
   MOUNT
======================================== */

onMounted(() => {
  handleScroll()

  window.addEventListener('scroll', handleScroll, { passive: true })

  window.addEventListener('resize', handleResize)

  document.addEventListener('mousedown', handleClickOutside)

  document.addEventListener('keydown', handleKeyDown)
})

/* ========================================
   DESTROY
======================================== */

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)

  window.removeEventListener('resize', handleResize)

  document.removeEventListener('mousedown', handleClickOutside)

  document.removeEventListener('keydown', handleKeyDown)
})
</script>
