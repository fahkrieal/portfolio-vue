<template>
  <section id="contact" class="contact">
    <!-- ===================================== -->
    <!-- BACKGROUND -->
    <!-- ===================================== -->

    <div class="section-bg">
      <div class="section-grid"></div>

      <div class="section-light-left"></div>

      <div class="section-light-right"></div>

      <div class="section-center-glow"></div>

      <div class="section-noise"></div>
    </div>

    <!-- Section divider -->
    <div class="section-divider">
      <span class="section-divider-line"></span>
      <span class="section-divider-dot"></span>
      <span class="section-divider-line"></span>
    </div>

    <!-- ===================================== -->
    <!-- CONTAINER -->
    <!-- ===================================== -->

    <div class="contact-container">
      <!-- HEADER -->

      <div class="contact-header" data-aos="fade-up">
        <span class="contact-badge"> CONTACT </span>

        <h2 class="contact-title">Let's Build Something Great Together</h2>

        <p class="contact-description">
          Saya terbuka untuk peluang internship, freelance project, kolaborasi, maupun diskusi
          seputar pengembangan web modern.
        </p>
      </div>

      <!-- ===================================== -->
      <!-- MAIN -->
      <!-- ===================================== -->

      <div class="contact-layout" data-aos="fade-up" data-aos-delay="150">
        <!-- ================= LEFT ================= -->

        <div class="contact-info">
          <span class="contact-status"> ● Available for Internship </span>

          <h3 class="contact-heading">Get In Touch</h3>

          <p class="contact-text">
            Jika Anda memiliki project, peluang internship, freelance, maupun ingin berdiskusi
            mengenai pengembangan web, saya akan senang untuk terhubung.
          </p>

          <div class="contact-tags">
            <span class="contact-tag"> Internship </span>

            <span class="contact-tag"> Freelance </span>

            <span class="contact-tag"> Collaboration </span>
          </div>
        </div>

        <!-- ================= RIGHT ================= -->

        <div class="contact-card">
          <!-- EMAIL -->
          <a :href="`mailto:${contact.email}`" class="contact-item">
            <div class="contact-item-left">
              <Mail :size="20" />

              <div>
                <span class="contact-label"> Email </span>

                <strong>
                  {{ contact.email }}
                </strong>
              </div>
            </div>

            <ArrowUpRight :size="18" />
          </a>

          <!-- WHATSAPP -->

          <!-- <a
                    :href="contact.whatsapp"
                    target="_blank"
                    class="contact-item"
                >

                    <div class="contact-item-left">

                        <Phone :size="20" />

                        <div>

                            <span class="contact-label">

                                WhatsApp

                            </span>

                            <strong>

                                {{ contact.phone }}

                            </strong>

                        </div>

                    </div>

                    <ArrowUpRight :size="18" />

                </a> -->

          <!-- GITHUB -->

          <a :href="contact.github" target="_blank" class="contact-item">
            <div class="contact-item-left">
              <Github :size="20" />

              <div>
                <span class="contact-label"> GitHub </span>

                <strong> github.com/fahkrieal </strong>
              </div>
            </div>

            <ArrowUpRight :size="18" />
          </a>

          <!-- LINKEDIN -->

          <a :href="contact.linkedin" target="_blank" class="contact-item">
            <div class="contact-item-left">
              <Linkedin :size="20" />

              <div>
                <span class="contact-label"> LinkedIn </span>

                <strong> View Profile </strong>
              </div>
            </div>

            <ArrowUpRight :size="18" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { Mail, Phone, Github, Linkedin, ArrowUpRight } from 'lucide-vue-next'

/* ==========================================================
   CONTACT INFO
========================================================== */

const contact = {
  email: 'm.fahkri123@gmail.com',

  phone: '+62 822-1149-5926',

  whatsapp: 'https://wa.me/6282211495926',

  github: 'https://github.com/fahkrieal',

  linkedin: 'https://www.linkedin.com/in/muhamad-fahkrie-al-mufid-883bbb257/',
}
</script>
