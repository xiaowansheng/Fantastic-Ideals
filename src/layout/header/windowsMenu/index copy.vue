<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import ThemeSwitch from '@/components/ui/switch/theme/index.vue'
import type { Menu } from '@/api/type'
import { useConfigStoreHook } from '@/stores/modules/config'
const configStore = useConfigStoreHook()
defineOptions({
  name: 'WindowsMenu'
})
const menuItems = ref<Menu[]>([])

watchEffect(() => {
  menuItems.value = configStore.menu
})
function onClickSubMenu(e: any, item: any) {
  e.preventDefault()
  const el = e.currentTarget

  if (el.classList.contains('show-submenu')) {
    hideSubMenu(el)
  } else {
    showSubMenu(el)
  }
}

function showSubMenu(el: any) {
  el.classList.add('show-submenu')
  document.addEventListener('click', function onDocClick(e) {
    e.preventDefault()
    if (el.contains(e.target)) {
      return
    }
    document.removeEventListener('click', onDocClick)
    hideSubMenu(el)
  })
}

function hideSubMenu(el: any) {
  el.classList.remove('show-submenu')
}
onMounted(() => {})
</script>

<template>
  <nav role="navigation" class="nav" v-show="menuItems && menuItems.length">
    <ul class="nav-items">
      <li class="logo nav-item">
        <a href="/"> <h1>WBXNL</h1></a>
      </li>
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        :class="['nav-item', { dropdown: item.submenu }]"
        @click="onClickSubMenu($event, item)"
      >
        <a href="#" class="nav-link">
          <span>{{ $t(item.label) }}</span>
        </a>
        <template v-if="item.submenu">
          <nav class="submenu">
            <ul class="submenu-items">
              <li v-for="(subItem, subIndex) in item.submenu" :key="subIndex" class="submenu-item">
                <template v-if="subItem.separator">
                  <hr class="submenu-separator" />
                </template>
                <template v-else>
                  <a href="#" class="submenu-link">{{ $t(subItem.label) }}</a>
                </template>
              </li>
            </ul>
          </nav>
        </template>
      </li>
      <li class="nav-item">
        <span class="nav-link menu-separator"> | </span>
      </li>
      <li class="nav-item" style="">
        <a href="#" class="nav-link">
          <ThemeSwitch />
        </a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">
          <span>Github</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped></style>

<style lang="scss" scoped>
@media screen and (max-width: 576px) {
  .nav {
    display: none;
  }
}
@media screen and (min-width: 576px) {
}
/* Page */

// *,
// *:before,
// *:after {
//   box-sizing: inherit;
// }

// body {
//   background-color: #3498db;
// }

$submenu-size: 1.45rem;

.nav {
  position: fixed;
  z-index: 99;
  width: 100%;
  left: 0;
  top: 0;
  // width: 550px;
  margin: 0rem auto;
  padding: 0.8rem 1.5rem;
  text-align: center;
  // font-family: Georgia, Arial, sans-serif;
  background-color: var(--transparent-color-background);
  .nav-items {
    position: relative;
    // padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    // overflow: hidden;// 会导致弹出框被隐藏
    .logo {
      position: relative;
      h1 {
        font-weight: bold;
        font-size: $submenu-size * 1.2;
        letter-spacing: 0.45rem;
      }
      // 白光划过效果（需要光束和背景颜色一样）
      // $width: 100%;
      // $height: 0.8rem;
      // &::before {
      //   content: '';
      //   position: absolute;
      //   width: $width;
      //   height: $height;
      //   left: calc(-1 * $width / 2);
      //   // left:-50%;
      //   top: 0;
      //   // background-color: rgb(255, 255, 255);
      //   background-image: linear-gradient(
      //     rgba(0, 0, 0, 0),
      //     rgba(255, 255, 255, 0.3),
      //     rgba(0, 0, 0, 0)
      //   );

      //   transform: rotate(-45deg);
      //   transform-origin: center; /* 设置旋转中心为坐标原点 (0,0) */
      //   animation: moveRight 3s ease infinite;
      // }
      // @keyframes moveRight {
      //   0% {
      //     left: calc(-1 * $width / 2);
      //   }
      //   100% {
      //     left: 75%;
      //   }
      // }
    }
    .nav-item {
      display: inline-block;
    }
    .nav-item:not(:last-of-type) {
      margin-right: 1.2rem;
    }
    .nav-item:last-child {
      margin-right: 0;
    }
  }
}

.nav-link,
.nav-link:link,
.nav-link:visited,
.nav-link:active,
.submenu-link,
.submenu-link:link,
.submenu-link:visited,
.submenu-link:active {
  display: block;
  position: relative;
  font-size: $submenu-size;
  letter-spacing: 1px;
  cursor: pointer;
  text-decoration: none;
  outline: none;
}

// .menu-link,
// .menu-link:link,
// .menu-link:visited,
// .menu-link:active{
//   cursor:auto;
// }

.nav-link {
  color: var(--color-heading);
}
.nav-link:link,
.nav-link:visited,
.nav-link:active {
  // color: #fff;
  font-weight: bold;
}
.nav-link {
  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 3px;
    background: rgba(0, 0, 0, 0.2);
    opacity: 0;
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }
  &:hover::before,
  &:hover::before {
    opacity: 1;
    -webkit-transform: translate(0, 5px);
    transform: translate(0, 5px);
  }
}

.dropdown {
  position: relative;
  .nav-link {
    padding-right: 1.2rem;
    height: 1.2rem;
    line-height: 1.2rem;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    top: 6px;
    right: 0;
    border: 5px solid transparent;
    border-top-color: var(--color-heading);
  }
}

$submenu-width: 12rem;
.submenu {
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: 99;
  min-width: $submenu-width;
  margin-left: calc(-1 * $submenu-width / 2);
  background-color: var(--color-background);
  // background: rgba(255, 255, , var(--submenu-background-opacity));;
  border-radius: 3px;
  line-height: 1.46667;
  margin-top: -5px;
  // box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);

  filter: drop-shadow(0 0 1rem rgba(0, 0, 0, 0.5));
  opacity: 0;
  -webkit-transform: translate(0, 0) scale(0.85);
  transform: translate(0, 0) scale(0.85);
  transition:
    transform 0.1s ease-out,
    opacity 0.1s ease-out;
  pointer-events: none;

  // &,
  // &::before,
  // &::after {
  //   border: 2px solid #ccc; /* 边框样式 */
  //   // box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3); /* 阴影样式，参数分别是水平偏移、垂直偏移、模糊半径、阴影颜色 */
  // }

  &::after,
  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -1rem;
    border: 1rem solid transparent;
    height: 0;
    border-bottom-color: var(--color-background);
    -webkit-filter: blur(1px);
    filter: blur(1px);
  }
  // &::after {
  // }
  // &::before {
  // }
}

.submenu-items {
  list-style: none;
  padding: 0.1rem 0;
  .submenu-item {
    display: block;
    text-align: left;
  }
  .submenu-link,
  .submenu-link:link,
  .submenu-link:visited,
  .submenu-link:active {
    color: #3498db;
    padding: 0.3rem 1.5rem;
  }

  .submenu-link:hover {
    background-color: rgba($color: #000000, $alpha: 0.2);
    text-decoration: underline;
  }

  .submenu-seperator {
    height: 0;
    margin: 12px 10px;
    border-top: 1px solid #eee;
  }
}

.show-submenu .submenu {
  opacity: 1;
  -webkit-transform: translate(0, 25px) scale(1);
  transform: translate(0, 25px) scale(1);
  pointer-events: auto;
}
</style>
