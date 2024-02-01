import type { DefaultTheme } from 'vitepress'
export default (): DefaultTheme.SidebarItem[] => [
  {
    text: '介绍',
    link: 'main',
  },
  {
    text: 'vue2 ~~ vue3',
    collapsed: false,
    base: '/vue/base/',
    items:
      [
        { text: '基础知识', link: 'main' },
        { text: '响应式原理的', link: 'vue3PKvue2' },
        { text: 'Dom Diff算法', link: 'domDiff' },
      ]
  },
  {
    text: 'vue2',
    collapsed: true,
    base: '/vue/vue2/',
    items:
      [
        { text: '测试', link: 'markdown' },
      ]
  },
  {
    text: 'vue3',
    base: '/vue/vue3/',
    collapsed: true,
    items:
      [
        { text: 'vue3 中的 jsx 写法', link: 'vueJsx' },
      ]
  },
]
