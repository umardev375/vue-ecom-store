<template>
  <component :is="tag" v-html="block.data.text"></component>
</template>

<script>
import elementMixin from '@/components/Elements/elementMixin'

export default {
  name: 'Heading',
  mixins: [elementMixin],

  props: {
    level: {
      type: Number,
      default: 2
    }
  },
  computed: {
    tag() {
      return `h${this.block?.data?.level || this.level}`
    }
  }
}
</script>

<style lang="scss" scoped></style>
