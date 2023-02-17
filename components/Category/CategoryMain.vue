<template>
  <CategoryTabs>
    <CategoryTab title="All">
      <CategoryNav :items="categories"></CategoryNav>
    </CategoryTab>
  </CategoryTabs>
</template>

<script>
import CategoryTabs from '@/components/Category/CategoryTabs'
import CategoryTab from '@/components/Category/CategoryTab'
import CategoryNav from '@/components/Category/CategoryNav'

export default {
  name: 'CategoryMain',
  components: {
    CategoryNav,
    CategoryTab,
    CategoryTabs
  },

  // We fetch it all time
  async fetch() {
    await this.$store.dispatch('category/fetchAll')
  },

  computed: {
    categories() {
      return this.$store.state.category.categories
    }
  }
}
</script>

<style lang="scss" scoped></style>
