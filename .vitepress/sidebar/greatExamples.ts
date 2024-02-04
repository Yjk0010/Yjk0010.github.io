import type { DefaultTheme } from 'vitepress'
export default (): DefaultTheme.SidebarItem[] => [
  {
    text: '主页',
    link: 'main',
  },
  {
    text: '其他技巧',
    collapsed: false,
    base: '/greatExamples/others/',
    items: [
      { text: '小点子', link: 'main' },
    ]
  },
  {
    text: '混合技巧',
    collapsed: false,
    base: '/greatExamples/hybrid/',
    items: [
      { text: '小点子', link: 'main' },
      { text: '拖拽', link: 'drag/main' },
    ]
  },
  {
    text: 'html技巧',
    collapsed: false,
    base: '/greatExamples/html/',
    items: [
      { text: '小点子', link: 'main' },
    ]
  },
]
