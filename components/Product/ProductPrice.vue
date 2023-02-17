<template>
  <!-- Todo: Handle Special Price //wait for server fix -->
  <div :class="$style.price">
    <span>
      <sup>
        <!--  <del> ${{ grossPrice }}</del> -->
      </sup>

      {{ showFrom ? 'From' : '' }} {{ displayPrice }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ProductPrice',
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
    priceType() {
      return this.showGross ? 'grossPrice' : 'netPrice'
    },

    displayPrice() {
      return this.product.variantMinPrice
        ? this.variantMinPrice
        : this.productPrice
    },

    productPriceValue() {
      return this.product[this.priceType].value
    },

    showFrom() {
      if (!this.product.variantMinPrice) return false

      return (
        this.variantMinPriceValue < this.productPriceValue ??
        this.variantMinPriceValue !== this.productPriceValue
      )
    },

    variantMinPriceValue() {
      return this.product.variantMinPrice[this.priceType].value
    },

    productPrice() {
      return this.product[this.priceType].formatted
    },

    variantMinPrice() {
      return this.product.variantMinPrice?.[this.priceType].formatted
    }
  }
}
</script>

<style lang="scss" module>
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
