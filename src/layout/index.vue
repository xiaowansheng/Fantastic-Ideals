<template>
  <div id="iframe" :style="cover">
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
import {computed} from "vue"
import Header from './header/index.vue'
import Mainer from './mainer/index.vue'
import Footer from './footer/index.vue'
import Settings from './settings/index.vue'
import BackgroundEffect from "@/components/background/index.vue"
import MouseEffect from "@/components/mouseEffect/index.vue"
import { ref } from "vue"
defineOptions({
  name: 'Layout'
})
const url=ref<string>("lanyangyang.jpg")
const cover = computed(() => {
  return `background-image: url('/cover/${url.value}')`
})
</script>

<style lang="scss" scoped>
#iframe {
  // max-width: 1920px;
  min-width: 320px;
  height: 100vh;
  margin: 0 auto;
    background-position-x: center;
  background-position-y: center;
  // background-image: url("https://wbxnl-blog.oss-cn-chengdu.aliyuncs.com/images/230841jwLrL.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
