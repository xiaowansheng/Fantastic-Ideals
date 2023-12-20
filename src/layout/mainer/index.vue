<script setup lang='ts'>
defineOptions({
  name: 'Mainer'
})
</script>

<template>
  <div id="content">
    <main>
      <router-view :key="$route.fullPath" v-slot="{ Component, route }">
        <keep-alive v-if="route.meta.keepAlive">
          <component :is="Component" />
        </keep-alive>
        <component v-else :is="Component" />
      </router-view>
    </main>
  </div>
</template>

<style lang='scss' scoped>

</style>
