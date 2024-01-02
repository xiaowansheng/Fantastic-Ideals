<template>
  <div id="iframe" :style="{ backgroundImage: 'url(' + cover + ')' }">
    <!-- <div id="iframe"> -->
    <!-- 内容 -->
    <Header></Header>
    <Mainer></Mainer>
    <Footer></Footer>
    <!-- 工具 -->
    <Settings />
    <!-- 背景效果 -->
    <BackgroundEffect />
    <!-- 鼠标特效 -->
    <MouseEffect />
  </div>
</template>
<script lang="ts" setup>
import Header from './header/index.vue'
import Mainer from './mainer/index.vue'
import Footer from './footer/index.vue'
import Settings from './settings/index.vue'
import BackgroundEffect from '@/components/background/index.vue'
import MouseEffect from '@/components/mouseEffect/index.vue'
import { computed } from 'vue'
import { useConfigStoreHook } from '@/stores/modules/config'
import type { ComputedRef } from 'vue'
import type { Website } from '@/api/type'
const configStore = useConfigStoreHook()
configStore.initI18n()
configStore.initMenu()
configStore.initWebsite()
configStore.initContacts()
configStore.initRecord()
defineOptions({
  name: 'Layout'
})

const website: ComputedRef<Website> = computed(() => useConfigStoreHook().website)
const cover = computed(() => {
  // console.log('website',website.value.randomCover)
  return website.value.cover ? website.value.cover : website.value.randomCover
})
</script>

<style lang="scss" scoped>
// html[data-theme='light'] #iframe {
//   &::before {
//     background: rgba(0, 0, 0, 0.22); /* 半透明黑色背景 */
//   }
// }
// html[data-theme='dark'] #iframe {
//   &::before {
//     background: rgba(0, 0, 0, 0.8); /* 半透明黑色背景 */
//   }
// }
#iframe {
  --app-width: 100%;
  --app-height: max(100vh, 0px);
  position: relative;
  // max-width: 1920px;
  width: var(--app-width);  
  min-height: var(--app-height);

  // position: fixed;
  // width: 100vw;
  // height: 100vh;
  // margin: 0 auto;
  // background-position-x: center;
  // background-position-y: center;
  // background-repeat: no-repeat;
  // background-size: cover;
  // z-index: 0;
  // background-image: url("http://img.xjh.me/random_img.php?");

  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   background: rgba(0, 0, 0, 0.22); /* 半透明黑色背景 */
  //   z-index: 0; /* 确保伪元素在背景图片之上 */
  // }
}
</style>
