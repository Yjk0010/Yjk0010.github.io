import { defineConfig } from 'vitepress'
import generateSidebar from './sidebar';

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

    sidebar: generateSidebar(),
    //  {
    //   '/home': [
    //     {
    //       text: '主页',
    //       collapsed: false,
    //       items:
    //         [
    //           { text: '(•̀ᴗ•́)و ̑̑', link: '/home/main' },
    //         ]
    //     },
    //     {
    //       text: '小知识',
    //       collapsed: false,
    //       items:
    //         [
    //           { text: 'markdown 语法', link: '/home/md' },
    //           { text: '浏览器', link: '/home/browser' },
    //         ]
    //     },
    //   ],
    //   '/html': [
    //     {
    //       text: '主页',
    //       collapsed: false,
    //       items:
    //         [
    //           { text: '首页', link: '/html/main' },
    //         ]
    //     },
    //   ],
    //   '/css': [
    //     {
    //       text: '主页',
    //       collapsed: false,
    //       items:
    //         [
    //           { text: '首页', link: '/css/main' },
    //         ]
    //     },
    //   ],
    //   '/js': [
    //     {
    //       text: '主页',
    //       collapsed: false,
    //       items:
    //         [
    //           { text: '首页', link: '/js/main' },
    //         ]
    //     },
    //   ],
    //   '/ts': [
    //     {
    //       text: '主页',
    //       collapsed: false,
    //       items:
    //         [
    //           { text: '首页', link: '/ts/main' },
    //         ]
    //     },
    //   ],
    //   '/webpack': [
    //     {
    //       text: '主页',
    //       collapsed: false,
    //       items:
    //         [
    //           { text: '首页', link: '/webpack/main' },
    //         ]
    //     },
    //   ],
    //   '/aboutMe': [
    //     {
    //       text: '关于我',
    //       collapsed: false,
    //       items:
    //         [
    //           { text: '首页', link: '/aboutMe/main' },
    //           { text: '个人简介', link: '/aboutMe/selfDesc' },
    //         ]
    //     },
    //   ]
    // },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Yjk0010/Docs' }
    ],

    footer: {
      message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2023-present <a href="https://github.com/Yjk0010">KingKe Yan</a>'
    }

  },
})
