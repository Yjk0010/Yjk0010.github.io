import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'
import home from "./sidebar/home"
import browser from "./sidebar/browser"
import html from "./sidebar/html"
import css from "./sidebar/css"
import js from "./sidebar/js"
import ts from "./sidebar/ts"
import vue from "./sidebar/vue"
import webpack from "./sidebar/webpack"
import componentDocs from "./sidebar/componentDocs"
import interviewQuestion from "./sidebar/interviewQuestion"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jinke Blog",
  lang: 'zh-CN',
  srcDir: 'docs',
  description: "Some simple notes",
  head: [
    ['link', { rel: "icon", href: "/assets/favicon.ico" }],
    ['link', { rel: 'stylesheet', href: '/style/index.css' }],
  ],
  // 给 @/ 映射到 doc/ 目录

  themeConfig: {
    logo: '/assets/favicon.ico',
    outline: [2, 3],
    nav: [
      { text: '开始', link: '/' },
      { text: '主页', link: '/home/main', activeMatch: '/home' },
      { text: '浏览器', link: '/browser/main', activeMatch: '/browser' },
      { text: 'HTML', link: '/html/main', activeMatch: '/html' },
      { text: 'CSS', link: '/css/main', activeMatch: '/css' },
      { text: 'JAVASCRIPT', link: '/js/main', activeMatch: '/js' },
      // { text: 'TYPESCRIPT', link: '/ts/main', activeMatch: '/ts' },
      { text: 'VUE', link: '/vue/main', activeMatch: '/vue' },
      // { text: 'WEBPACK', link: '/webpack/main', activeMatch: '/webpack' },
      { text: '组件', link: '/componentDocs/main', activeMatch: '/componentDocs' },
      { text: '面试题', link: '/interviewQuestion/main', activeMatch: '/interviewQuestion' },
      // { text: '关于我', link: '/aboutMe/main', activeMatch: '/aboutMe' },
    ],
    sidebar: {
      '/home': home,
      '/browser': browser,
      '/html': html,
      '/css': css,
      '/js': js,
      '/ts': ts,
      '/vue': vue,
      '/webpack': webpack,
      '/componentDocs': componentDocs,
      '/interviewQuestion': interviewQuestion,
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
      { icon: 'github', link: 'https://github.com/Yjk0010/Yjk0010.github.io' }
    ],

    footer: {
      message: 'Released under the <a href="https://github.com/Yjk0010/Yjk0010.github.io/blob/master/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2023-present <a href="https://github.com/Yjk0010">Jinke Yan</a>'
    },
  },

  vite: {
    plugins: [
      vueJsx(),
    ],
    css: {
      modules: {
        localsConvention: 'camelCase'
      },
      preprocessorOptions: {

      },
    },
    server: {
      hmr: {
        overlay: false
      }
    },
  },
})