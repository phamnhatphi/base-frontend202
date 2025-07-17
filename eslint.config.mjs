// @ts-check
import stylistic from '@stylistic/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

import withNuxt from './frontend/admin/.nuxt/eslint.config.mjs';

export default withNuxt([
    // Global ignore patterns
    {
        ignores: [
            '**/.nuxt',
            '**/.output',
            '**/components.d.ts',
            '**/dist',
            '**/nuxt.d.ts',
            'frontend/**/assets/fonts/icons',
        ],
    },
    // Global stylistic patterns
    stylistic.configs.customize({
        indent: 4,
        quotes: 'single',
        semi: true,
        jsx: false,
        arrowParens: true,
        braceStyle: '1tbs',
        blockSpacing: true,
        quoteProps: 'consistent-as-needed',
        commaDangle: 'always-multiline',
    }),
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },

        plugins: {
            'simple-import-sort': simpleImportSort,
        },

        files: ['**/*.ts', '**/*.js', '**/*.vue', '**/*.mjs', '**/*.mts'],

        rules: {
            '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],

            'camelcase': 'off',
            'no-case-declarations': 'off',
            'no-console': 'off',
            'no-debugger': 'off',
            'no-param-reassign': 'error',
            'no-shadow': 'off',
            'no-undef': 'off', // The checks of this rule are already provided by TypeScript
            'no-underscore-dangle': ['error', { allowAfterThis: true }],
            'no-use-before-define': ['error', { variables: false, functions: false }],
            'no-useless-constructor': 'off',
            'prefer-template': 'error',

            'vue/block-tag-newline': ['error'],
            'vue/component-name-in-template-casing': ['error', 'PascalCase', {
                registeredComponentsOnly: false,
            }],
            'vue/html-indent': ['error', 4],
            'vue/html-self-closing': ['error', {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            }],
            'vue/multi-word-component-names': 'off',
            'vue/padding-line-between-blocks': ['error', 'always'],
            'vue/require-default-prop': 'off',
            'vue/singleline-html-element-content-newline': 0,

            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    },
    // Rules only for typescript
    {
        files: ['**/*.ts', '**/*.vue', '**/*.mts'],

        rules: {
            '@typescript-eslint/no-shadow': ['error'],
            '@typescript-eslint/no-useless-constructor': ['error'],
            '@typescript-eslint/explicit-member-accessibility': ['error'],
        },
    },
]);
