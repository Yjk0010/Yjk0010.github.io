import type { DefaultTheme } from 'vitepress'

export default (): DefaultTheme.SidebarItem[] => [
  {
    text: '储能学习框架',
    link: 'main',
  },
  {
    text: '能源管理',
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
]

// abc