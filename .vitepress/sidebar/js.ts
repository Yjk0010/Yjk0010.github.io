import type { DefaultTheme } from 'vitepress'
export default (): DefaultTheme.SidebarItem[] => [
  {
    text: 'Main Page',
    collapsed: false,
    base: '/js/',
    items:
      [
        { text: '介绍', link: 'main' },
        { text: '小知识点', link: 'littleCase' },
        { text: '小问题', link: 'littleQuestion' },
      ]
  },
  {
    text: '基础',
    collapsed: false,
    base: '/js/base/',
    items:
      [
        { text: '特性', link: 'feature' },
        { text: '规范', link: 'criterion' },
        { text: '数据类型', link: 'dataType' },
        { text: '变量声明', link: 'variable' },
      ]
  },
  {
    text: '高级功法',
    collapsed: false,
    base: '/js/advancedWay/',
    items:
      [
        { text: 'toFixed不精确', link: 'toFixed' },
        { text: '防抖和节流', link: 'debAndThr' },
        { text: '函数重载', link: 'functionOverLoading' },
      ]
  },
]

