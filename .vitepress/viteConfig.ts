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
    // 将 element-plus 依赖包列入生产环境下的预优化范围。Vite 会对其进行依赖分析，把它需要的依赖预加载到浏览器缓存中。
    include: ['element-plus'],
  },
  css: {
    // 开启css模块化
    modules: {
      // css模块化命名规范为驼峰
      localsConvention: 'camelCase'
    },
  },
  server: {
    // 更改启动port
    port: 9527,
    hmr: {
      // 取消报错浮窗提示
      overlay: false
    }
  },
  resolve: {
    // 路径别名
    alias: {
      'docs': resolve('docs/'),
    }
  },
  ssr: {
    // https://github.com/vuejs/vitepress/issues/1465
    noExternal: ['element-plus']
  },
  plugins: [
    // jsx
    vueJsx(),
    // 自动引入
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    // 自动注册
    Components({
      dts: true,
      resolvers: [
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver(),
      ],
    }),
    // 自动注册
    Icons({
      autoInstall: true,
    }),
    // 开发展示代码转化结果
    Inspect()
  ],
  build: {
    // 配置图片base64编码的最大值
    assetsInlineLimit: 1024 * 10,
    minify: false
  },
}

export default viteConfig