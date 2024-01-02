/**
 * 菜单类型
 *    最多两层
 *    空数组则不显示菜单栏
 */
export type Menu = {
  label: string
  url: string
  separator: boolean
  submenu: Menu[] | null
}

/**
 * 备案信息
 */
export type Record = {
  author: string
  beginYear: number
  recordNumber: string
}

/**
 * 网站信息
 */
export type Website = {
  title: string
  homeTitle: string
  signal: string
  cover: string
  randomCover: string
}

export type Contact = {
  show: boolean
  content:string
}

export type Contacts = {
  qq: Contact
  // wechat: Contact
  weibo: Contact
  // redbook: Contact
  email: Contact
  twitter: Contact
  facebook: Contact
  telegram: Contact
  instagram: Contact
  github: Contact
  gitee: Contact
}

/**
 * 国际化配置
 */
export type I18n = {
  en: Object,
  zh:Object
}