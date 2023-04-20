import type { Theme } from 'vitepress'
import DefaultTheme from "vitepress/theme";

import Badge from "/components/Badge/index.vue";

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("Badge", Badge);
  },
};

export default theme
