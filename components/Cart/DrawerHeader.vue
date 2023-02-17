<template>
  <div :class="$style.header">
    <div :class="$style.headerInner">
      <CartIcon :class="$style.cartIcon" title="Cart" />
      <span :class="$style.title">
        {{ $t('common.cart') }}
      </span>
      <VolvButton
        :class="$style.close"
        icon
        type="button"
        @click.native="$store.commit('cart/TOGGLE_CART', false)"
      >
        <CloseIcon :class="$style.closeSvg" />
      </VolvButton>
    </div>
  </div>
</template>

<script>
import CartIcon from '@/icons/CartIcon'
import CloseIcon from '@/icons/CloseIcon'
import VolvButton from '@/components/Forms/Button'

export default {
  name: 'CartDrawerHeader',
  components: {
    VolvButton,
    CloseIcon,
    CartIcon
  }
}
</script>

<style lang="scss" module>
.header {
  padding: 0 $drawer-space-x;

  &__inner {
    border-bottom: 3px solid $gray-600;
    padding: rem-calc(20px 0);
    position: relative;
  }
}

.title {
  font-size: rem-calc(21px);
}

.cart-icon {
  fill: currentColor;
  height: rem-calc(28px);
  margin-right: rem-calc(18px);
  width: rem-calc(28px);
}

.close {
  border-radius: 0;
  border: 0;
  color: $gray-600;
  line-height: 1;
  padding: 0;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
