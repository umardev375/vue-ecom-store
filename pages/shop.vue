<template>
  <PageWrapper title="Shop">
    <template v-if="categories.length !== 0" #aside>
      <CategoryMain />
    </template>
    <NuxtChild />
  </PageWrapper>
</template>

<script>
import PageWrapper from '@/components/core/PageWrapper'
import CategoryMain from '@/components/Category/CategoryMain'

export default {
  name: 'ShopPage',
  components: {
    PageWrapper,
    CategoryMain
  },
  computed: {
    categories() {
      return this.$store.getters['category/noEmpty']
    }
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
