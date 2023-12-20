import { defineStore } from 'pinia'
import { store } from '@/stores'

export const useSettingStore = defineStore({
  id: 'setting',
  state: () => {
    return {}
  },
  getters: {
  },
  actions: {}
})

export function useSettingStoreHook() {
  return useSettingStore(store)
}
