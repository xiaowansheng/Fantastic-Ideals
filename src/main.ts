import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { setupStore } from '@/stores'
import { useI18n } from '@/plugins/i18s'
import { useSvgIcon } from '@/plugins/svg'
const app = createApp(App)
setupStore(app)
useI18n(app)
useSvgIcon(app)
app.use(router)
app.mount('#app')
