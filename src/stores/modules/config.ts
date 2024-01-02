import { defineStore } from 'pinia'
import { store } from '@/stores'
import type { Menu, Website, Record, Contacts } from '@/api/type'

import i18n from '@/plugins/i18s'
import { getI18n } from '@/api/i18s'
import { deepClone } from '@/utils/myUtils'
import { getContacts, getMenu, getRecord, getWebsite } from '@/api/config'
type config = {
  menu: Menu | any
  website: Website | any
  contacts: Contacts | any
  record: Record | any
}
export const useConfigStore = defineStore({
  id: 'config',
  state: (): config => {
    return {
      menu: {},
      website: {},
      contacts: {},
      record: {}
    }
  },
  getters: {},
  actions: {
    /**
     * 获取国际化数据，放到国际化配置中
     */
    initI18n() {
      getI18n()
        .then((data) => {
          // 将源对象的属性合并到目标对象中
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              i18n.global.mergeLocaleMessage(key, data[key])
            }
          }
          // i18n.global.setLocaleMessage()
          deepClone(data, i18n.global.messages)
        })
        .catch(() => {})
    },
    initMenu() {
      getMenu().then((data: Menu) => {
        this.menu = data
      })
    },
    initWebsite() {
      getWebsite().then((data: Menu) => {
        this.website = data
      })
    },
    initContacts() {
      getContacts().then((data: Contacts) => {
        this.contacts = data
      })
    },
    initRecord() {
      getRecord().then((data: Menu) => {
        this.record = data
      })
    }
  }
})

export function useConfigStoreHook() {
  return useConfigStore(store)
}
