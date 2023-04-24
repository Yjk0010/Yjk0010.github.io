import type { Theme } from 'vitepress'
import DefaultTheme from "vitepress/theme";

import Badge from "/components/Badge/index.vue";
import Flowchart from "/components/Flowchart/index.vue"
import Mermaid from "/components/Mermaid/index.vue"
import "./custom.css"

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("Badge", Badge);
    app.component("Flowchart", Flowchart);
    app.component("Mermaid", Mermaid);
  },
};

export default theme
