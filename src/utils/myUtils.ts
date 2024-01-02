interface AnyObject {
  [key: string]: any
}
/**
 * 把一个对象的属性深度克隆到另一个空对象中
 *    另一个空对象可以不传，或者传提前定义的{}
 * @param source 
 * @param target 
 * @returns 
 */
export function deepClone(source: AnyObject, target: AnyObject = {}): AnyObject {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] === null || typeof source[key] !== 'object') {
        // 如果是基本类型或 null，则直接赋值
        target[key] = source[key]
      } else if (source[key] instanceof Date) {
        // 如果是日期对象，则返回新的日期对象
        target[key] = new Date(source[key].getTime())
      } else if (source[key] instanceof Array) {
        // 如果是数组，则递归克隆数组中的每个元素
        target[key] = source[key].map((item: any) => deepClone(item))
      } else {
        // 对象的情况，递归克隆
        target[key] = deepClone(source[key], {})
      }
    }
  }

  return target
}
