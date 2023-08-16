import type { DefaultTheme } from 'vitepress'
export default (): DefaultTheme.SidebarItem[] => [
  {
    text: 'Main Page',
    collapsed: false,
    base: '/algorithm/',
    items:
      [
        { text: '介绍', link: 'main' },
      ]
  },
  {
    text: '算法仓库',
    collapsed: false,
    base: '/algorithm/store/',
    items:
      [
        { text: '最长递增子序列', link: 'LIS' },
      ]
  },
]