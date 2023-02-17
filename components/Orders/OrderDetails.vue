<template>
  <div class="row">
    <div class="col-md-12 my-2">
      <h3>Bestelldetails</h3>
      <hr />
    </div>

    <div class="col-md-7">
      <table class="table">
        <tr>
          <th>Bestelldatum:</th>
          <td>{{ order.date }}</td>
        </tr>
        <tr>
          <th>Bestellnummer:</th>
          <td>{{ order.shortId }}</td>
        </tr>
        <tr>
          <th>Zahlungsart:</th>
          <td>
            <PaymentImage
              v-if="orderType === 'paypal'"
              :provider="orderType"
              :payment="order.payment"
            />
            <span v-else>Creditcard / Debit </span>
          </td>
        </tr>
        <tr>
          <th>Status:</th>
          <td>
            <OrderStatusIndicator :status="order.status" />
          </td>
        </tr>
      </table>
    </div>
    <div class="col-md-5">
      <table class="table">
        <tbody>
          <tr>
            <th>Versandkosten:</th>
            <td class="text-right">{{ order.shippingCost.formatted }}</td>
          </tr>
          <tr>
            <th>Gesamsumme:</th>
            <td class="font-weight-bold text-right">
              {{ order.totalCost.formatted }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PaymentImage from '@/components/Payments/PaymentImage'
import OrderStatusIndicator from '@/components/Orders/OrderStatusIndicator'
export default {
  name: 'OrderDetails',
  components: { OrderStatusIndicator, PaymentImage },
  props: {
    order: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  computed: {
    orderType() {
      return this.order?.payment?.type ?? '-'
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  th,
  td {
    vertical-align: middle;
  }
  th:first-of-type,
  td:first-of-type {
    border-top: 0 !important;
  }
}
</style>
