import vue from '@vitejs/plugin-vue';
import {defineConfig} from "vite";
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [VantResolver()],
        }),
        // 开启跨域

    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://101.42.229.5:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
})
