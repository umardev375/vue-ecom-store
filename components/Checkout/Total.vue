<template>
  <div v-if="total" :class="$style.el">
    <h3 :class="[$style.title, 'd-flex align-items-center']">
      <CartIcon :class="$style.cartIcon" title="Cart" />
      {{ $t('Zusammenfassung') }}
    </h3>
    <div :class="$style.itemsContainer">
      <div :class="$style.items">
        <MiniCartItem
          v-for="item in cartItems"
          :key="item.id"
          summary
          :item="item"
        />
      </div>
    </div>
    <div :class="$style.tableContainer">
      <CartSummaryTable />
    </div>
    <slot></slot>
  </div>
</template>

<script>
import CartSummaryTable from '@/components/Cart/CartSummaryTable'
import MiniCartItem from '@/components/Cart/MiniCartItem'
import CartIcon from '@/icons/CartIcon'

export default {
  name: 'CartTotal',
  components: {
    CartIcon,
    CartSummaryTable,
    MiniCartItem
  },
  props: {
    showCartItems: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cartItems() {
      return this.$store.getters['cart/items']
    },

    total() {
      return this.$store.getters['cart/total']
    }
  }
}
</script>

<style lang="scss" module>
.el {
  background: var(--theme-primary-color);
  color: white;
  border-radius: rem-calc(4px);
  // margin-bottom: rem-calc(23px);
  padding: $drawer-space-y $drawer-space-x;
}

.title {
  border-bottom: 3px solid rgba(white, 0.5);
  font-size: rem-calc(21px);
  margin: 0;
  padding: rem-calc(0 0 20px);
}

.cart-icon {
  fill: currentColor;
  height: rem-calc(28px);
  margin-right: rem-calc(18px);
  width: rem-calc(28px);
}

.items-container {
  margin-bottom: rem-calc(10px);
  overflow: hidden;
}

.items {
  margin-bottom: -2px;
}

.table-container {
  padding: rem-calc(30px 0 0);
}
</style>
