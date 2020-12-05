/**
 * 获取某区域内的随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export { getRandom };
