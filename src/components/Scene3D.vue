<template>
  <div class="scene-ambient-lighting" aria-hidden="true"></div>
</template>

<style scoped>
.scene-ambient-lighting {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}
</style>
