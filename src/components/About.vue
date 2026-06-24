<template>
  <section
  id="about"
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

    <!-- Background -->
    <div
      class="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full"
    />

    <div
      class="max-w-6xl mx-auto px-6 relative z-10"
    >
      <div
        class="grid lg:grid-cols-2 gap-20 items-center"
      >
        <!-- LEFT -->
        <div data-aos="fade-right">

          <span
            class="text-cyan-400 uppercase tracking-[0.3em] font-semibold "
          >
            About Me
          </span>

          <h2
            class="mt-6 text-4xl md:text-5xl font-black text-white leading-tight"
          >
            Creating modern web applications
            that solve real-world problems.
          </h2>

          <p
            class="mt-8 text-gray-400 text-lg leading-relaxed"
          >
            Saya adalah mahasiswa Teknik Informatika yang berfokus
            pada pengembangan aplikasi web modern menggunakan
            Laravel, Vue.js, MySQL, Tailwind CSS, dan REST API.
          </p>

          <p
            class="mt-5 text-gray-400 text-lg leading-relaxed"
          >
            Saya memiliki ketertarikan pada pengembangan
            dashboard, platform SaaS, sistem informasi,
            serta aplikasi berbasis geolokasi yang
            mengutamakan performa, skalabilitas,
            dan pengalaman pengguna yang baik.
          </p>

          <p
            class="mt-5 text-gray-400 text-lg leading-relaxed"
          >
            Saat ini saya terus mengembangkan kemampuan sebagai
            Full Stack Developer melalui berbagai project nyata
            yang saya bangun secara mandiri maupun akademik.
          </p>

        </div>

        <!-- RIGHT -->
        <div
          data-aos="fade-left"
          class="grid sm:grid-cols-2 gap-5"
        >

          <div class="about-card">
            <span class="about-number">
              03
            </span>

            <h3 class="about-title">
              Featured Projects
            </h3>

            <p class="about-text">
              Sistem Prediksi Servis Motor,
              ProFileX, dan CoffeeFinder.
            </p>
          </div>

          <div class="about-card">
            <span class="about-number">
              06
            </span>

            <h3 class="about-title">
              Semester
            </h3>

            <p class="about-text">
              Informatics Student at
              Institut Teknologi Indonesia.
            </p>
          </div>

          <div class="about-card">
            <span class="about-number">
              05+
            </span>

            <h3 class="about-title">
              Core Technologies
            </h3>

            <p class="about-text">
              Laravel, Vue.js, MySQL,
              Tailwind CSS, REST API.
            </p>
          </div>

          <div class="about-card">
            <span class="about-number">
              ∞
            </span>

            <h3 class="about-title">
              Continuous Learning
            </h3>

            <p class="about-text">
              Always exploring new tools,
              frameworks, and technologies.
            </p>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
