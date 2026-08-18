<script setup>
import { ref } from 'vue'
import WelcomeIntro from '@/components/WelcomeIntro.vue'

const showIntro = ref(true)

const onIntroFinished = () => {
  showIntro.value = false
}
</script>

<template>
  <WelcomeIntro v-if="showIntro" @finish="onIntroFinished" />
  <RouterView />
</template>