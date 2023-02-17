module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  globals: {
    process: true,
    tailwindcss: true,
    $style: true,
    $fetchState: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
    // 'plugin:@intlify/vue-i18n/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    // Optional.

    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unused-vars': 'warn',
    'require-await': 'warn',
    'vue/no-v-html': 'off',

    'vue/no-unused-components': [
      'warn',
      {
        ignoreWhenBindingPresent: true
      }
    ]
  },
  settings: {
    'vue-i18n': {
      localeDir: './locales/*.{js}'
    }
  }
}
