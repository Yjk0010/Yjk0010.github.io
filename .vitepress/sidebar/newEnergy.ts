import type { DefaultTheme } from 'vitepress'

export default (): DefaultTheme.SidebarItem[] => [
  {
    text: '新能源',
    link: 'main',
  },
  {
    text: '新能源相关电力学知识',
    collapsed: false,
    base: '/newEnergy/knowledge/',
    items:
      [
        { text: '术语', link: 'term' },
      ]
  },
  {
    text: '相关设备',
    collapsed: true,
    base: '/newEnergy/device/',
    items:
      [
        { text: 'EMS', link: 'EMS' },
      ]
  },
  {
    text: '储能大类',
    collapsed: true,
    base: '/newEnergy/ES/',
    items:
      [
        { text: '储能基础知识', link: 'base' },
        { text: '锂离子储能行业上下游产业链', link: 'IndustryChain' },
      ]
  },
]

// abc