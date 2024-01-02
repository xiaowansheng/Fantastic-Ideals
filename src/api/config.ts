import { http } from '@/utils/http'
/**
 * 获取菜单配置
 * @returns
 */
export function getMenu(): Promise<any> {
  return http.get('/data/menu.json')
}

/**
 * 获取备案信息
 * @returns
 */
export function getRecord(): Promise<any> {
  return http.get('/data/record.json')
}

/**
 * 获取网站信息
 * @returns
 */
export function getWebsite(): Promise<any> {
  return http.get('/data/website.json')
}

/**
 * 获取联系方式
 * @returns
 */
export function getContacts(): Promise<any> {
  return http.get('/data/contacts.json')
}

/**
 * 获取每日一句
 * @returns
 */
export function getSentence(): Promise<any> {
  return http.get('https://v1.hitokoto.cn', null, {
    baseURL: ''
  })
}
