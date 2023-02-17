<template>
  <TheButton :is-loading="loading" type="button" @click="addToCart">
    Add To Cartgh
  </TheButton>
</template>

<script>
import TheButton from '@/components/Forms/TheButton'
export default {
  name: 'AddToCartButton',
  components: { TheButton },
  props: {
    product: {
      type: Object,
      required: true
    },

    quantity: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      loading: false
    }
  },

  methods: {
    async addToCart() {
      try {
        this.loading = true
        await this.$store.dispatch('cart/addItem', {
          product: this.product,
          quantity: this.quantity
        })

        await this.$store.dispatch('cart/getShipping')
      } catch (e) {
        console.error(e.repsonse)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
