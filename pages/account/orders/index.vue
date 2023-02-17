<template>
  <ChildPageWrapper :loading="$fetchState.pending">
    <TwoColHeader :title="$t('Bestellungen')">
      {{ $t('Übersicht Ihrer getätigten Bestellungen') }}
    </TwoColHeader>

    <OrderTable :meta="meta" :orders="orders" />
  </ChildPageWrapper>
</template>

<script>
import TwoColHeader from '@/components/TwoColHeader'
import OrderTable from '@/components/Orders/OrderTable'
import ChildPageWrapper from '@/components/core/LoadingWrapper'

export default {
  name: 'OrderPage',
  components: { ChildPageWrapper, OrderTable, TwoColHeader },
  middleware: ['auth'],

  async fetch() {
    const query = this.$route.query
    await this.$store.dispatch('account/order/fetch', query)
  },

  computed: {
    orders() {
      return this.$store.state.account.order.all
    },

    meta() {
      return this.$store.state.account.order.meta
    }
  },

  watch: {
    '$route.query': '$fetch'
  }
}
</script>

<style lang="scss" scoped></style>
