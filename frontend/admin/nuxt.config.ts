/**
 * For more information:
 * https://nuxt.com/docs/api/configuration/nuxt-config
 */
import { resolve } from 'path';

import useConfig from './composables/use-config';

const { frontend, system } = useConfig();
const isProduction = process.env.NODE_ENV !== 'development';
const proxyTargetBaseUrl = process.env.PROXY_TARGET_BASE_URL || null;
const globalPublicPath = resolve(__dirname, '..', '..', 'public');

/* global defineNuxtConfig */
export default defineNuxtConfig(Object.assign(
    {
        ssr: false,
        spaLoadingTemplate: false,
        compatibilityDate: '2024-07-03',
        devtools: { enabled: true },
        app: {
            baseURL: `/${frontend.basePath}`,
            head: {
                htmlAttrs: {
                    lang: 'ja',
                },
                title: '読込中',
                titleTemplate: `%s .:. ${system.app_name}`,
                meta: [
                    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                    {
                        name: 'description',
                        content: '各末端システムが共通で利用する認証基盤システムです',
                    },
                ],
            },
        },
        components: {
            dirs: [
                {
                    path: '~/components/global',
                    global: true,
                },
            ],
        },
        css: [
            '@mdi/font/css/materialdesignicons.css',
            '@admin/assets/fonts/icons/icons.css',
            '@admin/assets/css/default.scss',
        ],
        hooks: {
            'prerender:routes'({ routes }: unknown) {
                routes.clear(); // Do not generate any routes (except the defaults)
            },
        },
        imports: {
            autoImport: false,
        },
        modules: [
            '@nuxt/eslint',
            '@pinia/nuxt',
            '@nuxt/test-utils/module',
            'nuxt-security',
            'vuetify-nuxt-module',
        ].concat(
            isProduction
                ? []
                : ['nuxt-proxy-request'],
        ),
        pages: {
            pattern: [
                '**/*.vue',
                '!**/components/**',
                '!**/utils/**',
                '!**/composables/**',
                '!**/*.test.{js,ts,mts,mjs,vue}',
            ].concat(
                isProduction
                    ? ['!**/_samples/**']
                    : [],
            ),
        },
        router: {
            options: {
                hashMode: false,
            },
        },
        typescript: {
            strict: true,
            typeCheck: true,
        },
        vite: {
            define: {
                'process.env.DEBUG': false,
            },
        },
        alias: {
            '@admin': resolve(__dirname),
            '@globalPublic': globalPublicPath,
        },
        security: {
            removeLoggers: {
                consoleType: ['log', 'debug'],
            },
            headers: {
                // For library Nuxt DevTools
                // @ref: https://nuxt-security.vercel.app/documentation/getting-started/setup#using-with-nuxt-devtools
                crossOriginEmbedderPolicy: isProduction ? 'require-corp' : 'unsafe-none',
            },
        },
        vuetify: {
            moduleOptions: {
                styles: {
                    configFile: './assets/css/vuetify-settings.scss',
                },
            },
        },
        nitro: {
            output: {
                publicDir: resolve(globalPublicPath, system.modules.frontend.base_path),
            },
        },
    },
    isProduction || !proxyTargetBaseUrl
        ? {} as never
        : {
                /**
                 * Configures proxy rules for development environment to forward requests to the backend server.
                 * This allows the frontend application running on localhost to communicate with the backend
                 * services without CORS/cookie issues during development.
                 *
                 * NOTE:
                 * This configuration block is only effective in the development environment,
                 * provided that the `nuxt-proxy-request` dependency has been installed correctly.
                 */
                proxy: {
                    options: [
                        {
                            target: `${proxyTargetBaseUrl}/admin/api/v1`,
                            pathFilter: ['/proxy-admin-api/'],
                            pathRewrite: {
                                '^/proxy-admin-api': '',
                            },
                        },
                        {
                            target: `${proxyTargetBaseUrl}/oauth/v2`,
                            pathFilter: ['/proxy-oauth/'],
                            pathRewrite: {
                                '^/proxy-oauth': '',
                            },
                        },
                        {
                            target: `${proxyTargetBaseUrl}/external/api/v1`,
                            pathFilter: ['/proxy-external-api/'],
                            pathRewrite: {
                                '^/proxy-external-api': '',
                            },
                        },
                    ],
                },
            } as never,
));
