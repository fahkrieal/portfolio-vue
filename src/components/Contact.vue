<script setup>
import { ref } from 'vue'
import { Check, Copy, ArrowUpRight, Github, Linkedin, FileText } from 'lucide-vue-next'

const email = 'm.fahkri123@gmail.com'
const isCopied = ref(false)
let copyTimeout = null

const copyEmailToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(email)
    isCopied.value = true
    if (copyTimeout) clearTimeout(copyTimeout)
    copyTimeout = setTimeout(() => {
      isCopied.value = false
    }, 2800)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = email
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    isCopied.value = true
    if (copyTimeout) clearTimeout(copyTimeout)
    copyTimeout = setTimeout(() => {
      isCopied.value = false
    }, 2800)
  }
}

const contactChannels = [
  {
    label: 'GITHUB',
    value: 'github.com/fahkrieal',
    href: 'https://github.com/fahkrieal',
    icon: Github,
    cursor: 'CODE'
  },
  {
    label: 'LINKEDIN',
    value: 'Muhamad Fahkrie Al Mufid',
    href: 'https://www.linkedin.com/in/muhamad-fahkrie-al-mufid-883bbb257/',
    icon: Linkedin,
    cursor: 'LINK'
  },
  {
    label: 'CURRICULUM VITAE',
    value: 'Download Resume (PDF)',
    href: '/cv.pdf',
    icon: FileText,
    cursor: 'PDF'
  }
]
</script>

<template>
  <section id="contact" class="section-wrapper contact-section">
    <div class="site-container">
      <!-- Section Header -->
      <div class="section-header-editorial">
        <div class="section-kicker font-mono">
          <span class="section-kicker-dot"></span>
          <span>04 / CONTACT &amp; COLLABORATION</span>
        </div>
        <h2 class="section-title-huge font-display">
          LET'S BUILD<br />SOMETHING GREAT.
        </h2>
      </div>

      <!-- Contact Layout -->
      <div class="contact-grid">
        <!-- Left: Direct Email Box -->
        <div class="contact-left-col">
          <p class="contact-lead-text">
            Saya terbuka untuk peluang <strong>Internship</strong>, posisi <strong>Full-Stack Developer</strong>, proyek kolaborasi, maupun konsultasi seputar pengembangan aplikasi web modern.
          </p>

          <!-- Interactive Email Box -->
          <div class="email-box">
            <span class="email-tag font-mono">DIRECT INBOX</span>
            <div class="email-content-row">
              <a
                :href="`mailto:${email}`"
                class="email-link font-mono"
                data-cursor="EMAIL"
              >
                {{ email }}
              </a>

              <button
                class="copy-btn font-mono"
                :class="{ 'is-copied': isCopied }"
                data-cursor="COPY"
                @click="copyEmailToClipboard"
              >
                <template v-if="!isCopied">
                  <Copy :size="14" />
                  <span>COPY EMAIL</span>
                </template>
                <template v-else>
                  <Check :size="14" />
                  <span>COPIED ✓</span>
                </template>
              </button>
            </div>
          </div>

          <div class="location-status font-mono">
            <span class="location-dot"></span>
            <span>INDONESIA (WIB / GMT+7) // ACTIVE RESPONSE</span>
          </div>
        </div>

        <!-- Right: Channels List -->
        <div class="contact-right-col">
          <div class="channels-panel">
            <div class="panel-header-row font-mono">
              <span>VERIFIED CHANNELS</span>
              <span class="channels-count">03 PROFILES</span>
            </div>

            <div class="channels-list">
              <a
                v-for="channel in contactChannels"
                :key="channel.label"
                :href="channel.href"
                target="_blank"
                class="channel-row"
                :data-cursor="channel.cursor"
              >
                <div class="channel-main">
                  <component :is="channel.icon" :size="18" class="channel-icon" />
                  <div class="channel-text-block">
                    <span class="channel-name font-mono">{{ channel.label }}</span>
                    <span class="channel-detail">{{ channel.value }}</span>
                  </div>
                </div>

                <div class="channel-arrow">
                  <ArrowUpRight :size="16" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  background: transparent;
  padding-bottom: clamp(5rem, 10vw, 8.5rem);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(2.5rem, 5vw, 5rem);
  align-items: start;
}

/* Left Column */
.contact-left-col {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.contact-lead-text {
  font-size: clamp(1rem, 1.35vw, 1.2rem);
  line-height: 1.65;
  color: var(--text-secondary);
}

.contact-lead-text strong {
  color: var(--text-primary);
  font-weight: 600;
}

/* Email Box */
.email-box {
  background: #0a0d12;
  border: 1px solid var(--border-hairline);
  padding: 1.35rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: border-color var(--transition-fast);
}

.email-box:hover {
  border-color: rgba(229, 168, 91, 0.4);
}

.email-tag {
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

.email-content-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.875rem;
}

.email-link {
  font-size: clamp(0.9375rem, 1.4vw, 1.25rem);
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  transition: color var(--transition-fast);
}

.email-link:hover {
  color: var(--accent-amber);
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.875rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  border-radius: 2px;
  color: var(--text-primary);
  transition: background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--text-primary);
}

.copy-btn.is-copied {
  background: var(--accent-amber);
  color: var(--bg-primary);
  border-color: var(--accent-amber);
}

.location-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.location-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--accent-amber);
}

/* Right Column */
.channels-panel {
  background: #0a0d12;
  border: 1px solid var(--border-hairline);
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.panel-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.875rem;
  border-bottom: 1px solid var(--border-hairline);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.channels-count {
  color: var(--accent-amber);
}

.channels-list {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.channel-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-hairline);
  border-radius: 3px;
  transition: transform var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
}

.channel-row:hover {
  transform: translateX(4px);
  border-color: var(--border-focus);
  background: rgba(255, 255, 255, 0.04);
}

.channel-main {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.channel-icon {
  color: var(--text-secondary);
  transition: color var(--transition-fast);
}

.channel-row:hover .channel-icon {
  color: var(--accent-amber);
}

.channel-text-block {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.channel-name {
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.channel-detail {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.channel-arrow {
  color: var(--text-muted);
  transition: transform var(--transition-fast), color var(--transition-fast);
}

.channel-row:hover .channel-arrow {
  transform: translate(2px, -2px);
  color: var(--accent-amber);
}

/* Responsiveness */
@media (max-width: 992px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 480px) {
  .email-box {
    padding: 1rem;
  }
  .email-content-row {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
  .copy-btn {
    width: 100%;
    justify-content: center;
  }
  .email-link {
    word-break: break-all;
    font-size: 1.05rem;
  }
  .channels-panel {
    padding: 1.25rem 1rem;
  }
}
</style>
