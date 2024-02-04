import type { Theme } from 'vitepress'
import DefaultTheme from "vitepress/theme-without-fonts";
import 'element-plus/theme-chalk/dark/css-vars.css'
import "./custom.css"
import MyLayout from './Layout.vue'

import TypeText from "docs/components/TypeText/index.vue";
import PicViewer from "docs/components/PicViewer/index.vue";
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("TText", TypeText);
    app.component("PicViewer", PicViewer);
  },
  Layout: MyLayout,
} satisfies Theme;
