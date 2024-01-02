<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import type { Menu } from '@/api/type'
defineOptions({
  name: 'PhoneMenu'
})
const menuItems = ref<Menu | any>([])

// watchEffect(() => {
//   menuItems.value=props.data
// })
// const load = (cb: Function) => {
//   // browser event has already occurred.
//   if (document.readyState === 'complete') {
//     return setTimeout(cb)
//   }

//   // Mozilla, Opera and webkit style
//   if (window.addEventListener) {
//     return window.addEventListener('load', cb, false)
//   }

//   // If IE event model is used
//   if (window.attachEvent) {
//     return window.attachEvent('onload', cb)
//   }
// }
const onClick = (el) => {
  console.log('el', el)

  let nav = el.currentTarget?.parentElement.parentElement
  let _class = 'open'

  nav.classList.contains(_class) ? nav.classList.remove(_class) : nav.classList.add(_class)
}
onMounted(() => {
  // load(fun)
})
</script>

<template>
  <div class="phone">
    <div class="nav">
      <div class="nav-bar">
        <div class="logo"></div>
        <div class="nav-btn" @click="onClick($event)">
          <div class="btn-bar menu"></div>
          <div class="btn-bar menu"></div>
          <div class="btn-bar menu"></div>
          <div class="btn-bar close"></div>
          <div class="btn-bar close"></div>
        </div>
      </div>
      <div class="nav-content">
        <div class="background">
          <div class="portion"></div>
          <div class="portion"></div>
          <div class="portion"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: 576px) {
}
@media screen and (max-width: 576px) {
  .phone {
    display: none;
  }
}
.phone {
  background: linear-gradient(195deg, #ae6be0, #ddd);
}
// root settings / variables
$app-hide-overflow: true; // set to false to see everything that's going on

// body,
// html {
//   margin:  0;
//   padding: 0;
//   width:  100%;
//   height: 100%;
// }

// body {
//   font-family:     sans-serif;
//   display:         flex;
//   flex-flow:       row wrap;
//   align-items:     center;
//   justify-content: space-around;

//   font-size: 12px;
//   background: linear-gradient(195deg, #ae6be0, #ddd);
// }

$app-width: 100vw;
$app-height: 100vh;
.phone {
  // // $app-height: calc($app-width / $app-aspect);
  // $app-border-width-v: calc($app-height / 6);
  // $app-border-width-h: calc($app-width / 11);
  // $app-border-width: $app-border-width-v $app-border-width-h;

  position: relative;
  // // background: #fff;
  flex: 0 0 auto;
  // width: $app-width;
  // height: $app-height;
  // max-height: 100vh;
  // padding: 5px;

  @if $app-hide-overflow {
    overflow: hidden;
  }
}

.nav {
  $btn-bar-width: 1.34em;
  $btn-bar-height: 3px;
  $btn-bar-spacing: 3px;

  .nav-bar {
    display: flex;
    flex-flow: row;
    position: relative;
    z-index: 3;
    .logo {
      // padding: 2rem;
      flex: 1 1 100%;
    }

    .nav-btn {
      display: flex;
      flex-flow: column;
      align-items: center;
      position: relative;
      cursor: pointer;

      flex: 0;
      padding: 15px;
    }

    .nav-btn .btn-bar {
      position: relative;

      width: $btn-bar-width;
      height: $btn-bar-height;
      border-radius: 5px;
      background: #444;

      &.menu:not(:first-child) {
        margin-top: $btn-bar-spacing;
      }

      &.close {
        transform-origin: center center;
        position: absolute;

        margin-top: calc(-1 * $btn-bar-height / 2);
        opacity: 0;
        top: 50%;
      }
    }
  }

  .nav-content {
    // display: none;
    position: fixed;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    // z-index: 100;

    .background {
      position: absolute;
      display: flex;
      flex-flow: column;
      align-items: stretch;

      top: 0;
      left: 0;
      right: 0;
      bottom: -2px;
      // z-index: 1000;
    }

    .portion {
      background: #c796ec;

      &:not(:first-child) {
        margin-top: -1px;
      }
    }
  }

  &.open {
    // .nav-content {
    //   display: block;
    // }

    .nav-bar .nav-btn .btn-bar.menu {
      opacity: 0;
    }
    .nav-bar .nav-btn .btn-bar.close {
      opacity: 1;
    }
  }
}

.nav {
  /*///////////////////////////////////
  // Region: Nav Animations
  ///////////////////////////////////*/

  $menu-bar-anim-time: 0.3s;
  $menu-bar-anim-offset: 400%;

  $close-bar-anim-time: 0.2s;
  $close-bar-anim-offset: 250%;

  $background-anim-time: $close-bar-anim-time;

  /*///////////////////////////////////
  // Region: Initial (Closed) States
  ///////////////////////////////////*/

  .btn-bar.menu:nth-child(even) {
    width: 1.8em;
  }

  .btn-bar.close {
    &:not(:last-child) {
      transform: rotate(45deg) translateX(-$close-bar-anim-offset);
    }
    &:last-child {
      transform: rotate(-45deg) translateX($close-bar-anim-offset);
    }
  }

  .nav-content .background .portion {
    flex: 1 1 100%;

    &:nth-child(odd) {
      transform: translateX(-100%);
    }
    &:nth-child(even) {
      transform: translateX(100%);
    }
  }

  /*///////////////////////////////////
  // Region: Expanded (Open) States
  ///////////////////////////////////*/

  &.open {
    .nav-btn .btn-bar.menu {
      &:nth-child(odd) {
        transform: translateX(-$menu-bar-anim-offset);
      }
      &:nth-child(even) {
        transform: translateX(calc($menu-bar-anim-offset / 2));
      }
    }

    .nav-btn .btn-bar.close {
      &:not(:last-child) {
        transform: rotate(45deg);
      }
      &:last-child {
        transform: rotate(-45deg);
      }
    }

    .nav-content {
      z-index: 1;

      .background .portion {
        transform: translateX(0%);
      }
    }
  }

  /*///////////////////////////////////
  // Region: Transition -> Menu Opening
  ///////////////////////////////////*/

  &.open .btn-bar.menu {
    // transition when menu is opening
    transition:
      transform $menu-bar-anim-time ease-in-out,
      opacity (calc($menu-bar-anim-time / 2)) ease-in-out (calc($menu-bar-anim-time / 2));
  }

  &.open .btn-bar.close {
    // transition when menu is opening
    transition:
      transform $close-bar-anim-time ease-in-out $menu-bar-anim-time,
      opacity (calc($close-bar-anim-time / 4)) ease-in-out $menu-bar-anim-time;
  }

  &.open .nav-content {
    // transition when menu is opening
    transition: z-index 0.01s ease-in-out $menu-bar-anim-time;
  }

  &.open .nav-content .background .portion {
    // transition when menu is opening
    transition: transform $background-anim-time ease-in-out $menu-bar-anim-time;
  }

  /*///////////////////////////////////
  // Region: Transition -> Menu Closing
  ///////////////////////////////////*/

  .btn-bar.menu {
    // transition when menu is closing
    transition:
      transform $menu-bar-anim-time ease-in-out $close-bar-anim-time,
      opacity (calc($menu-bar-anim-time / 2)) ease-in-out $close-bar-anim-time;
  }

  .btn-bar.close {
    // transition when menu is closing
    transition:
      transform $close-bar-anim-time ease-in-out,
      opacity (calc($close-bar-anim-time / 4)) ease-in-out $close-bar-anim-time;
  }

  .nav-content {
    // transition when menu is closing
    transition: z-index 0.01s ease-in-out $background-anim-time;
  }

  .nav-content .background .portion {
    // transition when menu is closing
    transition: transform $background-anim-time ease-in-out;
  }
}
</style>
