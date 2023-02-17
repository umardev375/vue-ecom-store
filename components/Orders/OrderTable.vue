<template>
  <div class="orders">
    <table class="table table-responsive">
      <thead>
        <tr>
          <th>
            {{ $t('Bestellnummer') }}
          </th>
          <th>
            {{ $t('Datum') }}
          </th>
          <th>{{ $t('Zahlungstatus') }}</th>
          <th>{{ $t('Bestellstatus') }}</th>
          <th>{{ $t('Aktionen') }}</th>
        </tr>
      </thead>
      <tbody v-if="orders.length > 0">
        <OrderRow
          v-for="order in orders"
          :key="order.id"
          :colspan="5"
          :order="order"
        >
          <template #action="{ orderId }">
            <NuxtLink
              :to="
                localePath({
                  name: 'order-orderId',
                  params: {
                    orderId
                  }
                })
              "
            >
              Ansehen
            </NuxtLink>

            <NuxtLink
              v-if="order.status === 'OPEN'"
              :to="
                localePath({
                  name: 'order-orderId-cancel',
                  params: {
                    orderId
                  }
                })
              "
              >Stornieren</NuxtLink
            >

            <NuxtLink
              v-else-if="order.status === 'SHIPPED'"
              :to="
                localePath({
                  name: 'order-orderId-return',
                  params: {
                    orderId: order.id
                  }
                })
              "
              >Zurückgegeben</NuxtLink
            >
          </template>
        </OrderRow>
      </tbody>

      <tbody v-else>
        <tr>
          <td colspan="5">
            {{ $t('Sie haben noch keine Bestellungen getätigt.') }}
          </td>
        </tr>
      </tbody>
    </table>
    <RoutePagination :meta="meta" />
  </div>
</template>

<script>
import RoutePagination from '@/components/Pagination/RoutePagination'
import OrderRow from '@/components/Orders/OrderRow'

export default {
  name: 'OrderTable',

  components: {
    OrderRow,
    RoutePagination
  },

  props: {
    orders: {
      type: Array,
      default: () => []
    },

    meta: {
      required: true,
      type: Object
    },

    loading: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      multi: false,
      openedOrder: '',
      openedOrders: []
    }
  },

  methods: {
    openOrder(id) {
      if (this.multi) {
        const currentIndex = this.openedOrders.indexOf(id)
        if (currentIndex > -1) {
          this.openedOrders.splice(currentIndex, 1)
        } else {
          this.openedOrders.push(id)
        }
      } else {
        this.openedOrder = id
      }
    },
    async cancelOrder(orderId) {
      try {
        const orderData = { orderId }
        await this.$axios.$post('orders/cancel', orderData)
      } catch (e) {
        console.log(e)
      }
    },
    async returnOrder(orderId) {
      try {
        const orderData = { orderId }
        await this.$axios.$post('orders/returns', orderData)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped />
