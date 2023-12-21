<script setup lang="ts">
import { toppleTheme, useTheme } from '@/utils/useTheme'
import type { ThemeType } from '@/utils/useTheme'
const { theme } = useTheme()
defineOptions({
  name: 'Settings'
})
const toppleColorTheme = (newTheme: ThemeType) => {
  toppleTheme(newTheme)
}
</script>

<template>
  <div class="settings">
    <div @click="toppleTheme('light')">切换白天</div>
    <div @click="toppleTheme('dark')">切换黑夜</div>
  </div>
</template>

<style lang="scss" scoped>
.settings {
  cursor: pointer;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
}
</style>
