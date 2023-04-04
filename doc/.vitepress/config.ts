import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "KingKe Blog",
  description: "Some simple notes",
  head: [
    ['link', { rel: "icon", href: "/assets/favicon.ico" }],
  ],
  themeConfig: {
    logo: '/assets/favicon.ico',
    nav: [
      { text: '开始', link: '/' },
      { text: '主页', link: '/home/main', activeMatch: '/home' },
      { text: 'HTML', link: '/html/main', activeMatch: '/html' },
      { text: 'CSS', link: '/css/main', activeMatch: '/css' },
      { text: 'JAVASCRIPT', link: '/js/main', activeMatch: '/js' },
      { text: 'TYPESCRIPT', link: '/ts/main', activeMatch: '/ts' },
      { text: 'WEBPACK', link: '/webpack/main', activeMatch: '/webpack' },
      // { text: '关于我', link: '/aboutMe/main', activeMatch: '/aboutMe' },
    ],

    sidebar: {
      '/home': [
        {
          text: '主页',
          collapsed: false,
          items:
            [
              { text: '首页', link: '/home/main' },
            ]
        },
      ],
      '/html': [
        {
          text: '主页',
          collapsed: false,
          items:
            [
              { text: '首页', link: '/home/main' },
            ]
        },
      ],
      '/css': [
        {
          text: '主页',
          collapsed: false,
          items:
            [
              { text: '首页', link: '/home/main' },
            ]
        },
      ],
      '/js': [
        {
          text: '主页',
          collapsed: false,
          items:
            [
              { text: '首页', link: '/home/main' },
            ]
        },
      ],
      '/ts': [
        {
          text: '主页',
          collapsed: false,
          items:
            [
              { text: '首页', link: '/home/main' },
            ]
        },
      ],
      '/webpack': [
        {
          text: '主页',
          collapsed: false,
          items:
            [
              { text: '首页', link: '/home/main' },
            ]
        },
      ],
      '/aboutMe': [
        {
          text: '关于我',
          collapsed: false,
          items:
            [
              { text: '首页', link: '/aboutMe/main' },
              { text: '个人简介', link: '/aboutMe/selfDesc' },
            ]
        },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Yjk0010/Docs' }
    ],

    footer: {
      message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2023-present <a href="https://github.com/Yjk0010">KingKe Yan</a>'
    }

  },
})
