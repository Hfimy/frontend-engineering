/**
 * 对象深拷贝
 * @param {object} originalObject
 * @returns {object}
 */
export function deepClone(originalObject) {
  return JSON.parse(JSON.stringify(originalObject));
}
