<template>
  <div v-frag>
    <component
      :is="normalizeType(block.type)"
      v-for="(block, i) in blocks"
      :key="i"
      :class="block.type"
      :block="block"
    ></component>
  </div>
</template>

<script>
import widgetMixin from '@/components/Renderer/widgetMixin'
import frag from 'vue-frag'
const possibleTypes = ['paragraph', 'header', 'list', 'quote', 'delimiter']
export default {
  name: 'RichTextBase',
  components: {
    paragraph: () => import('@/components/Elements/Paragraph'),
    heading: () => import('@/components/Elements/Heading'),
    list: () => import('@/components/Elements/List'),
    quote: () => import('@/components/Elements/Quoteblock'),
    delimiter: () => import('@/components/Elements/Delimiter')
  },
  directives: {
    frag
  },
  mixins: [widgetMixin],
  computed: {
    blocks() {
      return this.data?.content?.value?.blocks
    }
  },
  methods: {
    hasType(type) {
      return possibleTypes.includes(type)
    },
    normalizeType(type) {
      if (!this.hasType(type)) return ''

      return type === 'header' ? 'heading' : type
    }
  }
}
</script>

<style lang="scss" scoped></style>
