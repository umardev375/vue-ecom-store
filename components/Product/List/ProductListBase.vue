<template>
  <div class="row">
    <div
      v-for="product in products"
      :key="product.id"
      :class="['col-6 col-sm-4', $style.col]"
    >
      <ProductListItem :product="product" />
    </div>
  </div>
</template>

<script>
import ProductListItem from '@/components/Product/List/ProductListItem'
export default {
  name: 'ProductListBase',
  components: { ProductListItem },
  props: {
    productsPerRow: {
      type: Number,
      default: 4
    },
    products: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" module>
.col {
  @include media-breakpoint-down(xxs) {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
