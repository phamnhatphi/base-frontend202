import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [vue(), dts()],
    build: {
        lib: {
            entry: resolve(__dirname, 'frontend/admin/index.ts'),
            name: 'BaseFrontend',
            fileName: (format) => `base-frontend.${format}.js`,
        },
        rollupOptions: {
            external: ['vue', 'nuxt', 'vuetify'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});
