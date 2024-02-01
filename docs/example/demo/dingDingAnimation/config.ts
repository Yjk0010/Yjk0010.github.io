const lanzi = `linear-gradient(135deg, #002d9c, #8f35ff)`
const lan = `linear-gradient(135deg, #004fff, #007fff)`
const qianlan = `linear-gradient(135deg, #56ece4, #09baff)`
const lv = `linear-gradient(135deg, #00ebb6, #00ba46)`
const huang = `linear-gradient(135deg, #ffc400, #ff9200)`
const cheng = `linear-gradient(135deg, #ff5f00, #ff8d16)`
const zi = `linear-gradient(135deg, #e58dff, #8f35ff)`
export const pointStyleList = [
  {
    left: 50,
    top: 50,
    width: 60,
    background: lanzi,
  },
  {
    left: 270,
    top: 30,
    width: 50,
    background: lanzi,
  },
  {
    left: 60,
    top: 340,
    width: 60,
    background: zi,
  },
  {
    left: 240,
    top: 190,
    width: 20,
    background: zi,
  },
  {
    left: 600,
    top: 80,
    width: 50,
    background: lan,
  },
  {
    left: 640,
    top: 330,
    width: 60,
    background: lan,
  },
  {
    left: 350,
    top: 50,
    width: 35,
    background: lan,
  },
  {
    left: 330,
    top: 150,
    width: 20,
    background: cheng,
  },
  {
    left: 330,
    top: 350,
    width: 30,
    background: lan,
  },
  {
    left: 590,
    top: 250,
    width: 45,
    background: qianlan,
  },
  {
    left: 500,
    top: 280,
    width: 35,
    background: qianlan,
  },
  {
    left: 420,
    top: 210,
    width: 20,
    background: qianlan,
  },
  {
    left: 210,
    top: 160,
    width: 25,
    background: qianlan,
  },
  {
    left: 540,
    top: 130,
    width: 35,
    background: lv,
  },
  {
    left: 130,
    top: 120,
    width: 40,
    background: huang,
  },
  {
    left: 200,
    top: 220,
    width: 25,
    background: huang,
  },
  {
    left: 80,
    top: 170,
    width: 50,
    background: cheng,
  },
  {
    left: 110,
    top: 250,
    width: 45,
    background: cheng,
  },
]
const [centerLeftMin, centerLeftMax, centerTopMin, centerTopMax] = [
  200, 500, 50, 300,
];
const [leftMin, leftMax, topMin, topMax] = [30, 640, 30, 370];
export const optionMinMax = {
  centerLeftMin,
  centerLeftMax,
  centerTopMin,
  centerTopMax,
  leftMin,
  leftMax,
  topMin,
  topMax,
}
// 展示文字
export const textList = [
  "天",
  "生",
  "我",
  "材",
  "必",
  "有",
  "用",
  "千",
  "金",
  "散",
  "尽",
  "还",
  "复",
  "来",
];
// 控制先后动画展示位置
export const orderList = [0, 1, 2, 3, 2, 1, 0, 0, 1, 2, 3, 2, 1, 0];
