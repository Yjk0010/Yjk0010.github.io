import type { DefaultTheme } from 'vitepress'
export default (): DefaultTheme.SidebarItem[] => [
  {
    text: '主页',
    link: 'main',
  },
  {
    text: '其他技巧',
    collapsed: true,
    base: '/greatExamples/others/',
    items: [
      { text: '小点子', link: 'main' },
    ]
  },
  {
    text: '前端技巧',
    collapsed: true,
    base: '/greatExamples/web/',
    items: [
      { text: '小点子', link: 'main' },
      { text: '拖拽', link: 'drag/main' },
      {
        text: 'html', base: '/greatExamples/web/html/', items:
          [
            { text: '小点子', link: 'main' },
          ]
      },
      {
        text: 'css', base: '/greatExamples/web/css/', items:
          [
            { text: '代码块', link: 'main' },
            { text: 'flex+margin', link: 'flexMargin/main' },
          ]
      },
    ]
  },
]
