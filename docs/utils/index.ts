

/**
 * 生成指定范围内的随机整数。
 *
 * @param {number} min - 最小值（包含）。
 * @param {number} max - 最大值（包含）。
 * @return {number} 生成的随机整数。
 *
 * @example
 * const randomNum = getRandomNum(1, 10);
 * console.log(randomNum); // 可能输出介于 1 到 10 之间的随机整数。
 */
export const getRandomNum = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};