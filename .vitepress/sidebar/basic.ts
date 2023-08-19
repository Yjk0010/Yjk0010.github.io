import { type DefaultTheme } from 'vitepress'

export default (): DefaultTheme.SidebarItem[] => {
  return [
    {
      text: 'Main Page',
      collapsed: false,
      items:
        [
          { text: '介绍', link: 'main' },
        ]
    },
    {
      text: "八股文",
      collapsed: false,
      items: [
        {
          text: "<•ᴥ•>",
          collapsed: true,
          base: "/basic/others/",
          items: [
            { text: 'HTTP', link: 'http' },
            { text: '路径的写法', link: 'route' },
          ]
        },
      ]
    },
    {
      text: '浏览器',
      collapsed: false,
      items:
        [
          {
            text: "<•ᴥ•>",
            collapsed: true,
            base: "/basic/browser/",
            items: [
              { text: '介绍', link: 'main' },
              { text: '浏览器大战', link: 'browserWars' },
              { text: '浏览器渲染原理', link: 'renderSchematic' },
              { text: '资源提示关键词', link: 'resourceTips' },
              { text: '事件循环', link: 'eventLoop' },
            ]
          },
        ]
    },
    {
      text: 'HTML',
      collapsed: false,
      items:
        [
          {
            text: "<•ᴥ•>",
            collapsed: true,
            base: "/basic/html/base/",
            items: [
              { text: '介绍', link: 'main' },
              { text: '语义化', link: 'semantic' },
              { text: '小知识点', link: 'littleCase' },
            ],
          },
          {
            text: '元素',
            collapsed: true,
            base: "/basic/html/element/",
            items:
              [
                { text: '文本元素', link: 'textEle' },
                { text: 'HTML实体', link: 'entity' },
                { text: 'a 元素', link: 'eleA' },
                { text: 'img 元素', link: 'eleImg' },
                { text: '多媒体 元素', link: 'eleVideo' },
                { text: '列表 元素', link: 'eleList' },
                { text: 'iframe 元素', link: 'eleIframe' },
                { text: '表单 元素', link: 'eleForm' },
                { text: '表格 元素', link: 'eleTable' },
                { text: '其他 元素', link: 'eleOther' },
              ]
          },
        ]
    },
    {
      text: "CSS",
      collapsed: false,
      items: [
        {
          text: "<•ᴥ•>",
          collapsed: true,
          base: "/basic/css/base/",
          items: [
            { text: '介绍', link: 'main' },
            { text: '优化', link: 'optimize' },
            { text: '小知识点', link: 'littleCase' },
          ]
        },
        {
          text: '术语',
          collapsed: true,
          base: "/basic/css/terminology/",
          items:
            [
              { text: '简单术语', link: 'main' },
              { text: '层叠', link: 'cascade' },
              { text: '包含块', link: 'bhk' },
              { text: '盒模型', link: 'boxModel' },
            ]
        },
        {
          text: '属性',
          collapsed: true,
          base: "/basic/css/attr/",
          items:
            [
              { text: '属性值', link: 'main' },
              { text: '属计算过程', link: 'attrCalcProcess' },
            ]
        },
      ]
    },

  ]
}