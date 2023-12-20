import type { App } from 'vue'
import SvgIcon from "@/components/svg/index.vue"

export function useSvgIcon(app: App) {
  app.component('svg-icon', SvgIcon)
}
