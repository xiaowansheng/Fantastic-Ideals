<script setup lang="ts">
import WindowsMenu from './windowsMenu/index.vue'
import PhoneMenu from './phoneMenu/index.vue'
defineOptions({
  name: 'Header'
})

</script>

<template>
  <div class="header">
    <WindowsMenu />
    <PhoneMenu />
  </div>
</template>

<style lang="scss" scoped>
</style>
