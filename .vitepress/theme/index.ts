import type { Theme } from 'vitepress'
import DefaultTheme from "vitepress/theme";

import Badge from "/components/Badge/index.vue";
// import Flowchart from "/components/Flowchart/index.vue"
import Line from "/components/Line/index.vue";
import "./custom.css"

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("Badge", Badge);
    app.component("Line", Line);
    // app.component("Flowchart", Flowchart);
  },
};

export default theme
