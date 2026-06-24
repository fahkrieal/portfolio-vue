<script setup>
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  ArrowUpRight,
} from 'lucide-vue-next'
</script>

<template>
  <section
    id="contact"
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

    <div
      class="absolute left-0 bottom-0 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full"
    />

    <div
      class="max-w-6xl mx-auto px-6 relative z-10"
    >
      <!-- Header -->
      <div
        class="text-center mb-20"
        data-aos="fade-up"
      >
        <span
          class="text-cyan-400 uppercase tracking-[0.3em] font-semibold"
        >
          Contact
        </span>

        <h2
          class="text-4xl md:text-5xl font-black text-white mt-4"
        >
          Let's Build Something Great Together
        </h2>

        <p
          class="text-gray-400 mt-5 max-w-2xl mx-auto"
        >
          Saya terbuka untuk peluang internship,
          freelance project, kolaborasi, maupun
          diskusi seputar pengembangan web dan teknologi.
        </p>
      </div>

      <!-- Main Card -->
      <div
        class="contact-premium"
        data-aos="fade-up"
      >
        <!-- LEFT -->
        <div>

          <h3
            class="text-3xl font-black text-white"
          >
            Get In Touch
          </h3>

          <p
            class="text-gray-400 mt-6 leading-relaxed"
          >
            Jika Anda memiliki peluang magang,
            project menarik, atau ingin berdiskusi
            mengenai teknologi dan pengembangan web,
            saya akan senang untuk terhubung.
          </p>

          <div
            class="flex flex-wrap gap-3 mt-8"
          >
            <span class="contact-tag">
              Internship
            </span>

            <span class="contact-tag">
              Freelance
            </span>

            <span class="contact-tag">
              Collaboration
            </span>
          </div>

        </div>

        <!-- RIGHT -->
        <div
          class="space-y-4"
        >
          <a
            href="mailto:m.fahkri123@gmail.com"
            class="contact-link"
          >
            <div class="contact-left">
              <Mail
                :size="20"
                class="text-cyan-400"
              />

              <div>
                <p class="contact-label">
                  Email
                </p>

                <p class="contact-value">
                  m.fahkri123@gmail.com
                </p>
              </div>
            </div>

            <ArrowUpRight :size="18" />
          </a>

          <a
            href="https://wa.me/6282211495926"
            target="_blank"
            class="contact-link"
          >
            <div class="contact-left">
              <Phone
                :size="20"
                class="text-cyan-400"
              />

              <div>
                <p class="contact-label">
                  WhatsApp
                </p>

                <p class="contact-value">
                  082211495926
                </p>
              </div>
            </div>

            <ArrowUpRight :size="18" />
          </a>

          <a
            href="https://github.com/fahkrieal"
            target="_blank"
            class="contact-link"
          >
            <div class="contact-left">
              <Github
                :size="20"
                class="text-cyan-400"
              />

              <div>
                <p class="contact-label">
                  GitHub
                </p>

                <p class="contact-value">
                  github.com/fahkrieal
                </p>
              </div>
            </div>

            <ArrowUpRight :size="18" />
          </a>

          <a
            href="https://www.linkedin.com/in/muhamad-fahkrie-al-mufid-883bbb257/"
            target="_blank"
            class="contact-link"
          >
            <div class="contact-left">
              <Linkedin
                :size="20"
                class="text-cyan-400"
              />

              <div>
                <p class="contact-label">
                  LinkedIn
                </p>

                <p class="contact-value">
                  View Profile
                </p>
              </div>
            </div>

            <ArrowUpRight :size="18" />
          </a>

        </div>
      </div>
    </div>
  </section>
</template>