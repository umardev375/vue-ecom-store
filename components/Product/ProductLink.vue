<template>
  <NuxtLink :title="title" :to="url">
    <slot></slot>
  </NuxtLink>
</template>

<script>
export default {
  // Todo: Add Category prefix when its possible
  name: 'ProductLink',
  props: {
    title: {
      required: true,
      type: String
    },
    slug: {
      required: true,
      type: String
    },

    customUrl: {
      type: Object,
      default: null
    }
  },

  computed: {
    url() {
      return (
        this.customUrl ??
        this.localePath({
          name: 'product-slug',
          params: { slug: this.slug }
        })
      )
      /*
      const categorySlug = this.$route.params.category
      if (categorySlug && categorySlug !== 'shop') {
        return this.localePath({
          name: 'product-in-category',
          params: { category: categorySlug, slug: this.product.slug }
        })
      } else {
      } */
    }
  }
}
</script>

<style lang="scss" module></style>
