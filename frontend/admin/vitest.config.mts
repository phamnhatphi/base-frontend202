import { defineVitestConfig } from '@nuxt/test-utils/config';
import { resolve } from 'path';

export default defineVitestConfig({
    root: resolve(__dirname),
    resolve: {
        alias: {
            '@admin': resolve(__dirname),
        },
    },
    test: {
        globals: true,
        globalSetup: resolve(__dirname, 'vitest-globals.mts'),
        environment: 'nuxt',
        coverage: {
            reporter: ['html', 'text'],
            reportsDirectory: resolve(__dirname, '..', '..', '.coverage-report/frontend-admin'),
            exclude: [
                '.nuxt',
                '*.config.mjs',
                '*.config.ts',
                '*virtual:nuxt:*', // virtual files of nuxt-vitest,
                '**/*.test.ts',
                '**/*.test.vue',
                '**/*.test.js',
                '**/_nuxt/',
                '**/assets/',
                '**/config/',
                '**/models/',
                '**/pages/_samples/',
                '**/server/',
            ],
        },
        environmentOptions: {
            nuxt: {
                rootDir: resolve(__dirname),
                overrides: {
                    app: {
                        baseURL: '',
                    },
                },
            },
        },
    },
});
