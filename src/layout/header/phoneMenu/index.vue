<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import ThemeSwitch from '@/components/ui/switch/theme/index.vue'
import type { Menu } from '@/api/type'
import { handleScrollbars } from '@/utils/pageUtils'
import { useConfigStoreHook } from '@/stores/modules/config'
const configStore = useConfigStoreHook()
defineOptions({
  name: 'PhoneMenu'
})
const menuItems = ref<Menu | any>([])
const openMenu = ref<boolean>(false)
watchEffect(() => {
  menuItems.value = configStore.menu
})

const navRef = ref<Element>()
const toppleMenu = (el: any) => {
  // const element: Element = el.currentTarget.parentElement.parentElement
  // element.classList.toggle('open')
  // console.log('menuItems=====', menuItems).
  // if (navRef.value!.classList.contains(className)) {
  //   handleScrollbars(true)
  // }
  // {
  //   handleScrollbars(false)
  // }
  openMenu.value = !openMenu.value
  if (openMenu.value) {
    handleScrollbars(true)
  }
  {
    handleScrollbars(false)
  }
}

const unfoldMenu = (el: any) => {
  // 找到当前元素的下一个元素
  const nextElement: Element = el.currentTarget!.nextElementSibling
  if (nextElement && nextElement.classList.contains('sub-menu')) {
    // 找到当前元素下的箭头元素
    el.currentTarget!.lastElementChild?.classList.toggle('icon-arrow-spin')
    nextElement.classList.toggle('show-submenu')
    // alert(1)
  }
  console.log(nextElement)
}
onMounted(() => {
  // load(fun)
})
</script>

<template>
  <div class="phone" ref="navRef">
    <div class="nav-header">
      <div class="nav-menu-btn" @click="toppleMenu">MENU</div>
      <a href="/"> <h1 class="logo">WBXNL</h1></a>
    </div>
    <div v-show="openMenu" class="nav-main">
      <div class="main-header">
        <div class="title">MENU</div>
        <div class="close-btn" @click="toppleMenu">Close</div>
      </div>
      <div class="menu">
        <div class="menu-items">
          <template v-for="(item, index) in menuItems">
            <a :href="item.url" target="_blank" class="nav-btn" @click="unfoldMenu">
              <span> {{ $t(item.label) }}</span>
              <span v-if="item.submenu" class="icon-arrow">></span>
            </a>
            <div v-if="item.submenu" class="menu-items sub-menu">
              <template v-for="subItem in item.submenu">
                <a :href="subItem.url" target="_blank" class="nav-btn">{{ $t(subItem.label) }}</a>
              </template>
            </div>
          </template>

          <div class="nav-btn submenu-separator"></div>

          <div class="nav-btn">
            <div class="theme">
              <ThemeSwitch />
            </div>
          </div>
          <!-- <a href="#"  target="_blank" class="nav-btn">GITHUB</a> -->
        </div>
      </div>
      <!-- <div class="bottom">
        <ThemeSwitch />
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: 1024px) {
  .phone {
    display: none;
  }
}
@media screen and (max-width: 1024px) {
}
.phone {
  position: fixed;
  z-index: 99;
  padding: 0.5rem 1.5rem;
  font-size: 1.4rem;
  top: 0;
  left: 0;
  width: 100%;
  // background-color: red;
  background-color: rgba($color: #000000, $alpha: 0.05);
  color: var(--color-heading);
}

.nav-menu-btn,
.nav-btn,
.close-btn {
  cursor: pointer;
}
.nav-header {
  // color: blue;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav-menu-btn {
    letter-spacing: 0.15rem;
    font-weight: bold;
  }
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 0.45rem;
  }
}

.nav-main {
  // display: none;
  position: fixed;
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  // background-color: var(--color-background);
  // 磨砂效果
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  z-index: 99;

  &,
  .nav-btn,
  a {
    color: var(--color-heading-2);
  }
  .main-header {
    font-size: 1.8rem;
    $offset: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem;
    .title {
      // position: absolute;
      font-weight: bold;
      letter-spacing: 0.1rem;
      // left: $offset;
      // top: $offset;
    }
    .close-btn {
      // position: absolute;
      // top: $offset;
      // right: $offset;
    }
  }
  .menu {
    // margin-top: 5rem;
    padding: 2rem;
    // margin: auto 0;
    // height: 20rem;
    flex: 1;
    overflow-y: auto; /* 当内容过多时显示滚动条 */

    // &::-webkit-scrollbar {
    //   width: 0.5rem;
    //   height: 0.5rem;
    //   // width: 0rem;
    //   // height: 0rem;
    // }
    // &::-webkit-scrollbar-track {
    //   background: #ffffff;
    //   border-radius: 0.5rem;
    // }
    // &::-webkit-scrollbar-thumb {
    //   // background: #9ecded;
    //   background-image: -webkit-linear-gradient(90deg, #70ea98, #58cbd6, #f16ae3);
    //   border-radius: 0.5rem;
    // }
    // &::-webkit-scrollbar-thumb:hover {}

    // &::-webkit-scrollbar-thumb:active {}

    // display: flex;
    .menu-items {
      height: 100%;
      text-align: center;
      font-size: 1.8rem;

      // width: fit-content;
      display: flex;
      flex-direction: column;
      padding: 0 2.5rem;

      // justify-content: center;
      // align-items: center;

      .nav-btn {
        width: 100%;
        position: relative;
        // margin: 0 auto;
        padding: 0.65rem 0;
        letter-spacing: 0.2rem;
        border-radius: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-arrow {
          // 绘制向上小箭头图标
          // position: absolute;
          // right: 0;
          // top: 50%;
          display: inline-block;
          margin-left: 0.5rem;
          // transform: translateY(-50%);
          // width: 2rem;
          // height: 2rem;
          font-size: 1.8rem;
          font-weight: bold;
          background-color: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          // background-image: url('@/assets/icon/arrow.svg');
          animation: spin-arrow-1 0.2s linear;
        }
        @keyframes spin-arrow-1 {
          0% {
            transform: rotate(90deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        .icon-arrow-spin {
          // 箭头旋转180度
          transform: rotate(90deg);
          animation: spin-arrow-2 0.2s linear;
        }
        @keyframes spin-arrow-2 {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(90deg);
          }
        }
      }
      // .nav-btn:not(:last-of-type) {
      //   // margin-bottom: 1rem;
      // }
      .nav-btn:hover {
        color: rgb(70, 103, 235);
        background-color: rgba($color: #000000, $alpha: 0.2);
      }
      .nav-btn:active {
        color: rgb(84, 105, 188);
        background-color: rgba($color: #000000, $alpha: 0.3);
      }

      .submenu-separator {
        margin: 0.5rem 0;
        padding: 0;
        &::before {
          position: absolute;
          width: 50%;
          left: 25%;
          top: 0;
          content: '';
          // width: 100px;
          height: 2px;
          background-color: var(--color-heading-2);
        }
      }

      .nav-btn {
        .theme {
          margin: 0 auto;
          width: fit-content;
          font-size: 2.2rem;
          // background-color: red;
        }
      }
    }
    .sub-menu {
      // height: 0;
      display: none;
      // overflow: hidden;
      // padding-left: 2rem;
      border-radius: 1.5rem;
      // background-color: rgba($color: #266b77, $alpha: 0.058);
      .nav-btn {
        // padding: 0;
        font-size: 1.5rem;
        overflow: hidden;
      }
    }
    .show-submenu {
      // height: fit-content;
      // overflow: auto;
      display: flex;
      height: fit-content;
    }
  }
  // .bottom {
  //   position: absolute;
  //   // text-align: right;
  //   right: 0;
  //   bottom: 0;
  //   font-size: 3rem;
  // }
}
// .open {
//   .nav-main {
//     display: block !important;
//   }
// }
</style>
