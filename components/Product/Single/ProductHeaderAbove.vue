<template>
  <div class="row">
    <div v-if="salePercentage" class="col-auto mb-2">
      <div :class="$style.badges">
        <ProductBadge :class="$style.badge" black title="SALE"></ProductBadge>
        <ProductBadge
          black
          :class="$style.badge"
          :title="salePercentage"
        ></ProductBadge>
      </div>
    </div>
    <!--  <div class="col-auto d-flex align-items-center mb-2 ml-auto">

      <span :class="$style.like">
        <HeartIcon :class="$style.likeSvg" />
      </span>
    </div> -->
  </div>
</template>

<script>
import HeartIcon from '@/icons/HeartIcon'
import ProductBadge from '@/components/Product/ProductBadge'

export default {
  name: 'ProductHeaderAbove',
  components: {
    ProductBadge,
    HeartIcon
  },
  props: {
    salePercentage: {
      type: [String, Number],
      default: null
    }
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
  transition: color 150ms ease-in-out;
  //margin-left: rem-calc(26px);

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
