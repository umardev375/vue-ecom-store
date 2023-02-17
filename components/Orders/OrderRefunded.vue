<template>
  <div class="row">
    <div class="col-md-7 mb-2 order-1 order-md-0">
      <OrderOverview :order="order" />
    </div>
    <div class="col-md-5 order-0 order-md-1">
      <div class="order__info">
        <AlertBanner>Ihre Bestellung wurde erfolgreich storniert.</AlertBanner>
      </div>
    </div>
  </div>
</template>

<script>
import AlertBanner from '@/components/Alert'
import OrderOverview from '@/components/Orders/OrderOverview'
export default {
  name: 'OrderRefunded',
  components: { AlertBanner, OrderOverview },
  props: {
    order: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
