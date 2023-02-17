<template>
  <div :class="[$style.drawer, { [$style.drawerOpen]: cartIsOpen }]">
    <CartDrawerHeader :class="$style.header" />
    <div :class="$style.body">
      <template v-if="!emptyCart">
        <MiniCartItem v-for="item in items" :key="item.id" :item="item" />
      </template>
      <div v-else :class="$style.empty">
        <p>{{ $t('checkout.infos.emptyCartAlt') }}</p>
      </div>
    </div>
    <CartDrawerFooter v-if="!emptyCart" :class="$style.footer" />
  </div>
</template>

<script>
import MiniCartItem from '@/components/Cart/MiniCartItem'
import CartDrawerHeader from '@/components/Cart/DrawerHeader'
import CartDrawerFooter from '@/components/Cart/DrawerFooter'

export default {
  name: 'CartDrawer',
  components: {
    CartDrawerFooter,
    CartDrawerHeader,
    MiniCartItem
  },

  computed: {
    cartIsOpen() {
      return this.$store.state.cart.open
    },
    items() {
      return this.$store.getters['cart/items']
    },
    emptyCart() {
      return !(this.items && this.items.length > 0)
    }
  }
}
</script>

<style lang="scss" module>
//Todo: z-index management

.drawer {
  background: $white;
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 90%;
  position: fixed;
  right: 0;
  top: 0;
  transform: translate3d($drawer-width, 0px, 0px);
  transition: transform ease-in 0.5s;
  width: $drawer-width;
  z-index: z('cart');

  &--open {
    transform: translate3d(0px, 0px, 0px);
  }
}

.header {
  flex-shrink: 0;
}

.body {
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  padding: 0 $drawer-space-x;
}

.footer {
  flex-shrink: 0;
}

.empty {
  font-size: rem-calc(15px);
  line-height: (23 / 15);
  padding: $drawer-space-y 0;
  text-align: left;

  p {
    margin-bottom: 0;
  }
}
</style>
