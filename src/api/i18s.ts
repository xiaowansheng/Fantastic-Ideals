import { http } from '@/utils/http'
/**
 * 获取国际化文本信息
 * @returns
 */
export function getI18n(): Promise<any> {
  return http.get('/data/i18n.json')
}


