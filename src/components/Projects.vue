<script setup>
const projects = [
  {
    title: 'Sistem Prediksi Servis Motor',
    role: 'Academic Project',
    image: '/projects/mmssport.png',
    description:
      'Aplikasi prediksi jadwal servis kendaraan berbasis web dengan dashboard monitoring, riwayat servis, dan manajemen kendaraan.',
    tech: ['Laravel', 'Vue.js', 'MySQL', 'REST API'],
    github: '#',
  },

  {
    title: 'ProFileX',
    role: 'Academic Project',
    image: '/projects/profilex.png',
    description:
      'Platform SaaS modern untuk pembuatan company profile dengan autentikasi, subscription, dashboard admin, dan REST API.',
    tech: ['Laravel', 'Vue.js', 'Sanctum', 'TailAdmin'],
    github: '#',
  },

  {
    title: 'CoffeeFinder',
    role: 'Academic Project',
    image: '/projects/coffeefinder.png',
    description:
      'Sistem informasi geografis untuk menemukan coffee shop berbasis lokasi dengan peta interaktif dan fitur pencarian.',
    tech: ['Vue.js', 'Leaflet', 'OpenStreetMap', 'Laravel'],
    github: '#',
  },
]
</script>

<template>
  <section
    id="projects"
    class="py-32 bg-gray-950 relative overflow-hidden"
>
  <div
  class="absolute top-0 left-1/2 -translate-x-1/2 flex items-center"
>
  <div class="w-250 h-px bg-gradient-to-r from-transparent to-cyan-400/60"></div>

  <div
    class="w-2 h-2 rounded-full bg-cyan-400 mx-3
          shadow-[0_0_12px_rgba(34,211,238,0.8)]">
  </div>

  <div class="w-250 h-px bg-gradient-to-l from-transparent to-cyan-400/60"></div>
</div>

    <div class="max-w-6xl mx-auto px-6">

      <!-- Header -->
      <div
        class="text-center mb-24"
        data-aos="fade-up"
      >
        <span
          class="text-cyan-400 uppercase tracking-[0.3em] font-semibold"
        >
          Featured Projects
        </span>

        <h2
          class="text-4xl md:text-5xl font-black text-white mt-4"
        >
          Selected Work
        </h2>

        <p
          class="text-gray-400 mt-5 max-w-2xl mx-auto"
        >
          Beberapa project yang menunjukkan kemampuan saya dalam
          membangun aplikasi modern menggunakan Laravel, Vue.js,
          MySQL, dan teknologi web lainnya.
        </p>
      </div>

      <!-- Projects -->
      <div
        v-for="(project,index) in projects"
        :key="project.title"
        class="project-item"
        data-aos="fade-up"
        :data-aos-delay="index * 150"
      >
        <div
          class="grid lg:grid-cols-2 gap-16 items-center"
        >

          <!-- IMAGE -->
          <div
            :class="{
              'lg:order-2': index % 2
            }"
          >
            <div class="project-image-wrapper">

              <img
                :src="project.image"
                :alt="project.title"
                class="project-image"
              />

            </div>
          </div>

          <!-- CONTENT -->
          <div
            :class="{
              'lg:order-1': index % 2
            }"
          >
            <div class="project-line"></div>

            <p
              class="text-cyan-400 font-semibold uppercase tracking-wider mb-3"
            >
              {{ project.role }}
            </p>

            <h3
              class="project-title"
            >
              {{ project.title }}
            </h3>

            <p
              class="text-gray-400 mt-6 leading-relaxed"
            >
              {{ project.description }}
            </p>

            <!-- TECH -->
            <div
              class="flex flex-wrap gap-3 mt-8"
            >
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="project-tech"
              >
                {{ tech }}
              </span>
            </div>

            

          </div>

        </div>
      </div>

    </div>
  </section>
</template>