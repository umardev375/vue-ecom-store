<template>
  <ProductAttributeSectionDesign title="Available Colors">
    <div :class="$style.colors">
      <div
        v-for="(color, colorIndex) in colors"
        :key="colorIndex"
        :class="[
          $style.color,
          { [$style.colorActive]: activeColorIndex === colorIndex }
        ]"
        @click="activeColorIndex = colorIndex"
      >
        <div :class="$style.colorInner">
          <div
            :class="$style.colorColor"
            :style="{ backgroundColor: color }"
          ></div>
        </div>
      </div>
    </div>
  </ProductAttributeSectionDesign>
</template>

<script>
import ProductAttributeSectionDesign from '@/components/_design/Product/ProductAttributeSectionDesign'

export default {
  name: 'ProductAttributeColorsDesign',
  components: { ProductAttributeSectionDesign },
  props: {
    colors: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeColorIndex: -1
    }
  }
}
</script>

<style lang="scss" module>
.colors {
  display: flex;
  flex-wrap: wrap;
  margin: rem-calc(0 -4px);
}

.color {
  border-radius: 5px;
  height: rem-calc(34px);
  margin: rem-calc(0 4px);
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  position: relative;
  transition: border-color 150ms ease-in, border-width 150ms ease-in;
  width: rem-calc(34px);

  &::after {
    border-radius: 5px;
    border: 2px solid $black;
    content: '';
    height: rem-calc(34px);
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%) scale(1.2);
    transition: transform 150ms ease-out;
    width: rem-calc(34px);
  }

  &--active::after {
    transform: translate(-50%, -50%) scale(1);
  }

  &__inner {
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e9edf2;
    width: 100%;
    height: 100%;
    position: relative;
  }

  &__color {
    height: rem-calc(24px);
    transform: scale(1);
    transition: transform 150ms ease-out;
    width: rem-calc(24px);

    .color--active & {
      transform: scale(0.9);
    }
  }
}
</style>
