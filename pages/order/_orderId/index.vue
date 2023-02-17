<template>
  <PageWrapper title="Bestellübersicht">
    <div class="actions mb-2">
      <TheButton :is-loading="loading" @click="getInvoice"
        >Rechnung anzeigen</TheButton
      >
    </div>
    <OrderOverview :order="order" />
  </PageWrapper>
</template>

<script>
import OrderOverview from '@/components/Orders/OrderOverview'
import PageWrapper from '@/components/core/PageWrapper'
import TheButton from '@/components/Forms/TheButton'
export default {
  name: 'SingleOrder',
  components: { TheButton, PageWrapper, OrderOverview },
  middleware: ['auth'],
  async asyncData({ $axios, params }) {
    /**
     * 1. Order laden
     * 2. je nach Status komplett canceln oder zurücksenden
     */

    const { data: order } = await $axios.$get(`orders/${params.orderId}`, {
      params: {
        load: ['orderProducts.product', 'returnOrders']
      }
    })

    return { order }
  },

  data() {
    return {
      order: {},
      loading: false
    }
  },
  methods: {
    async getInvoice() {
      try {
        this.loading = true

        const { data: invoice } = await this.$axios.$post('orders/invoices', {
          orderId: this.order.id
        })
        window.open(invoice.url)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
