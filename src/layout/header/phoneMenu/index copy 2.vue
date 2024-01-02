<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import type { Menu } from '@/api/type'
defineOptions({
  name: 'PhoneMenu'
})
const menuItems = ref<Menu | any>([])

let nav: any = null
let menu: any = null
let menuToggle: any = null
let isMenuOpen: any = false

const toggleMenu = () => {
  isMenuOpen = !isMenuOpen
  menuToggle.setAttribute('aria-expanded', String(isMenuOpen))
  menu.hidden = !isMenuOpen
  nav.classList.toggle('nav--open')
}

const handleNavKeydown = (e: any) => {
  if (!isMenuOpen || e.ctrlKey || e.metaKey || e.altKey) {
    return
  }

  const menuLinks = menu.querySelectorAll('.nav__link')
  if (e.keyCode === 9) {
    if (e.shiftKey) {
      if (document.activeElement === menuLinks[0]) {
        menuToggle.focus()
        e.preventDefault()
      }
    } else if (document.activeElement === menuToggle) {
      menuLinks[0].focus()
      e.preventDefault()
    }
  }
}
onMounted(() => {
  nav = document.querySelector('#nav')
  menu = document.querySelector('#menu')
  menuToggle = document.querySelector('.nav__toggle')

  // menuToggle.addEventListener('click', toggleMenu)
  // nav.addEventListener('keydown', handleNavKeydown)
})
</script>

<template>
  <div class="phone">
    <header class="header" role="banner">
      <nav id="nav" @keydown="handleNavKeydown" class="nav" role="navigation">
        <!-- ACTUAL NAVIGATION MENU -->
        <ul class="nav__menu" id="menu" tabindex="-1" aria-label="main navigation" hidden>
          <li class="nav__item"><a href="#" class="nav__link">Home</a></li>
          <li class="nav__item"><a href="#" class="nav__link">Shop</a></li>
          <li class="nav__item"><a href="#" class="nav__link">Blog</a></li>
          <li class="nav__item"><a href="#" class="nav__link">About</a></li>
          <li class="nav__item"><a href="#" class="nav__link">Contact</a></li>
        </ul>

        <!-- MENU TOGGLE BUTTON -->
        <a
          href="#nav"
          class="nav__toggle"
          @click="toggleMenu"
          role="button"
          aria-expanded="false"
          aria-controls="menu"
        >
          <svg
            class="menuicon"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
          >
            <title>Toggle Menu</title>
            <g>
              <line class="menuicon__bar" x1="13" y1="16.5" x2="37" y2="16.5" />
              <line class="menuicon__bar" x1="13" y1="24.5" x2="37" y2="24.5" />
              <line class="menuicon__bar" x1="13" y1="24.5" x2="37" y2="24.5" />
              <line class="menuicon__bar" x1="13" y1="32.5" x2="37" y2="32.5" />
              <circle class="menuicon__circle" r="23" cx="25" cy="25" />
            </g>
          </svg>
        </a>

        <!-- ANIMATED BACKGROUND ELEMENT -->
        <div class="splash"></div>
      </nav>
    </header>
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
// ---------------------------
// Vars & Helper Functions
// ---------------------------

.phone {
  // max-width: 100vw;
  // max-height: 100vh;
  // overflow: hidden;
  --screen-width: 100vw;
  --screen-height: 100vh;
  --header-bg-color: #673ab7;
  --splash-bg-color: #368887;

  width: var(--screen-width);
  height: var(--screen-height);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

// calculate a circle's circumference based on radius
@function circumference($r) {
  $pi: 3.141592653;
  @return 2 * $pi * $r;
}

// ---------------------------
// Main Navigation Menu
// ---------------------------

.nav {
  // Toggle Button
  &__toggle {
    display: inline-block;
    position: absolute;
    z-index: 99;
    padding: 0;
    border: 0;
    background: transparent;
    // background-color: red;
    outline: 0;
    right: 15px;
    top: 15px;
    cursor: pointer;
    border-radius: 50%;
    transition: background-color 0.15s linear;

    &:hover,
    &:focus {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  &__menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: var(--screen-height);
    position: relative;
    z-index: 99;
    visibility: hidden;
  }

  &__item {
    opacity: 0;
    transition: all 0.3s cubic-bezier(0, 0.995, 0.99, 1) 0.3s;
  }
  @for $i from 1 through 5 {
    &__item:nth-child(#{$i}) {
      transform: translateY(-40px * $i);
    }
  }

  &__link {
    color: white;
    display: block;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 5px;
    font-size: 1.25rem;
    text-decoration: none;
    padding: 1rem;

    &:hover,
    &:focus {
      outline: 0;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}

// ---------------------------
// SVG Menu Icon
// ---------------------------

.menuicon {
  display: block;
  cursor: pointer;
  color: white;

  transform: rotate(0deg);
  transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &__bar,
  &__circle {
    fill: none;
    stroke: currentColor;
    stroke-width: 3;
    stroke-linecap: round;
  }
  &__bar {
    transform: rotate(0deg);
    transform-origin: 50% 50%;
    transition: transform 0.25s ease-in-out;
  }
  &__circle {
    transition: stroke-dashoffset 0.3s linear 0.1s;
    stroke-dashoffset: circumference(23); // 23 is the <circle>'s radius
    stroke-dasharray: circumference(23);
  }
}

// ---------------------------
// Circular Splash Background
// ---------------------------

.splash {
  position: fixed;
  // top: 40px;
  // right: 40px;
  // width: 1px;
  // height: 1px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 50;
  overflow: hidden;
  

  &::after {
    content: '';
    display: block;
    position: absolute;
    border-radius: 50%;
    background-color: var(--splash-bg-color);
    background-color: red;

    // screen diameter can be 142vmax at most,
    // circle needs to be twice that size to cover it
    width: 284vmax;
    height: 284vmax;
    top: -142vmax;
    left: -142vmax;
    // z-index: 98;

    transform: scale(0);
    transform-origin: 50% 50%;
    transition: transform 0.5s cubic-bezier(0.755, 0.05, 0.855, 0.06);

    // will-change tells the browser we plan to
    // animate this property in the near future
    will-change: transform;
  }
}

// ---------------------------
// Active State
// ---------------------------

.nav:target,
.nav--open {
  //scale the background circle to full size
  > .splash::after {
    transform: scale(1);
  }

  //animate the menu icon
  .menuicon {
    color: white;
    transform: rotate(180deg);

    &__circle {
      stroke-dashoffset: 0;
    }
    &__bar:nth-child(1),
    &__bar:nth-child(4) {
      opacity: 0;
    }
    &__bar:nth-child(2) {
      transform: rotate(45deg);
    }
    &__bar:nth-child(3) {
      transform: rotate(-45deg);
    }
  }

  //show the nav items
  .nav {
    &__menu {
      visibility: visible;
    }

    &__item {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

// ---------------------------
// Demo Stuff, Ignore
// ---------------------------

// body {
//   background-color:#D7D7D7;
//   font-family: 'Roboto';
//   min-height:100vh;
//   display:flex;
//   flex-direction:column;
//   justify-content:center;
// }

// .viewport {
//   width:var(--screen-width);
//   height:var(--screen-height);
//   margin:0 auto;
//   position:relative;
//   overflow:hidden;
//   background-color:white;
// }

.header {
  height: 5rem;
  background-color: var(--header-bg-color);
}

// .main {
//   padding:20px;
// }

// .gallery {
//   display:grid;
//   grid-template-columns:repeat(auto-fill, minmax(130px, 1fr));
//   grid-auto-rows: 130px;
//   grid-gap:20px;

//   &__item {
//     height:100%;
//     background-color:#D8D8D8;

//     &:hover,
//     &:focus {
//       background-color:#A4A4A4;
//     }
//   }
// }
</style>
