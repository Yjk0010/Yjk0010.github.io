import type { UserConfig } from 'vite'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'

const viteConfig: UserConfig = {
  optimizeDeps: {
    include: ['element-plus'], // 如果使用了 Element Plus，需要将它列入 optimizeDeps 的配置中
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
  },
  server: {
    port: 9527,
    hmr: {
      overlay: false
    }
  },
  resolve: {
    alias: {
      'docs': resolve('docs/'),
    }
  },
  ssr: {
    // https://github.com/vuejs/vitepress/issues/1465
    noExternal: ['element-plus']
  },
  plugins: [
    vueJsx(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      dts: true,
      resolvers: [
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver(),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    Inspect()
  ],
  build: {
    // 配置图片base64编码的最大值
    assetsInlineLimit: 1024 * 10,
    minify: false
  },
}

export default viteConfig