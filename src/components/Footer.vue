<script setup>
import {
  Github,
  Linkedin,
  Mail,
} from 'lucide-vue-next'
</script>

<template>
  <footer
    class="bg-gray-950 border-t border-gray-800 relative overflow-hidden"
  >
    <!-- Glow -->
    <div
      class="absolute right-0 bottom-0 w-72 h-72 bg-cyan-500/5 blur-3xl rounded-full"
    />

    <div
      class="max-w-6xl mx-auto px-6 py-16 relative z-10"
    >
      <div
        class="grid md:grid-cols-3 gap-10"
      >
        <!-- Brand -->
        <div>
          <h3
            class="text-2xl font-black text-white"
          >
            Fahkrie
            <span class="text-cyan-400">
              .dev
            </span>
          </h3>

          <p
            class="text-gray-400 mt-4 leading-relaxed"
          >
            Full Stack Developer focused on
            building modern web applications
            using Laravel, Vue.js, MySQL,
            and Tailwind CSS.
          </p>
        </div>

        <!-- Navigation -->
        <div>
          <h4
            class="text-white font-semibold mb-4"
          >
            Navigation
          </h4>

          <div
            class="flex flex-col gap-3"
          >
            <a
              href="#about"
              class="footer-link"
            >
              About
            </a>

            <a
              href="#skills"
              class="footer-link"
            >
              Skills
            </a>

            <a
              href="#projects"
              class="footer-link"
            >
              Projects
            </a>

            <a
              href="#contact"
              class="footer-link"
            >
              Contact
            </a>
          </div>
        </div>

        <!-- Social -->
        <div>
          <h4
            class="text-white font-semibold mb-4"
          >
            Connect
          </h4>

          <div
            class="flex gap-4"
          >
            <!-- GitHub -->
            <a
              href="https://github.com/fahkrieal"
              target="_blank"
              class="social-icon"
            >
              <Github :size="20" />
            </a>

            <!-- LinkedIn -->
            <a
              href="https://www.linkedin.com/in/muhamad-fahkrie-al-mufid-883bbb257/"
              target="_blank"
              class="social-icon"
            >
              <Linkedin :size="20" />
            </a>

            <!-- Email -->
            <a
              href="mailto:m.fahkri123@gmail.com"
              class="social-icon"
            >
              <Mail :size="20" />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div
        class="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p
          class="text-gray-500 text-sm"
        >
          © 2026 Muhamad Fahkrie Al Mufid.
          All rights reserved.
        </p>

        <p
          class="text-gray-500 text-sm"
        >
          Built with Vue.js & Tailwind CSS
        </p>
      </div>
    </div>
  </footer>
</template>