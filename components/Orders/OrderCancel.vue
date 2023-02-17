<template>
  <div class="row">
    <div class="col-md-5 order-1 mb-2">
      <div class="d-flex flex-wrap justify-content-between mb-2">
        <div class="order__info">
          <p>
            Sie können die Bestellung noch bis zu dem:
            <strong> {{ order.lastCancelAt }} </strong> storniere.
          </p>
          <p>Dieser Vorgang kann nicht rückgängig gemacht werden.</p>
        </div>
        <TheButton color="danger" @click="cancelOrder"
          >Sendung jetzt stornieren</TheButton
        >
      </div>
    </div>
    <div class="col-md-7 order-0">
      <OrderOverview :order="order"></OrderOverview>
    </div>
  </div>
</template>

<script>
import OrderDetails from '@/components/Orders/OrderDetails'
import OrderOverview from '@/components/Orders/OrderOverview'
import TheButton from '@/components/Forms/TheButton'
export default {
  name: 'OrderCancel',
  components: { TheButton, OrderOverview, OrderDetails },
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
