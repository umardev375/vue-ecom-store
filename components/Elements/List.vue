<template>
  <component :is="tag" class="list mb-3">
    <li
      v-for="(item, i) in block.data.items"
      :key="item"
      :class="{ 'list__item--last': i === block.data.items.length - 1 }"
      class="list__item"
      v-html="item"
    ></li>
  </component>
</template>

<script>
import elementMixin from '@/components/Elements/elementMixin'

export default {
  name: 'List',
  mixins: [elementMixin],

  computed: {
    tag() {
      return this.block.style === 'ordered' ? 'ol' : 'ul'
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  &__item {
    font-size: rem-calc(14px);
    margin-bottom: 9px;
    &--last {
      margin-bottom: 0;
    }
  }
}
</style>
