<script setup>
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue'
import About from '@/components/About.vue'
import Projects from '@/components/Projects.vue'
import Skills from '@/components/Skills.vue'
import Contact from '@/components/Contact.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="portfolio-editorial-app">
    <Navbar />
    
    <!-- Architectural Low-Opacity Background Grid Layer -->
    <div class="app-background-grid" aria-hidden="true"></div>

    <main id="main-content">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.portfolio-editorial-app {
  position: relative;
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
}

#main-content {
  flex: 1;
  position: relative;
  z-index: 1;
}
</style>
