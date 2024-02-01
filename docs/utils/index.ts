

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

type FormatString = "YYYY-MM-DD HH:mm:ss" | "YYYY-MM-DD" | "HH:mm:ss" | "HH:mm" | "YYYY-MM" | "MM-DD";
/**
 * 时间格式化
 * @param {Date} date 时间对象
 * @param {string} formatString 格式化类型
 * @return {string} 格式化后的时间字符串
 */
export const formatDate = (date: Date, formatString: FormatString): string => {
  const formatOptions: Record<string, string> = {
    YYYY: String(date.getFullYear()),
    MM: (date.getMonth() + 1).toString().padStart(2, '0'),
    DD: date.getDate().toString().padStart(2, '0'),
    HH: date.getHours().toString().padStart(2, '0'),
    mm: date.getMinutes().toString().padStart(2, '0'),
    ss: date.getSeconds().toString().padStart(2, '0')
  };
  return formatString.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => formatOptions[match]);
}
type DiffReturn = {
  years: number,
  months: number,
  days: number
}
/**
 * 时间差
 * @param prevDate 时间对象1
 * @param nextDate 时间对象2
 * @returns {DiffReturn} { years: number, months: number, days: number }
 */
export const diffDate = (prevDate: Date, nextDate: Date): DiffReturn => {
  const diffYears = prevDate.getFullYear() - nextDate.getFullYear();
  const diffMonths = prevDate.getMonth() - nextDate.getMonth() + diffYears * 12;
  let prevTime = prevDate.getTime();
  let nextTime = nextDate.getTime();
  const diffDays = Math.trunc((prevTime - nextTime) / 1000 / 60 / 60 / 24);
  return {
    years: diffYears,
    months: diffMonths,
    days: diffDays
  }
}



