import { defineStore } from 'pinia'
import { store } from '@/stores'
import { storageLocal, getLocalStorage, removeLocalStorage } from '@/utils/storageUtils'
// import { storageSession } from "@pureadmin/utils";
const storageKey = 'user_info'
const accessKey = 'authorized_token'

type userType{

}
export const useUserStore = defineStore({
  id: 'user',
  state: (): userType => ({
    // information: {}
  }),
  actions: {
  }
})

export function useUserStoreHook() {
  return useUserStore(store)
}
