<template>
  <div>
    <span :class="$style.price">
      <sup v-if="salePrice && salePrice !== price">
        <del> ${{ price }}</del>
      </sup>
      ${{ salePrice || price }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ProductListItemPriceDesign',
  props: {
    price: {
      type: Number,
      required: true
    },

    salePrice: {
      type: Number,
      default: null
    }
  }
}
</script>

<style lang="scss" module>
.price {
  font-size: rem-calc(24px);
  font-weight: 600;
  line-height: 1.2;

  del {
    color: #939393;
    font-size: 0.458em;
    font-weight: 400;
  }
}
</style>
