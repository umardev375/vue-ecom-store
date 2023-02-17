<template>
  <TheButton class="bag__button" type="button" @click="toggleCart">
    <CartIcon class="bag__icon" :title="$t('Cart')" @click="toggleCart" />
    <span v-if="itemCount > 0" class="bag__count"> {{ itemCount }}</span>
  </TheButton>
</template>

<script>
import CartIcon from '@/icons/ShoppingCartIcon'
import TheButton from '@/components/Forms/TheButton'

export default {
  name: 'CartBag',
  components: { TheButton, CartIcon },
  computed: {
    itemCount() {
      return this.$store.getters['cart/itemCount']
    },
    cartIsOpen() {
      return this.$store.state.cart.open
    }
  },

  methods: {
    toggleCart() {
      const toggle = !this.cartIsOpen
      this.$store.commit('cart/TOGGLE_CART', toggle)
    }
  }
}
</script>

<style lang="scss" scoped>
.bag {
  &__button {
    position: relative;
    color: white;
    display: inline;
    fill: white;
  }
  &__icon {
    height: rem-calc(20px);
    width: rem-calc(20px);
  }

  &__count {
    position: absolute;
    top: -5px;
    right: -5px;
    font-size: rem-calc(13px);
    background: var(--theme-danger-color);
    font-weight: 400;
    color: white;
    padding: 1px 5px;
    border-radius: 4px;
  }
}
</style>
