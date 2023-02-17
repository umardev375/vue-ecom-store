<template>
  <p v-html="block.data.text"></p>
</template>

<script>
import elementMixin from '@/components/Elements/elementMixin'

export default {
  name: 'Paragraph',

  mixins: [elementMixin]
}
</script>

<style lang="scss" scoped>
p {
  font-size: rem-calc(14px);
  line-height: calc(1.5em + 0.3333vw);
  word-wrap: break-word;
}
</style>
