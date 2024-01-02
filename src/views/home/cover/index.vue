<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { onBeforeMount, onUnmounted } from 'vue'
import type { Website, Contacts } from '@/api/type'
import { getSentence } from '@/api/config'
import { useConfigStoreHook } from '@/stores/modules/config'
import type { ComputedRef } from 'vue'
const website: ComputedRef<Website> = computed(() => useConfigStoreHook().website)
const contacts: ComputedRef<Contacts> = computed(() => useConfigStoreHook().contacts)
type Sentence = {
  hitokoto: string
  from: string
}
defineOptions({
  name: 'Cover'
})
const cover = computed(() => {
  // console.log('website',website.value.randomCover)
  return website.value.cover ? website.value.cover : website.value.randomCover
})
let saveSentence = ''
const sentenceContent = ref<string>('')
watch(website, () => {
  if (website.value.signal) {
    saveSentence = website.value.signal
    startInterval()
  }
})
let intervalId: number | null = null
/**
 * 每个字出来的时间
 */
const speed: number = 160
/**
 * 全部字显示以后，打印停顿的时间
 */
const pauseTime = 2000
/**
 * 实现打印机效果
 */
const startInterval = () => {
  // 清除之前的定时器
  if (intervalId) {
    clearInterval(intervalId)
  }
  sentenceContent.value = ''
  let index = 0
  let pause = false
  intervalId = setInterval(() => {
    if (index < saveSentence.length) {
      sentenceContent.value += saveSentence[index]
      index++
    } else {
      if (!pause) {
        pause = true
        setTimeout(() => {
          sentenceContent.value = ''
          index = 0
          pause = false
        }, pauseTime)
      }
    }
  }, speed)
}

// const cover = 'background-image: url(https://cdn.seovx.com/d/?mom=302&' + 123 + ')'
const getData = () => {
  getSentence().then((data: Sentence) => {
    // console.log(data);
    sentence.value = data
    if (!website.value.signal) {
      saveSentence = sentence.value.hitokoto
      startInterval()
    }
  })
}
const sentence = ref<Sentence | any>({
  hitokoto: '',
  from: ''
})
const iconStyle = 'width:2.8rem;height:2.8rem'
onBeforeMount(() => {
  getData()
})

onUnmounted(() => {
  // 清除定时器
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <!-- 自定义的封面存在，就用自定义的，不存在就用网络随机的 -->
  <div class="cover" :style="{ backgroundImage: 'url(' + cover + ')' }">
    <div class="content">
      <div class="container">
        <h1>{{ website.homeTitle }}</h1>
        <!-- <p class="welcome">欢迎来到汍笙的博客空间~</p> -->
        <div class="society">
          <!-- qq跳转指定qq的链接 -->
          
          <a
            target="_blank"
            v-if="contacts.qq?.show"
            :href="`https://wpa.qq.com/msgrd?v=3&uin=${contacts.qq.content}&site=qq&menu=yes&jumpflag=1`"
            class="item"
          >
            <svg-icon name="qq" :iconStyle="iconStyle"></svg-icon>
            <!-- <img src="@/assets/icon/society/QQ.svg" width="2rem" height="" alt="QQ" srcset=""> -->
          </a>
          <!-- <a class="item">
          <svg-icon name="wechat" :iconStyle="iconStyle"></svg-icon>
        </a> -->
          <a
            target="_blank"
            v-if="contacts.weibo?.show"
            :href="`https://weibo.com/${contacts.weibo.content}`"
            class="item"
          >
            <svg-icon name="weibo" :iconStyle="iconStyle"></svg-icon>
          </a>
          <!-- <a class="item">
          <svg-icon name="redbook" :iconStyle="iconStyle"></svg-icon>
        </a> -->
          <a
            target="_blank"
            v-if="contacts.email?.show"
            :href="`mailto:${contacts.email.content}`"
            class="item"
          >
            <svg-icon name="mail" :iconStyle="iconStyle"></svg-icon>
          </a>
          <a
            target="_blank"
            v-if="contacts.twitter?.show"
            :href="`https://twitter.com/${contacts.twitter.content}`"
            class="item"
          >
            <svg-icon name="twitter" :iconStyle="iconStyle"></svg-icon>
          </a>
          <a
            target="_blank"
            v-if="contacts.facebook?.show"
            :href="`http://facebook.com/${contacts.facebook.content}`"
            class="item"
          >
            <svg-icon name="facebook" :iconStyle="iconStyle"></svg-icon>
          </a>
          <a
            target="_blank"
            v-if="contacts.telegram?.show"
            :href="`https://t.me/${contacts.telegram.content}`"
            class="item"
          >
            <svg-icon name="telegram" :iconStyle="iconStyle"></svg-icon>
          </a>
          <a
            target="_blank"
            v-if="contacts.instagram?.show"
            :href="`https:/instagram.com/${contacts.instagram.content}`"
            class="item"
          >
            <svg-icon name="instagram" :iconStyle="iconStyle"></svg-icon>
          </a>
          <!-- <a class="item">
          <svg-icon name="google" :iconStyle="iconStyle"></svg-icon>
        </a> -->
          <a
            target="_blank"
            v-if="contacts.github?.show"
            :href="`https://github.com/${contacts.github.content}`"
            class="item"
          >
            <svg-icon name="github" :iconStyle="iconStyle"></svg-icon>
          </a>
          <a
            target="_blank"
            v-if="contacts.gitee?.show"
            :href="`https://gitee.com/${contacts.gitee.content}`"
            class="item"
          >
            <svg-icon name="gitee" :iconStyle="iconStyle"></svg-icon>
          </a>
          <!-- <div class="item">
          <i class="iconfont icon-gitee"></i>
        </div> -->
        </div>
        <div>
          <!-- 自己签名存在，用自己签名，不存在就用api提供的 -->
          <!-- <div v-if="website.signal" class="sentence">
            {{ website.signal }}
          </div> -->
          <div>
            <p class="sentence">
              {{ sentenceContent }}
              <span class="cursor"></span>
            </p>
            <p v-show="sentence.from != null" class="sentence-from">
              <span class="occupy-space">{{ sentence.hitokoto }}</span
              ><span class="from"> {{ '—' + sentence.from }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
html[data-theme='light'] .cover {
  &::before {
    background: rgba(0, 0, 0, 0.22); /* 半透明黑色背景 */
  }
}
html[data-theme='dark'] .cover {
  &::before {
    background: rgba(0, 0, 0, 0.8); /* 半透明黑色背景 */
  }
}
.cover {
  // position: fixed;
  width: var(--app-width);
  height: var(--app-height);
  // margin: 0 auto;
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  // background-image: url("http://img.xjh.me/random_img.php?");

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.22); /* 半透明黑色背景 */
    z-index: 0; /* 确保伪元素在背景图片之上 */
  }

  .content {
    position: absolute;
    text-align: center;
    // background-color: aquamarine;
    top: 28%;
    left: 0;
    right: 0;
    z-index: 10;

    h1 {
      color: var(--color-title);
      letter-spacing: 0.25rem;
      font-size: 3rem;
      margin: 1rem 2rem;
      // font-family:
      //   Arial,
      //   Microsoft YaHei,
      //   '黑体',
      //   '宋体',
      //   sans-serif,
      //   'Lucida Sans Unicode',
      //   'Lucida Grande',
      //   sans-serif;
    }
    .society {
      margin: 2rem 0;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;

      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0.5rem 0.5rem;
        cursor: pointer;
      }
    }

    .from {
      font-size: 1.5rem;
      line-height: 200%;
    }
    .sentence,
    .occupy-space {
      font-size: 1.9rem;
    }
    .occupy-space {
      color: rgba(255, 255, 255, 0);
    }
    // width: fit-content;
    .container {
      // background-color: red;
      width: fit-content;
      margin: 0 auto;
      padding: 1rem;
    }
    .cursor {
      border-right: 2px solid #333; /* 用于模拟光标 */
      animation: blink-caret 0.5s step-end infinite;
    }

    @keyframes blink-caret {
      from,
      to {
        border-color: transparent;
      }
      50% {
        border-color: #333;
      }
    }
    // .sentence {
    //   // width: 100px;
    //   margin: 0 auto;
    //   // font-family: 'Arial', sans-serif;
    //   // font-size: 24px;
    //   text-align: center;
    //   border-right: 2px solid #333; /* 用于模拟光标 */
    //   // white-space: nowrap; /* 防止文字换行 */
    //   overflow: hidden; /* 隐藏溢出部分文字 */
    //   animation:
    //     typing 3s steps(30) infinite,
    //     blink-caret 0.5s step-end infinite;
    // }
    // @keyframes typing {
    //   from {
    //     width: 0;
    //   }
    //   to {
    //     // width: 100%;
    //   }
    // }
  }
}
</style>
