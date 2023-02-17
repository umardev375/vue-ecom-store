<template>
  <div v-if="!$fetchState.pending">
    <div v-if="products.length">
      <CategoryHero
        v-if="randomCategory"
        :category-slug="randomCategory.slug"
        :title="randomCategory.title"
        >{{ randomCategory.description }}</CategoryHero
      >
      <ProductListBase :products="products" />
      <RoutePagination :meta="productsMeta" />
    </div>
    <div v-else><h3>Keine Produkte gefunden</h3></div>
  </div>

  <div v-else>
    <Spinner />
  </div>
</template>

<script>
import ProductListBase from '@/components/Product/List/ProductListBase'
import RoutePagination from '@/components/Pagination/RoutePagination'
import Spinner from '@/components/Common/Spinner'
import CategoryHero from '@/components/Category/CategoryHero'

export default {
  name: 'ShopIndexPage',
  components: { CategoryHero, RoutePagination, ProductListBase, Spinner },
  async fetch() {
    const query = this.$route.query
    await this.$store.dispatch('products/fetchAll', {
      ...query,
      load: ['media']
    })

    await this.$store.dispatch('category/fetchAll')

    /*
    if (this.products.length === 0) {
      this.$nuxt.error({ statusCode: 404, message: 'No Products Found' })
    } */
  },

  computed: {
    products() {
      return this.$store.state.products.all
    },
    randomCategory() {
      return this.$store.getters['category/random']
    },
    productsMeta() {
      return this.$store.state.products.meta
    }
  },
  watch: {
    '$route.query.page': '$fetch'
  }
}
</script>

<style lang="scss" scoped />
