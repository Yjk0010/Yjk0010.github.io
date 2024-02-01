import type { DefaultTheme } from 'vitepress'
export default (): DefaultTheme.SidebarItem[] => [
  {
    text: '高阶',
    link: 'main',
  },
  {
    text: '设计模式',
    collapsed: false,
    base: '/highOrder/designPattern/',
    items:
      [
        { text: '介绍', link: 'main' },
        { text: '单例模式', link: 'singleton/main' },
        { text: '工厂模式', link: 'factory/main' },
        { text: '适配器模式', link: 'adapter/main' },
      ]
  },
  {
    text: '算法仓库',
    collapsed: false,
    base: '/highOrder/algorithm/',
    items:
      [
        { text: '介绍', link: 'main' },
        { text: '最长递增子序列', link: 'LIS' },
      ]
  },
]