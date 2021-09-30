const { FRONT_PORT, SERVER_ADDRESS, SERVER_PORT } = process.env

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SSDIP Mailing',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Get a list of mails from SSDIP and send messages to them',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'SSDIP, webscrap, emails, mailing',
      },
      {
        hid: 'author',
        name: 'author',
        content:
          'Aleksander Szołowicz <aleksander.szolowicz@gmail.com> (https://github.com/Lumm1t)',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // https://www.npmjs.com/package/vuex-persist
    { src: '~/plugins/vuex-persist', mode: 'client' },
    // https://github.com/iliyaZelenko/tiptap-vuetify-nuxt
    { src: '~/plugins/tiptap-vuetify', mode: 'client' },
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: `${SERVER_ADDRESS || 'http://localhost'}:${SERVER_PORT || 5000}`,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vuetify/lib', 'tiptap-vuetify'],
  },

  server: {
    port: FRONT_PORT || 3000,
  },

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-srcdir
  srcDir: 'client/',
}
