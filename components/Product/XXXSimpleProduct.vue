<template>
  <div class="product">
    <h3 class="product__name" itemprop="name">{{ product.title }}</h3>
    <NuxtLink
      :to="localePath({ name: 'product', params: { slug: product.slug } })"
    >
      <img
        :alt="product.title"
        class="product__image"
        width="300"
        height="300"
        :src="product.thumbnail ? product.thumbnail : '/images/placeholder.png'"
      />
    </NuxtLink>
    <ProductPrice :item="product" />
  </div>
</template>

<script>
import ProductPrice from '@/components/Product/List/ProductListPrice'

export default {
  name: 'SimpeProduct',
  components: { ProductPrice },
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  min-height: 150px;

  &__name {
    color: #333333;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.5px;
    margin: 5px 0 5px;
  }
}
</style>
