import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import home from "./sidebar/home"
import browser from "./sidebar/browser"
import html from "./sidebar/html"
import css from "./sidebar/css"
import js from "./sidebar/js"
import ts from "./sidebar/ts"
import vue from "./sidebar/vue"
import webpack from "./sidebar/webpack"
import componentDocs from "./sidebar/componentDocs"
import example from "./sidebar/example"


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jinke Blog",
  lang: 'zh-CN',
  srcDir: 'docs',
  description: "Some simple notes",
  head: [
    ['link', { rel: "icon", href: "/favicon.ico" }],
  ],

  themeConfig: {
    logo: '/favicon.ico',
    outline: [2, 3],
    search: {
      provider: 'local'
    },
    outlineTitle: '目录导航',
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
      // { text: '面试题', link: '/interviewQuestion/main', activeMatch: '/interviewQuestion' },
      { text: '例子', link: '/example/main', activeMatch: '/example' },
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
      '/example': example,
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
      { icon: 'github', link: 'https://github.com/Yjk0010/Yjk0010.github.io' },
      { icon: 'twitter', link: 'https://twitter.com/home' },
      {
        icon: {
          svg: `<svg t="1683253830543" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3142" width="200" height="200"><path d="M512 1024C229.2224 1024 0 794.7776 0 512 0 229.2224 229.2224 0 512 0c282.7776 0 512 229.2224 512 512 0 282.7776-229.2224 512-512 512z m17.066667-413.525333c34.850133 4.352 68.778667 5.12 102.741333 2.0992 23.04-2.048 44.817067-8.362667 64.170667-21.9136 38.212267-26.794667 49.783467-85.1968 24.251733-123.050667-14.626133-21.7088-36.8128-30.344533-60.757333-35.498667-35.054933-7.543467-70.4512-5.751467-105.847467-3.413333-5.666133 0.3584-6.7584 3.072-7.236267 8.209067-3.072 32.682667-6.536533 65.314133-9.813333 97.962666-2.5088 24.814933-4.932267 49.629867-7.509333 75.605334z m53.4016-33.928534c1.962667-20.906667 3.6352-39.338667 5.4272-57.770666 1.553067-15.906133 3.413333-31.778133 4.727466-47.701334 0.3584-4.283733 1.553067-6.656 5.956267-6.382933 15.616 1.041067 31.709867 0.034133 46.728533 3.652267 36.488533 8.823467 48.725333 54.306133 23.3472 83.029333-15.8208 17.902933-36.7616 23.586133-59.255466 25.088-8.465067 0.546133-17.015467 0.085333-26.9312 0.085333zM512 434.295467c-2.184533-0.648533-3.5328-1.1776-4.932267-1.4336-37.717333-6.877867-75.690667-8.328533-113.646933-2.816-20.974933 3.037867-41.0112 9.489067-57.480533 23.330133-22.9888 19.319467-21.640533 46.848 4.4032 62.0032 13.056 7.594667 28.023467 12.509867 42.5984 17.288533 14.08 4.608 28.996267 6.826667 43.144533 11.264 12.5952 3.925333 14.011733 14.318933 3.584 22.306134-3.345067 2.56-7.441067 5.085867-11.537067 5.751466-11.195733 1.826133-22.698667 4.386133-33.826133 3.566934-24.098133-1.774933-48.042667-5.461333-72.5504-8.430934-1.365333 10.615467-2.935467 23.0912-4.5568 35.9424 4.181333 1.365333 7.68 2.730667 11.264 3.618134 33.9456 8.4992 68.386133 9.608533 102.912 5.12 20.087467-2.6112 39.4752-7.901867 56.695467-19.029334 28.603733-18.4832 36.693333-57.1904-4.676267-75.383466-14.506667-6.382933-30.190933-10.410667-45.482667-15.086934-11.4176-3.4816-23.313067-5.614933-34.525866-9.5232-9.7792-3.413333-11.144533-12.202667-3.037867-18.397866 4.6592-3.549867 10.717867-6.997333 16.384-7.3728a480.853333 480.853333 0 0 1 53.384533-0.853334c15.377067 0.699733 30.651733 3.549867 46.4896 5.5296L512 434.295467z m257.143467 2.048L750.933333 614.2976h54.152534c4.778667-45.636267 9.710933-90.7264 14.062933-135.8848 0.6144-6.365867 2.3552-8.840533 8.686933-9.0112 11.434667-0.273067 22.8864-1.979733 34.286934-1.570133 23.722667 0.853333 42.3936 9.728 38.4 43.264-2.901333 24.2688-5.597867 48.571733-8.2432 72.874666-1.092267 10.069333-1.826133 20.189867-2.730667 30.4128h55.330133c3.584-35.259733 7.9872-70.058667 10.496-104.994133 3.413333-47.4624-17.7664-73.3184-64.682666-80.213333-40.96-6.007467-81.339733-0.341333-121.5488 7.133866z m-483.498667 134.6048c-8.738133 1.297067-16.384 2.798933-24.098133 3.4816-25.6512 2.235733-51.319467 3.9424-76.305067-4.266667-13.909333-4.590933-24.6784-12.578133-29.7984-25.9584-7.901867-20.701867 0.887467-47.104 19.831467-60.3136 17.373867-12.117333 37.717333-15.9232 58.453333-15.9232 22.545067-0.017067 45.090133 2.423467 68.232533 3.84L307.2 432.298667c-15.069867-1.723733-29.4912-3.925333-43.997867-4.9152-41.0112-2.798933-80.64 2.6112-117.469866 20.462933-30.020267 14.557867-52.053333 36.010667-58.6752 68.130133-7.850667 38.144 11.537067 69.495467 51.7632 85.845334 19.1488 7.765333 39.287467 12.509867 60.0064 12.5952 24.746667 0.1024 49.493333-1.570133 74.205866-2.952534 3.106133-0.170667 8.311467-2.901333 8.669867-5.034666 1.979733-11.554133 2.730667-23.278933 3.9424-35.464534z" p-id="3143"></path></svg>`,
        },
        link: 'https://blog.csdn.net/jinke0010?type=blog'
      },
    ],

    footer: {
      message: 'Released under the <a href="https://github.com/Yjk0010/Yjk0010.github.io/blob/master/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2023-present <a href="https://github.com/Yjk0010">Jinke Yan</a>'
    },
  },

  vite: {
    build: {
      minify: false
    },
    css: {
      modules: {
        localsConvention: 'camelCase'
      },
    },
    server: {
      hmr: {
        overlay: false
      }
    },
    plugins: [
      vueJsx(),
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            importStyle: "sass",
          }),
        ],
      }),
      Components({
        dts: true,
        resolvers: [ElementPlusResolver({ ssr: true, importStyle: "sass" })],
      }),
    ],
  },
})