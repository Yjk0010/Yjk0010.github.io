import type { DefaultTheme } from 'vitepress'

import home from "./home"
import basic from "./basic"
import js from "./js"
import vue from "./vue"
import highOrder from "./highOrder"
import example from "./example"
import greatExamples from "./greatExamples"
import newEnergy from "./newEnergy"


export const nav: DefaultTheme.NavItem[] = [
  { text: 'Jinke Blog', link: '/' },
  { text: '介绍', link: '/home/main', activeMatch: '/home/' },
  { text: '基石', link: '/basic/main', activeMatch: '/basic/' },
  { text: 'JAVASCRIPT', link: '/js/main', activeMatch: '/js/' },
  { text: 'VUE', link: '/vue/main', activeMatch: '/vue/' },
  { text: '高阶', link: '/highOrder/main', activeMatch: '/highOrder/' },
  { text: '例子', link: '/example/main', activeMatch: '/example' },
  { text: '奇技淫巧', link: '/greatExamples/main', activeMatch: '/greatExamples' },
  { text: '新能源', link: '/newEnergy/main', activeMatch: '/newEnergy' },

]
export const sidebar: DefaultTheme.Sidebar = {
  '/home/': { base: '/home/', items: home() },
  '/basic/': { base: '/basic/', items: basic() },
  '/js/': { base: '/js/', items: js() },
  '/vue/': { base: '/vue/', items: vue() },
  '/highOrder/': { base: '/highOrder/', items: highOrder() },
  '/example/': { base: '/example/', items: example() },
  '/greatExamples/': { base: '/greatExamples/', items: greatExamples() },
  '/newEnergy/': { base: '/newEnergy/', items: newEnergy() },
}

