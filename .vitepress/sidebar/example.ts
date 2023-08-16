import type { DefaultTheme } from 'vitepress'
export default (): DefaultTheme.SidebarItem[] => [
  {
    text: 'Main Page',
    collapsed: false,
    base: '/example/',
    items:
      [
        { text: '首页', link: 'main' },
      ]
  },
  {
    text: '组件',
    collapsed: true,
    base: '/example/componentDocs/',
    items:
      [
        { text: '线条', link: 'line' },
        { text: '详情展示', link: 'detailInfo' },
        { text: '图片展示以及图片资源加载', link: 'picViewer' },
      ]
  },
  {
    text: '代码例子',
    collapsed: false,
    base: '/example/demo/',
    items:
      [
        { text: '卡片返转计时+粒子时钟', link: 'particleClock/main' },
        { text: '复杂动画控制', link: 'complexAnimation/main' },
        { text: '无限视差滚动', link: 'infiniteScroll/main' },
        { text: '背景随图片变化+特效loading', link: 'backgroundForImage/main' },
        { text: '代码雨', link: 'codeRain/main' },
        { text: '数字转大写', link: 'numberToBig/main' },
        { text: 'css滤镜', link: 'cssFilter/main' },
        { text: '钉钉官网的滚动动画', link: 'dingDingAnimation/main' },
        { text: '雷达图', link: 'radar/main' },
        { text: 'svg描边动画', link: 'svgStroke/main' },
        { text: '闪光边框', link: 'borderLight/main' },
        { text: '处理异步传染', link: 'solveAsyncInfection/main' },
      ]
  },
]