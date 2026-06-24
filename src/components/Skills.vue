<script setup>
import {
  Monitor,
  Server,
  Database,
  Wrench,
} from 'lucide-vue-next'

const skills = [
  {
    title: 'Frontend Engineering',
    icon: Monitor,
    description:
      'Building responsive and modern user interfaces.',

    items: [
      'Vue.js',
      'JavaScript',
      'Tailwind CSS',
      'HTML5',
      'CSS3',
    ],
  },

  {
    title: 'Backend Engineering',
    icon: Server,
    description:
      'Developing scalable APIs and web applications.',

    items: [
      'Laravel',
      'PHP',
      'REST API',
      'Sanctum',
    ],
  },

  {
    title: 'Database & API',
    icon: Database,
    description:
      'Managing data structures and backend integration.',

    items: [
      'MySQL',
      'Database Design',
      'API Integration',
    ],
  },

  {
    title: 'Development Workflow',
    icon: Wrench,
    description:
      'Tools used for collaboration and deployment.',

    items: [
      'Git',
      'GitHub',
      'Postman',
      'Figma',
      'TailAdmin',
    ],
  },
]
</script>

<template>
  <section
    id="skills"
    class="py-32 bg-gray-950 relative overflow-hidden"
  >

    <div
  class="absolute top-0 left-1/2 -translate-x-1/2 flex items-center"
>
  <div class="w-200 h-px bg-gradient-to-r from-transparent to-cyan-400/60"></div>

  <div
    class="w-2 h-2 rounded-full bg-cyan-400 mx-3
          shadow-[0_0_12px_rgba(34,211,238,0.8)]">
  </div>

  <div class="w-200 h-px bg-gradient-to-l from-transparent to-cyan-400/60"></div>
</div>

    <div
      class="absolute left-0 top-20 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full"
    />

    <div
      class="max-w-6xl mx-auto px-6 relative z-10"
    >
      <!-- Header -->
      <div
        class="text-center mb-24"
        data-aos="fade-up"
      >
        <span
          class="text-cyan-400 uppercase tracking-[0.3em] font-semibold"
        >
          Skills
        </span>

        <h2
          class="text-4xl md:text-5xl font-black text-white mt-4"
        >
          Technologies & Expertise
        </h2>

        <p
          class="text-gray-400 mt-5 max-w-2xl mx-auto"
        >
          Tools, technologies, and frameworks I use to
          design, develop, and deploy modern web applications.
        </p>
      </div>

      <!-- Cards -->
      <div
        class="grid md:grid-cols-2 gap-6"
      >
        <div
          v-for="(skill, index) in skills"
          :key="skill.title"
          class="skill-card"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div
            class="flex items-center gap-4 mb-5"
          >
            <component
              :is="skill.icon"
              :size="30"
              class="text-cyan-400"
            />

            <h3
              class="text-xl font-bold text-white"
            >
              {{ skill.title }}
            </h3>
          </div>

          <p
            class="text-gray-400 mb-6"
          >
            {{ skill.description }}
          </p>

          <div
            class="flex flex-wrap gap-3"
          >
            <span
              v-for="item in skill.items"
              :key="item"
              class="skill-badge"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>