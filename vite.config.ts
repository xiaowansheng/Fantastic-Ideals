import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { createHtmlPlugin } from 'vite-plugin-html'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' 
import path from 'path'
//这个配置 为了在html中使用 环境变量
const getViteEnv = (mode:any, target:any) => {
  return loadEnv(mode, process.cwd())[target];
};
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) =>{
  return {
    plugins: [
      vue(),
      vueJsx(),
      createSvgIconsPlugin({
        // 需要自动导入的 svg 文件目录（可自行修改）我的路径如下图所示
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icon')],
        // 执行icon name的格式（可自行修改）
        symbolId: 'icon-[dir]-[name]'
      }),
      createHtmlPlugin({
        inject: {
          data: {
            logo: getViteEnv(mode, 'VITE_APP_LOGO'),
            title: getViteEnv(mode, 'VITE_APP_TITLE')
          }
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
