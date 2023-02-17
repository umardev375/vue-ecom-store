<template>
  <div :class="$style.footer">
    <div :class="$style.tableHolder">
      <CartSummaryTable />
    </div>

    <TheButton
      class="btn-block"
      color="secondary"
      tag="NuxtLink"
      :to="localePath({ name: 'checkout-cart' })"
    >
      {{ $t('Warenkorb bearbeiten') }}
    </TheButton>

    <TheButton
      class="btn-block"
      tag="NuxtLink"
      :to="localePath({ name: 'checkout' })"
    >
      {{ $t('checkout.buttons.goToPayment') }}
    </TheButton>
  </div>
</template>

<script>
import CartSummaryTable from '@/components/Cart/CartSummaryTable'
import TheButton from '@/components/Forms/TheButton'

export default {
  name: 'CartDrawerFooter',
  components: { TheButton, CartSummaryTable }
}
</script>

<style lang="scss" module>
.footer {
  padding: rem-calc(20px) $drawer-space rem-calc(30px);
}

.table-holder {
  border-bottom: 3px solid #808080;
  margin-bottom: rem-calc(30px);
  padding-bottom: rem-calc(20px);
}
</style>
