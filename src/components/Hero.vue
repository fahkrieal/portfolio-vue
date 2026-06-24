<template>
  <section
    id="hero"
    class="min-h-screen flex items-center bg-gray-950 relative overflow-hidden pt-28 lg:pt-20"
  >
    <!-- Background Glow -->
    <div
      class="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"
    />

    <div
      class="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full"
    />

    <div
      class="max-w-6xl mx-auto px-6 w-full relative z-10"
    >
      <div
        class="grid lg:grid-cols-2 gap-16 items-center"
      >

        <!-- PHOTO -->
<div
  data-aos="fade-left"
  class="order-1 lg:order-2 flex justify-center lg:justify-end"
>
  <div class="hero-profile">

    <!-- Glow -->
    <div class="hero-profile-glow"></div>

    <!-- Ring -->
    <div class="hero-profile-ring"></div>

    <!-- Frame -->
    <div class="hero-profile-frame">

      <img
        src="/profile.jpg"
        alt="Muhamad Fahkrie Al Mufid"
        class="hero-profile-image"
      />

    </div>

    <!-- Status -->
    <div class="hero-profile-status">
      <span class="hero-status-dot"></span>
      Junior Developer
    </div>

  </div>
</div>

        <!-- TEXT -->
        <div
          data-aos="fade-right"
          class="order-2 lg:order-1 text-center lg:text-left"
        >

          <!-- Status -->
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-8"
          >
            <span
              class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
            ></span>

            Available for Internship & Opportunities
          </div>

          <!-- Name -->
          <h1
            class="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight"
          >
            Muhamad

            <span class="text-cyan-400">
              Fahkrie
            </span>

            <br />

            Al Mufid
          </h1>

          <!-- Role -->
          <h2
            class="mt-6 text-2xl md:text-3xl font-semibold text-gray-300"
          >
            Full Stack Developer
          </h2>

          <!-- Description -->
          <p
            class="mt-6 text-lg text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            Mahasiswa Informatika yang berfokus pada
            pengembangan aplikasi web modern menggunakan
            Laravel, Vue.js, MySQL, Tailwind CSS,
            dan REST API.
          </p>

          <!-- Tech Stack -->
          <div
            class="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start"
          >
            <span class="tech-tag">Laravel</span>
            <span class="tech-tag">Vue.js</span>
            <span class="tech-tag">MySQL</span>
            <span class="tech-tag">Tailwind CSS</span>
            <span class="tech-tag">REST API</span>
          </div>

          <!-- CV -->
          <div
            class="mt-10 flex justify-center lg:justify-start"
          >
            <a
              href="/cv.pdf"
              target="_blank"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-all duration-300 hover:-translate-y-1"
            >
              Download CV
            </a>
          </div>
          <br>

        </div>

      </div>
    </div>
  </section>
</template>