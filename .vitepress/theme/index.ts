import type { Theme } from 'vitepress'
import DefaultTheme from "vitepress/theme";

import Badge from "/components/Badge/Badge.vue";
import Line from "/components/Line/Line.vue";
import PicViewer from "/components/PicViewer/PicViewer.vue";
import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css'
import "./custom.css";

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("Badge", Badge);
    app.component("Line", Line);
    app.component("PicViewer", PicViewer);
  },
};

export default theme
