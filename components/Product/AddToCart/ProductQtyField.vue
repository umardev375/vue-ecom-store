<template>
  <div :class="$style.el">
    <ProductQty ref="qty" v-model="quantity" :class="$style.qty" />
    <TheButton
      :disabled="loading || disable"
      :is-loading="loading"
      color="success"
      :class="[$style.btn]"
      @click="addToCart"
    >
      In den Warenkorb
    </TheButton>
  </div>
</template>

<script>
import TheButton from '@/components/Forms/TheButton'
import ProductQty from '~/components/Product/AddToCart/ProductQty'
export default {
  name: 'ProductQtyField',
  components: { TheButton, ProductQty },
  props: {
    product: {
      type: Object,
      required: true
    },

    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      quantity: 1,
      loading: false
    }
  },
  methods: {
    async addToCart() {
      try {
        // this.isLoading = true
        this.loading = true
        await this.$store.dispatch('cart/addItem', {
          product: this.product,
          quantity: this.quantity
        })
        this.$toast.success(
          this.$t('Produkt wurde zu Ihrem Warenkorb hinzugefügt.')
        )
        this.quantity = 1
        this.$refs.qty.reset()
        this.$store.commit('cart/TOGGLE_CART', true)
      } catch (e) {
        console.error(e.response)
      } finally {
        this.loading = false
      }
    }
  }
  // components: { ProductQtyDesign }
}
</script>

<style lang="scss" module>
.el {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: rem-calc(0 -13px -26px);
}

.qty {
  margin: rem-calc(0 13px 26px);
  flex-shrink: 0;
}

.btn {
  flex-grow: 1;
  flex-shrink: 1;
  margin: rem-calc(0 13px 26px);
  max-width: rem-calc(264px);
  min-width: fit-content;
}
</style>
