import type { DefaultTheme } from 'vitepress'

export default (): DefaultTheme.SidebarItem[] => [
  {
    text: '(•̀ᴗ•́)و ̑̑',
    link: 'main',
  },
  {
    text: '小知识',
    collapsed: false,
    base: '/home/',
    items:
      [
        { text: 'vitepress markdown 语法', link: 'md' },
      ]
  },
  {
    text: '关于我',
    collapsed: true,
    base: '/home/aboutMe/',
    items:
      [
        { text: '非常规介绍', link: 'main' },
        { text: '个人简介', link: 'selfDesc' },
      ]
  },
]