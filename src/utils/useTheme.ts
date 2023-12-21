import { readonly, ref, watchEffect } from 'vue'
import { getLocalStorage, storageLocal } from './storageUtils'
type ThemeType = 'light' | 'dark'
const STORE_KEY = '___theme___'

const theme = ref<ThemeType>((getLocalStorage(STORE_KEY) as ThemeType) || 'light')

watchEffect(() => {
  document.documentElement.dataset.theme = theme.value
  storageLocal(STORE_KEY, theme.value)
})

export function useTheme() {
  return {
    theme: readonly(theme)
  }
}
export type { ThemeType }

export function toppleTheme(newTheme:ThemeType){
  theme.value = newTheme
}
