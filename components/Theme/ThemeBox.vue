<template>
  <component :is="as" :style="style">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'ThemeBox',

  inject: ['theme'],

  props: {
    as: {
      type: String,
      default: 'div'
    },

    colorProp: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    style() {
      return {
        backgroundColor: this.theme[this.colorProp]
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
