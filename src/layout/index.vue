<template>
  <div id="iframe">
    <!-- 内容 -->
    <Header></Header>
    <Mainer></Mainer>
    <Footer></Footer>
    <!-- 工具 -->
    <Settings />

    <!-- 背景效果 -->
    <BackgroundEffect/>
    <!-- 鼠标特效 -->
    <MouseEffect/>
  </div>
</template>
<script lang="ts" setup>
import Header from './header/index.vue'
import Mainer from './mainer/index.vue'
import Footer from './footer/index.vue'
import Settings from './settings/index.vue'
import BackgroundEffect from "@/components/background/index.vue"
import MouseEffect from "@/components/mouseEffect/index.vue"
defineOptions({
  name: 'Layout'
})
</script>

<style lang="scss" scoped>
#iframe {
  max-width: 1920px;
  min-width: 320px;
  margin: 0 auto;
}
</style>
