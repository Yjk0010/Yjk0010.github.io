import DefaultTheme from "vitepress/theme";
import Badge from "/components/Badge/index.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("Badge", Badge);
  },
};
