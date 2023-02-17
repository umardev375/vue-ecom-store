<template>
  <div :class="$style.el">
    <ImageObject
      :image="{ src: require('@/assets/images/product.png') }"
      fill
    />
    <span :class="$style.expand">
      <ExpandArrowsIcon :class="$style.expandSvg" />
    </span>
  </div>
</template>

<script>
import ImageObject from '@/components/ImageObject'
import ExpandArrowsIcon from '@/icons/ExpandArrowsIcon'

export default {
  name: 'ProductImageDesign',
  components: { ExpandArrowsIcon, ImageObject }
}
</script>

<style lang="scss" module>
.el {
  background-color: $gray-100;
  padding-bottom: 100%;
  position: relative;
}

.expand {
  color: #fff;
  position: absolute;
  right: rem-calc(22px);
  top: rem-calc(22px);

  &:hover {
    color: $body-color;
  }

  &__svg {
    fill: currentColor;
    height: rem-calc(20px);
    width: rem-calc(20px);
  }
}
</style>
