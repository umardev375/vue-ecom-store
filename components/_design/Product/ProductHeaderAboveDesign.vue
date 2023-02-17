<template>
  <div :class="$style.el">
    <div :class="$style.left">
      <div :class="$style.badges">
        <ProductBadgeDesign :class="$style.badge" title="New" />
        <ProductBadgeDesign :class="$style.badge" title="Sale" black />
        <ProductBadgeDesign :class="$style.badge" title="-20%" black />
      </div>
    </div>
    <div :class="$style.right">
      <ProductRatingsDesign />
      <span :class="$style.like">
        <HeartIcon :class="$style.likeSvg" />
      </span>
    </div>
  </div>
</template>

<script>
import ProductBadgeDesign from '@/components/_design/Product/ProductBadgeDesign'
import ProductRatingsDesign from '@/components/_design/Product/ProductRatingsDesign'
import HeartIcon from '@/icons/HeartIcon'

export default {
  name: 'ProductHeaderAboveDesign',
  components: {
    ProductRatingsDesign,
    HeartIcon,
    ProductBadgeDesign
  }
}
</script>

<style lang="scss" module>
.el {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: rem-calc(0 -8px);
}

.left {
  margin: rem-calc(0 8px 8px);
}

.right {
  align-items: center;
  display: flex;
  margin: rem-calc(0 8px 8px);
}

.badges {
  margin: rem-calc(-6px);
}

.badge {
  margin: rem-calc(6px);
}

.like {
  color: #dddddd;
  display: inline-block;
  margin-left: rem-calc(26px);

  &:hover {
    color: $black;
  }

  &__svg {
    fill: currentColor;
    height: rem-calc(16px);
    width: rem-calc(20px);
  }
}
</style>
