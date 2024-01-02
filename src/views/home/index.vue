<script setup lang="ts">
import Cover from './cover/index.vue'
defineOptions({
  name: 'Home'
})
</script>

<template>
  <div class="home">
    <Cover/>
  </div>
</template>

<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
}
</style>
