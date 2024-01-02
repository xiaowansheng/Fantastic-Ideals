## 菜单配置

### 菜单集合结构

```javascript
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
```



### 菜单项结构

```javascript
export type Menu = {
  label: string
  url: string
  submenu: Menu[] | null
}
```

最多两层菜单。



## 网站信息配置

**title：网页标签的标题**

**homeTitle：主页显示的标题**

**cover 和 randomCover 只会有一个封面生效，cover 优先，若是没有设置，则使用randomCover 随机**

```javascript
export type Website = {
  title: string
  homeTitle: string
  signal: string
  cover: string
  randomCover: string
}
```





## 联系方式结构

**content填用户名**

```javascript
export type Contact = {
  show: boolean
  content:string
}
```



## 备案信息结构

```javascript
export type Record = {
  author: string
  beginYear: number
  recordNumber: string
}
```



## 国际化配置

**只有英语和简体中文两种语言设置**

```javascript
export type I18n = {
  en: Object,
  zh:Object
}
```

