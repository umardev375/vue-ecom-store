<template>
  <PageWrapper :loading="$fetchState.pending" :title="category.title">
    <template #aside>
      <CategoryMain />
    </template>

    <ProductListBase :products="products" />
    <RoutePagination :meta="productsMeta" />
  </PageWrapper>
</template>

<script>
import PageWrapper from '@/components/core/PageWrapper'
import CategoryMain from '@/components/Category/CategoryMain'
import ProductListBase from '@/components/Product/List/ProductListBase'
import RoutePagination from '@/components/Pagination/RoutePagination'
// import Spinner from '@/components/Common/Spinner'

export default {
  name: 'CategoryPage',
  components: {
    PageWrapper,
    CategoryMain,
    RoutePagination,
    ProductListBase
  },

  async validate({ params, store }) {
    await store.dispatch('category/fetchAll')

    return store.state.category.categories.some(
      (category) => category.slug === params.category
    )
  },

  async fetch() {
    const query = this.$route.query
    const categorySlug = this.$route.params.category

    try {
      await this.$store.dispatch('products/fetchAll', {
        categorySlug,
        ...query
      })
    } catch (e) {
      console.log(e)
    }
  },

  computed: {
    categories() {
      return this.$store.getters['category/noEmpty']
    },

    category() {
      const slug = this.$route.params.category
      return this.categories.find((cat) => cat.slug === slug)
    },
    products() {
      return this.$store.state.products.all
    },
    productsMeta() {
      return this.$store.state.products.meta
    }
  },
  watch: {
    '$route.query': '$fetch'
  }
}
</script>

<style lang="scss" module>
.content {
  padding-bottom: rem-calc(66px);
  padding-top: rem-calc(66px);
}

.aside {
  width: rem-calc(248px);

  @include media-breakpoint-down(md) {
    margin-bottom: $grid-gutter-width;
  }
}

.col {
  @include media-breakpoint-down(xxs) {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
