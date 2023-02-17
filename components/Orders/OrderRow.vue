<template>
  <tr>
    <td>
      <strong>{{ order.shortId }}</strong>
    </td>
    <td>{{ order.date }}</td>
    <td>{{ order.paymentStatus || '-' }}</td>
    <td>
      <OrderStatusIndicator :status="order.status" />
    </td>
    <td><slot name="action" :orderId="order.id" /></td>
  </tr>
</template>

<script>
import OrderStatusIndicator from '@/components/Orders/OrderStatusIndicator'
export default {
  name: 'OrderRow',

  components: {
    OrderStatusIndicator
  },

  props: {
    order: {
      type: Object,
      default: () => {}
    },

    colspan: {
      required: true,
      type: Number
    }
  },

  computed: {}
}
</script>

<style lang="scss" scoped></style>
