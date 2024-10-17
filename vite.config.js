import { defineConfig } from 'vite'
import { resolve } from 'path'; // 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  minify: true, // 是否压缩代码
  build: {
    rollupOptions: {
      output: {
        // 修改静态资源路径
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'static/assets/js/[name]-[hash].js',
        assetFileNames: 'static/assets/[ext]/[name]-[hash].[ext]',
      }
    }
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
    },
  },
  base: './', // 资源定位更改为相对路径
  // base: '/', // 资源定位更改为绝对路径
  server: {
    port: 8080,
    host: '0.0.0.0',
    proxy: {
      '/osl-screen': {
        // target: 'http://192.168.180.86:7777', // myj
        target: 'http://192.168.8.88:9087', // test
        // target: 'http://192.168.8.243:8043',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/osl-screen/, "osl-screen"),
      }
    },
  },
})
