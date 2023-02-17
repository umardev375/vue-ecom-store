<template>
  <PageWrapper :title="title">
    <OrderRefunded v-if="isRefundend" :order="order" />

    <div v-else class="row">
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
            >Sendung jetzt stornieren</TheButton
          >
        </div>
      </div>
      <div class="col-md-7 order-0">
        <OrderOverview :order="order" />
      </div>
    </div>
  </PageWrapper>
</template>

<script>
import PageWrapper from '@/components/core/PageWrapper'

import OrderRefunded from '@/components/Orders/OrderRefunded'
import OrderOverview from '@/components/Orders/OrderOverview'
import TheButton from '@/components/Forms/TheButton'

export default {
  name: 'OrderCancelPage',
  components: { TheButton, OrderOverview, OrderRefunded, PageWrapper },
  middleware: ['auth'],
  async asyncData({ $axios, params, redirect, app }) {
    /**
     * 1. Order laden
     * 2. je nach Status komplett canceln oder zurücksenden
     */

    const { data: order } = await $axios.$get(`orders/${params.orderId}`, {
      params: {
        load: ['orderProducts.product', 'returnOrders', 'shipping']
      }
    })

    if (order.status === 'SHIPPED') {
      return redirect(
        app.localePath({
          name: 'order-orderId-return',
          params: { orderId: params.orderId }
        })
      )
    }
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
    title() {
      return `Bestellung stornieren`
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
