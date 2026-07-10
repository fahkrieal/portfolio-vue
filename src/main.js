import './assets/css/variables.css'
import './assets/css/reset.css'
import './assets/css/global.css'
import './assets/css/animation.css'

import './assets/css/hero.css'
import './assets/css/about.css'
import './assets/css/project.css'
import './assets/css/skills.css'
import './assets/css/contact.css'
import './assets/css/footer.css'
import './assets/css/navbar.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

app.use(router)

AOS.init({
  duration: 800,
  once: true,
})

app.mount('#app')