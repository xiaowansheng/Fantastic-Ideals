import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/home/index.vue')
      },
    ]   
  }
]
