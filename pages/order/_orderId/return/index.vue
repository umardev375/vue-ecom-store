<template>
  <PageWrapper :title="title">
    <div v-if="hasOpenReturns" class="mb-4">
      <OrderReturnOrder
        v-for="returnOrder in order.returnOrders"
        :key="returnOrder.id"
        :return-order="returnOrder"
        :order-products="order.orderProducts"
      />
    </div>

    <template v-if="possibleCancelOrReturn && !isRefundend">
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
            <TheButton :is-loading="loading" color="danger" @click="cancelOrder"
              >Rücksendeprozess starten</TheButton
            >
          </div>
        </div>
        <div class="col-md-7 order-0">
          <OrderOverview :order="order" />
        </div>
      </div>
    </template>
    <template v-else>
      <OrderRefunded :order="order" />
    </template>
  </PageWrapper>
</template>

<script>
import PageWrapper from '@/components/core/PageWrapper'
import OrderRefunded from '@/components/Orders/OrderRefunded'
import OrderOverview from '@/components/Orders/OrderOverview'
import TheButton from '@/components/Forms/TheButton'
import OrderReturnOrder from '@/components/Orders/OrderReturnOrder'

export default {
  name: 'OrderReturnPage',
  components: {
    OrderReturnOrder,
    TheButton,
    OrderOverview,
    OrderRefunded,
    PageWrapper
  },
  middleware: ['auth'],
  async asyncData({ $axios, params }) {
    /**
     * 1. Order laden
     * 2. je nach Status komplett canceln oder zurücksenden
     */

    const { data: order } = await $axios.$get(`orders/${params.orderId}`, {
      params: {
        load: [
          'orderProducts.product',
          'returnOrders.returnProducts',
          'shipping'
        ]
      }
    })

    return { order }
  },
  data() {
    return {
      isCanceled: false,
      loading: false,
      order: {},
      orderCancelResult: {}
    }
  },
  computed: {
    hasOpenReturns() {
      if (this.order.returnOrders.length === 0) return false

      return this.order.returnOrders.some(
        (order) => order.editableStatus === 'OPEN'
      )

      //  return this.order.
    },

    openReturnOrder() {
      return this.order.returnOrders.filter(
        (order) => order.editableStatus === 'OPEN'
      )
    },

    title() {
      return `Artikel zurücksenden`
    },

    isRefundend() {
      return this.order.status === 'REFUNDED'
    },
    possibleCancelOrReturn() {
      return this.order.isCancelPossible
    }
  },
  methods: {
    async cancelOrder() {
      try {
        this.loading = true
        const { data: canceledOrder } = await this.$axios.$post(
          `orders/cancel`,
          {
            orderId: this.order.id
          },
          {
            params: {
              load: ['orderProducts.product', 'returnOrders', 'shipping']
            }
          }
        )
        this.order = canceledOrder
        this.$toast.success('Ihre Bestellung wurde erfolgreich storniert.')
      } catch (e) {
        this.$toast.error('Konnte Bestellung nicht stornieren')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
