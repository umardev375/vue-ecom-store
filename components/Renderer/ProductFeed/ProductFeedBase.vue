<template>
  <div class="products">
    <div
      v-for="(productChunks, chunkIndex) in chunkedProducts"
      :key="chunkIndex"
      class="row"
    >
      <div
        v-for="productId in productChunks"
        :key="productId"
        :class="`col-md-${colSize}`"
      >
        <LazyProduct :product-id="productId"></LazyProduct>
      </div>
    </div>
  </div>
</template>

<script>
import widgetMixin from '@/components/Renderer/widgetMixin'
import chunk from 'lodash.chunk'
import LazyProduct from '@/components/Product/LazyProduct'
export default {
  name: 'ProductFeedBase',
  components: { LazyProduct },
  mixins: [widgetMixin],
  computed: {
    chunkedProducts() {
      return chunk(
        this.data.products?.value || [],
        this.settings?.itemsPerRow?.value || 4
      )
    },

    colSize() {
      return 12 / this.settings?.itemsPerRow?.value || 4
    }
  }
}
</script>

<style lang="scss" scoped></style>
