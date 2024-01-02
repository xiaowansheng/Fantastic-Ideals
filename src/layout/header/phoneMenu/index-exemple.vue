<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import type { Menu } from '@/api/type'
defineOptions({
  name: 'PhoneMenu'
})
const menuItems = ref<Menu | any>([])


onMounted(() => {
  // load(fun)
})
</script>

<template>
  <div class="phone">
    
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: 576px) {
  .phone {
    display: none;
  }
}
@media screen and (max-width: 576px) {
}

</style>
