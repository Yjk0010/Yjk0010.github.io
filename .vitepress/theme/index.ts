import type { Theme } from 'vitepress'
import DefaultTheme from "vitepress/theme";
import ElementPlus from 'element-plus'

import Badge from "/components/Badge/index.vue";
import Line from "/components/Line/index.vue";
import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css'
import "./custom.scss";

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("Badge", Badge);
    app.component("Line", Line);
    app.use(ElementPlus);
  },
};

export default theme
