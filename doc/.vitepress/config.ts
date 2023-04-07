import { defineConfig } from 'vitepress'
import home from "./sidebar/home"
import html from "./sidebar/html"
import css from "./sidebar/css"
import js from "./sidebar/js"
import ts from "./sidebar/ts"
import webpack from "./sidebar/webpack"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "KingKe Blog",
  lang: 'zh-CN',
  description: "Some simple notes",
  head: [
    ['link', { rel: "icon", href: "/assets/favicon.ico" }],
    ['link', { rel: 'stylesheet', href: '/style/index.css' }],
    ['link', { rel: 'stylesheet', href: '/style/ele.css' }]
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
      '/home': home,
      '/html': html,
      '/css': css,
      '/js': js,
      '/ts': ts,
      '/webpack': webpack,
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
    },
  },

})
