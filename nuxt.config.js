export default {
  head: {
    title: 'Shop - frontend',
    generate: {
      crawler: false
    },
    script: [{ hid: 'stripe', src: 'https://js.stripe.com/v3/', defer: true }],
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ]
  },

  mode: process.env.MODE.toLowerCase() || 'universal',
  /*
   ** Headers of the page
   */
  publicRuntimeConfig: {
    backOffice: process.env.BACK_OFFICE,
    demoShop: process.env.DEMO_SHOP,
    productsPerRow: 4,
    enableDevShop: process.env.ENABLE_DEVSHOP === 'yes' || false,
    stripeKey: process.env.STRIPE_PUBLIC_KEY,
    paypalKey: process.env.PAYPAL_PUBLIC_KEY,
    devShop: process.env.DEV_SHOP,
    isDev: process.env.NODE_ENV !== 'production'
  },

  router: {
    middleware: ['closeDrawer', 'maintenance']
  },

  telemetry: false,
  components: false,

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['swiper/swiper.scss', '@/assets/styles/app.scss'],
  /*
   ** Plugins to load before mounting the App
   */

  plugins: [
    '~/plugins/ie11.client.js',
    '~/plugins/stripe.client.js',
    // '~/plugins/theme.js',
    '~/plugins/Toast.js',
    '~/plugins/VeeValidate.js',
    { src: '~/plugins/vue-easy-lightbox.js', mode: 'client' },
    { src: '~/plugins/tracking.js' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    // Doc: https://bootstrap-vue.js.org/docs/
    //   'bootstrap-vue/nuxt',
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    '@nuxtjs/google-fonts',
    'nuxt-build-optimisations'
  ],
  buildOptimisations: {
    profile: 'risky'
  },
  googleFonts: {
    families: {
      Poppins: {
        wght: [500, 600, 700]
      }
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    //  '@nuxtjs/sentry',
    '@nuxtjs/universal-storage',
    '@nuxtjs/axios',
    'nuxt-i18n',
    '@nuxtjs/auth'
  ],

  storage: {
    vuex: { namespace: 'storage' },
    initialState: {
      shopId: false,
      GUEST_CART: null,
      CUSTOMER_CART: null
    }
  },

  i18n: {
    locales: [
      {
        iso: 'en-EN',
        code: 'en',
        file: 'en.js'
      },
      {
        iso: 'de-DE',
        code: 'de',
        file: 'de.js'
      }
    ],
    strategy: 'prefix_except_default',
    defaultLocale: process.env.DEFAULT_LANG,
    vueI18n: {
      fallbackLocale: process.env.DEFAULT_LANG,
      silentTranslationWarn: true
    },
    parsePages: false,
    langDir: 'locales/',
    lazy: true,
    seo: false
  },

  build: {
    postcss: {
      'postcss-cssnext': {
        browsers: ['last 2 versions', 'ie >= 9']
      }
    },
    extend(config, ctx) {
      // config.devtool = 'eval-source-map'
      if (ctx.isDev && ctx.isClient) {
        config.devtool = 'eval-source-map'
      }
    },
    transpile: [
      'vee-validate/dist/rules',
      'lodash-es',
      'vuex-map-fields',
      'nanoid'
    ],
    loaders: {
      cssModules: {
        modules: {
          localIdentName:
            process.env.NODE_ENV === 'production'
              ? '_app_[hash:base64:5]'
              : '[path][name]-[local]-[hash:base64:5]',
          exportLocalsConvention: 'camelCaseOnly'
        }
      }
    }
  },
  vue: {
    config: {
      devtools: true
    }
  },
  /*
   ** Disabling Bootstrap Compiled CSS
   */
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
    // components: ['BDropdownItem', 'BDropdown']
  },
  styleResources: {
    // your settings here
    sass: [],
    scss: ['~assets/styles/vars.scss', '~assets/styles/functions.scss']
  },
  server: {
    port: 3008
  },
  auth: {
    scopeKey: 'roles',
    resetOnError: true,
    redirect: {
      // login: false,
      //   logout: false,
      // callback: '/login',
      home: false,
      logout: false
    },
    strategies: {
      volvStrategy: {
        _scheme: '~/plugins/VolvAuth',
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'data.access_token',
            expiresIn: 'data.expires_in'
          },

          logout: false,
          user: {
            url: '/auth/check',
            propertyName: 'data'
          }
        }
      },
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'data.access_token',
            expiresIn: 'data.expires_in'
          },

          logout: false,
          user: {
            url: '/auth/check',
            propertyName: 'data'
          }
        }
      }
    },
    plugins: ['~/plugins/initalizeShop.js', '~/plugins/cartHandler.js']
  }
  // purgeCSS: {
  //   mode: 'webpack',
  //   whitelistPatterns: [/_app_/],
  //   // whitelistPatternsChildren: [/mx-|multiselect/]
  // }
}
