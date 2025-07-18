import { defineNuxtModule, addPlugin, createResolver, addComponentsDir } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'my-module',
    configKey: 'myModule',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Tự động đăng ký tất cả các component trong thư mục 'components'
    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      global: true, // Tùy chọn: làm cho các component có sẵn global
      prefix: 'App', // Tiền tố cho các component (ví dụ: <AppButton>)
    })

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
