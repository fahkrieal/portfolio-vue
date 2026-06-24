<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const isOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-gray-950/80 backdrop-blur-xl border-b border-gray-800'
        : 'bg-transparent'
    ]"
  >
    <div
      class="max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-300"
      :class="isScrolled ? 'h-16' : 'h-20'"
    >
      <!-- Logo -->
      <a
        href="#hero"
        class="group"
      >
        <h1
          class="text-2xl font-black tracking-tight"
        >
          <span class="text-white">
            Fahkrie
          </span>

          <span
            class="text-cyan-400 group-hover:text-cyan-300 transition"
          >
            .dev
          </span>
        </h1>
      </a>

      <!-- Desktop Menu -->
      <nav
        class="hidden lg:flex items-center gap-8"
      >
        <a
          href="#hero"
          class="nav-link"
        >
          Home
        </a>
        
        <a
          href="#about"
          class="nav-link"
        >
          About
        </a>

        <a
          href="#skills"
          class="nav-link"
        >
          Skills
        </a>

        <a
          href="#projects"
          class="nav-link"
        >
          Projects
        </a>

        <a
          href="#contact"
          class="nav-link"
        >
          Contact
        </a>
      </nav>

      <!-- Mobile Button -->
      <button
        @click="toggleMenu"
        class="lg:hidden text-white"
      >
        <Menu
          v-if="!isOpen"
          :size="28"
        />

        <X
          v-else
          :size="28"
        />
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isOpen"
        class="lg:hidden bg-gray-900 border-t border-gray-800"
      >
        <div
          class="px-6 py-6 flex flex-col gap-5"
        >
          <a
          href="#hero"
          class="nav-link"
        >
          Home
        </a>
        
        <a
          href="#about"
          class="nav-link"
        >
          About
        </a>

        <a
          href="#skills"
          class="nav-link"
        >
          Skills
        </a>

        <a
          href="#projects"
          class="nav-link"
        >
          Projects
        </a>

        <a
          href="#contact"
          class="nav-link"
        >
          Contact
        </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<style>
.nav-link {
  position: relative;
  color: rgb(156 163 175);
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: rgb(34 211 238);
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 0%;
  height: 2px;
  background: rgb(34 211 238);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.mobile-link {
  color: white;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.mobile-link:hover {
  color: rgb(34 211 238);
}
</style>