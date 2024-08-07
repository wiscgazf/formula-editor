import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    emptyOutDir: true,
    target: 'modules',
    outDir: 'lib',
    minify: false,
    rollupOptions: {
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      }
    },
    lib: {
      entry: './src/packages/index.ts',
      name: 'formula-editor',
    }
  }
})
