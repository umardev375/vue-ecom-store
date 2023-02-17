<script>
import {
  generateExtraVariables,
  generateStyleSheetFromTheme,
  generateRootStyle
} from '@/utils/theme'

const defaultTheme = {
  primary: '#283976',
  secondary: '#9d9dba',
  danger: '#e72d5c',
  success: '#31d260',
  warning: '#ffc107',
  dark: '#16163e',
  light: '#fff'
}

// Adds tint and shade
const extendedTheme = generateExtraVariables(defaultTheme)

// Check here for classes which are generated https://gist.github.com/cannap/ffcda8a8bd38bff22b91eeb319edf013
const rootStyle = generateRootStyle(extendedTheme)

const styleSheet = generateStyleSheetFromTheme(extendedTheme)

export default {
  name: 'ThemeProvider',
  provide() {
    return {
      theme: extendedTheme
    }
  },
  head() {
    const style = [
      { cssText: styleSheet, type: 'text/css' },
      { cssText: rootStyle, type: 'text/css' }
    ]

    return {
      style
    }
  },
  render(h) {
    return this.$slots.default[0]
  }
}
</script>
