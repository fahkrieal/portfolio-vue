<template>
  <footer id="footer" class="footer">
    <!-- ========================= -->
    <!-- Background -->
    <!-- ========================= -->

    <div class="section-bg">
      <div class="section-grid"></div>

      <div class="section-light-left"></div>

      <div class="section-light-right"></div>

      <div class="section-light-top"></div>

      <div class="section-spotlight"></div>

      <div class="section-noise"></div>
    </div>

    <!-- ========================= -->
    <!-- Container -->
    <!-- ========================= -->

    <div class="footer-container">
      <!-- ========================= -->
      <!-- TOP -->
      <!-- ========================= -->

      <div class="footer-top">
        <!-- Brand -->

        <div class="footer-brand">
          <a href="#hero" class="footer-logo">
            <span class="logo-white"> Fahkrie </span>

            <span class="logo-cyan"> .dev </span>
          </a>

          <p class="footer-description">
            Full Stack Developer yang berfokus pada pengembangan aplikasi web modern menggunakan
            Laravel, Vue.js, MySQL, REST API, dan teknologi web modern.
          </p>
        </div>

        <!-- Navigation -->

        <div class="footer-navigation">
          <h4>Navigation</h4>

          <nav>
            <a href="#hero"> Home </a>

            <a href="#about"> About </a>

            <a href="#skills"> Skills </a>

            <a href="#projects"> Projects </a>

            <a href="#contact"> Contact </a>
          </nav>
        </div>

        <!-- Social -->

        <div class="footer-social">
          <h4>Connect</h4>

          <div class="footer-social-list">
            <a href="https://github.com/fahkrieal" target="_blank" class="footer-social-item">
              <Github :size="20" />
            </a>

            <a
              href="https://www.linkedin.com/in/muhamad-fahkrie-al-mufid-883bbb257/"
              target="_blank"
              class="footer-social-item"
            >
              <Linkedin :size="20" />
            </a>

            <a href="mailto:m.fahkri123@gmail.com" class="footer-social-item">
              <Mail :size="20" />
            </a>
          </div>
        </div>
      </div>

      <!-- ========================= -->
      <!-- Bottom -->
      <!-- ========================= -->

      <div class="footer-bottom">
        <p>© 2026 Muhamad Fahkrie Al Mufid. All Rights Reserved.</p>

        <p>Crafted with Vue.js • Vite • Tailwind CSS</p>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { Github, Linkedin, Mail } from 'lucide-vue-next'

/* ==========================================================
   FOOTER DATA
========================================================== */

const footer = {
  brand: {
    name: 'Fahkrie',

    suffix: '.dev',

    description:
      'Full Stack Developer yang berfokus pada pengembangan aplikasi web modern menggunakan Laravel, Vue.js, MySQL, REST API, dan teknologi web modern.',
  },

  navigation: [
    {
      name: 'Home',
      href: '#hero',
    },

    {
      name: 'About',
      href: '#about',
    },

    {
      name: 'Skills',
      href: '#skills',
    },

    {
      name: 'Projects',
      href: '#projects',
    },

    {
      name: 'Contact',
      href: '#contact',
    },
  ],

  social: {
    github: 'https://github.com/fahkrieal',

    linkedin: 'https://www.linkedin.com/in/muhamad-fahkrie-al-mufid-883bbb257/',

    email: 'mailto:m.fahkri123@gmail.com',
  },

  copyright: '© 2026 Muhamad Fahkrie Al Mufid. All Rights Reserved.',

  builtWith: 'Crafted with Vue.js • Vite • Tailwind CSS',
}
</script>
