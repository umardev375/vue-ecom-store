<template>
  <div class="div">
    <!--  <div class="mb-4">
      <BackToOrders />
    </div> -->
    <div class="order p-4">
      <h3 class="mb-2">Ihre Bestellung</h3>
      <hr />
      <div class="table-responsive-sm">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Artikel</th>
              <th>Anzahl</th>
              <th>Stückpreis</th>
              <th>Summe</th>
            </tr>
          </thead>
          <tbody
            v-for="orderProduct in orderedProducts"
            :key="orderProduct.key"
          >
            <tr>
              <td>{{ orderProduct.product.title }}</td>
              <td>{{ orderProduct.amount }}</td>
              <td>{{ orderProduct.grossPrice.formatted }}</td>
              <td>{{ orderProduct.totalGrossPrice.formatted }}</td>
            </tr>
          </tbody>
        </table>

        <OrderDetails :order="order" />
      </div>
    </div>
  </div>
</template>

<script>
import OrderDetails from '@/components/Orders/OrderDetails'
import BackToOrders from '@/components/Orders/BackToOrders'

export default {
  name: 'OrderOverview',
  components: {
    BackToOrders,
    // HeadNavigation,
    OrderDetails
  },

  props: {
    order: {
      type: Object,
      required: true
    }
  },

  async fetch() {
    // .log('fetch')
  },
  computed: {
    orderedProducts() {
      return this.order.orderProducts
    }
  }
}
</script>

<style lang="scss" scoped>
.table tr th {
  border-top: none;
}

.order {
  background: #f5f5f5;
}
</style>
