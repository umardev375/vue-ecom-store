<template>
  <ThemeProvider>
    <Nuxt />
  </ThemeProvider>
</template>

<script>
import ThemeProvider from '@/components/ThemeProvider'
export default {
  name: 'PreviewLayout',
  components: { ThemeProvider }
}
</script>

<style lang="scss" scoped></style>
