<template>
  <!-- Todo: Handle Special Price //wait for server fix -->
  <div :class="$style.price">
    <span>
      <component
        :is="salePrice ? 'strong' : 'span'"
        :class="{ 'fw-500 text-success': salePrice }"
      >
        {{ salePrice || price }}
      </component>
      <del v-if="salePrice">{{ price }}</del>
    </span>
    <small :class="$style.gross"> inkl. Mwst.</small>
  </div>
</template>

<script>
export default {
  name: 'ProductPriceSingle',
  props: {
    product: {
      required: true,
      type: Object
    },
    variantShowing: {
      default: false,
      type: Boolean
    },
    showGross: {
      default: true,
      type: Boolean
    }
  },

  computed: {
    price() {
      return this.product.grossPrice ? this.product.grossPrice.formatted : null
    },

    salePrice() {
      return this.product.specialGrossPrice
        ? this.product.specialGrossPrice.formatted
        : null
    }
  }
}
</script>

<style lang="scss" module>
.gross {
  font-size: rem-calc(12px);
}

.price {
  @include font-size(20px);
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: rem-calc(35px);

  del {
    color: #939393;
    font-size: rem-calc(18px);
    font-weight: 400;
    &--sm {
      font-size: 0.458em;
    }
  }
}
</style>
