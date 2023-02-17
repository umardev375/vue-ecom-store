<template>
  <ProductAttributeSectionDesign title="Available Sizes">
    <div :class="$style.items">
      <div
        v-for="(size, sizeIndex) in sizes"
        :key="sizeIndex"
        :class="[
          $style.item,
          { [$style.itemActive]: activeSizeIndex === sizeIndex }
        ]"
        @click="activeSizeIndex = sizeIndex"
      >
        <div :class="$style.itemInner">
          {{ size }}
        </div>
      </div>
    </div>
  </ProductAttributeSectionDesign>
</template>

<script>
import ProductAttributeSectionDesign from '@/components/_design/Product/ProductAttributeSectionDesign'

export default {
  name: 'ProductAttributeSizesDesign',
  components: { ProductAttributeSectionDesign },
  props: {
    sizes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeSizeIndex: -1
    }
  }
}
</script>

<style lang="scss" module>
.items {
  display: flex;
  flex-wrap: wrap;
  margin: rem-calc(0 -4px);
}

.item {
  @include font-size(12px);
  border-radius: rem-calc(4px);
  font-weight: 700;
  color: $gray-600;
  line-height: 1.2;
  margin: rem-calc(0 4px);
  overflow: hidden;
  position: relative;

  &__inner {
    border-radius: rem-calc(4px);
    border: 1px solid #e3e3e3;
    height: 100%;
    padding: rem-calc(9px 16px);
    width: 100%;
  }

  &::after {
    border-radius: rem-calc(4px);
    border: 2px solid $black;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: scale(1.3);
    transition: transform 200ms ease-out;
    width: 100%;
  }

  &--active::after {
    transform: scale(1);
  }
}
</style>
