<template>
  <component :is="tag" :title="text">
    {{ truncatedText }}
  </component>
</template>

<script>
import truncat from 'truncate'
export default {
  name: 'TruncatText',
  props: {
    text: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'div'
    },
    length: {
      type: Number,
      default: 20
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    truncatedText() {
      return truncat(this.text, this.length, this.options)
    }
  }
}
</script>

<style lang="scss" scoped></style>
