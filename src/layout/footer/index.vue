<script setup lang="ts">
import { ref } from 'vue'

import { useConfigStoreHook } from '@/stores/modules/config'
import { watchEffect } from 'vue';
import type { Record } from '@/api/type';
const configStore = useConfigStoreHook()
defineOptions({
  name: 'Footer'
})
const year=new Date().getFullYear()
const information = ref<Record|any>({})
watchEffect(() => {
  information.value=configStore.record
})
</script>

<template>
  <div class="footer">
    <!-- <p>© 2023-{{ year }} {{ company }}.</p> -->
        <p><span>©</span> {{information.beginYear}}-{{year}} By {{ information.author }}</p>
    <p>
      <a class="link" href="https://beian.miit.gov.cn/" target="_blank">{{
        information.recordNumber
      }}</a>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  position: absolute;
  background-color: rgba(var(--color-background),0.5);
  // background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
  bottom: 0px;
  // color: var();
  // font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
}
</style>
