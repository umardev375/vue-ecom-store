<template>
  <blockquote
    class="blockquote my-3 shadow-sm"
    :class="{ 'blockquote--center mx-auto': centerQuote }"
  >
    <p class="mb-0">
      {{ text }}
    </p>
    <footer class="blockquote__caption">— {{ caption }}</footer>
  </blockquote>
</template>

<script>
import elementMixin from '@/components/Elements/elementMixin'

export default {
  name: 'Quoteblock',
  mixins: [elementMixin],
  computed: {
    text() {
      return this.block.data.text
    },
    centerQuote() {
      return this.block.data.alignment === 'center'
    },
    caption() {
      return this.block.data.caption
    }
  }
}
</script>

<style lang="scss" scoped>
.blockquote {
  margin: 60px 0;
  background: white;
  padding: 30px 60px 30px 80px;
  position: relative;
  border: none;
  border-radius: 8px;
  font-size: rem-calc(18px);

  &:before {
    top: 0;
    left: 10px;
    content: '\201C';
    position: absolute;
    font-size: 80px;
    padding: 10px;
    line-height: 1;
    color: #1e528e;
  }

  &--center {
    text-align: center;
    padding: 30px 0 30px 0;
  }

  &__caption {
    margin-top: 10px;
    font-size: rem-calc(14px);
  }
}
</style>
