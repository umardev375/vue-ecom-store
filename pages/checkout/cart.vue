<template>
  <CheckoutWrapper empty-cart-text="Your cart is currently empty." title="Cart">
    <template #headerIcon>
      <CartIcon />
    </template>
    <template #default>
      <div :class="$style.content">
        <div :class="$style.tableContainer">
          <CartTable :items="items" />
        </div>

        <ThemeButton tag="NuxtLink" :to="localePath({ name: 'shop' })">
          {{ $t('Zurück zum Shop') }}
        </ThemeButton>
      </div>
    </template>

    <template #right>
      <CartTotal>
        <ThemeButton
          tag="NuxtLink"
          class="btn btn-block mt-3"
          :to="localePath({ name: 'checkout' })"
        >
          {{ $t('Weiter zum Bezahlvorgang') }}
        </ThemeButton>
      </CartTotal>
    </template>
  </CheckoutWrapper>
</template>

<script>
import CartTable from '@/components/Cart/Table/Base'
import CartIcon from '@/icons/CartIcon'

import CartTotal from '@/components/Checkout/Total'
import CheckoutWrapper from '@/components/Checkout/CheckoutWrapper'
import ThemeButton from '@/components/Forms/TheButton'
// Todo: maybe reload tab on page load
export default {
  name: 'CartPage',
  components: {
    ThemeButton,
    CartIcon,
    CartTotal,

    CheckoutWrapper,
    CartTable
  },
  head: {
    title: 'Cart'
  },
  computed: {
    items() {
      return this.$store.getters['cart/items']
    }
  }
}
</script>

<style lang="scss" module>
.content {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
}

.table-container {
  margin-bottom: rem-calc(74px);
  width: 100%;
}

.shop-btn {
  margin-bottom: $drawer-space-y;
  margin-top: rem-calc(60px);

  @include media-breakpoint-down(md) {
    margin-bottom: 0;
  }
}
</style>
