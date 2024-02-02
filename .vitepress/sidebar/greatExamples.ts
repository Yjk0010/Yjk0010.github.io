import type { DefaultTheme } from 'vitepress'
export default (): DefaultTheme.SidebarItem[] => [
  {
    text: '介绍',
    link: 'main',
  },
  {
    text: 'html',
    collapsed: false,
    base: '/greatExamples/html/',
    items: [
      { text: '基础', link: 'main' },
    ]
  },
]
