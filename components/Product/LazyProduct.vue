<template>
  <div v-observe-visibility="{ callback: startLoading, once: true }">
    <div v-if="isLoading" :class="$style.holder">
      <Spinner />
    </div>
    <div v-else-if="error"></div>
    <div v-else>
      <ProductListItem v-if="product" :product="product" />
    </div>
  </div>
</template>

<script>
import { ObserveVisibility } from 'vue-observe-visibility'
import Spinner from '@/components/Common/Spinner'

import ProductListItem from '@/components/Product/List/ProductListItem'

export default {
  name: 'LazyProduct',
  components: { ProductListItem, Spinner },
  directives: {
    'observe-visibility': ObserveVisibility
  },
  props: {
    productId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: true,
      product: {},
      error: false
    }
  },
  methods: {
    async startLoading(isVisible) {
      /* setTimeout(() => {
        this.isLoading = false
      }, 2000)
*/

      try {
        const { data: product } = await this.$axios.$get(
          `products/${this.productId}`,
          {
            params: { load: ['categories', 'media'] }
          }
        )
        this.product = product
      } catch (e) {
        this.$emit('product-not-found', this.productId) // Todo: we need a better way
        this.error = true
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
<style lang="scss" module>
.holder {
  padding-bottom: 100%;
  position: relative;
  text-align: center;
}
</style>
