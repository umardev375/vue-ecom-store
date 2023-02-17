<template>
  <NuxtLink v-if="linkType !== 'LABEL'" :to="makePath()">{{ label }}</NuxtLink>
  <component :is="label" v-else></component>
</template>

<script>
export default {
  name: 'MenuLink',

  props: {
    labelTag: {
      type: String,
      default: 'span'
    },

    slug: {
      required: true,
      type: String
    },

    label: {
      required: true,
      type: String
    },

    linkType: {
      required: true,
      type: String
    }
  },

  methods: {
    makePath() {
      let path = {}

      switch (this.linkType) {
        case 'PAGE':
          path = {
            name: 'slug',
            params: {
              slug: this.slug
            }
          }
          break
        case 'CATEGORY':
          path = {
            name: 'collection-category',
            params: { category: this.slug }
          }
          break
      }
      return this.localePath(path)
    }
  }
}
</script>

<style lang="scss" scoped></style>
