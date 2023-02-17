<template>
  <PageWrapper :loading="$fetchState.pending">
    <template #head>
      <PageHeader title="Thank you">
        <CheckCircleIcon slot="icon" />
      </PageHeader>
    </template>

    <OrderOverview
      v-if="!$fetchState.pending"
      class="mb-4"
      :order="order"
    ></OrderOverview>
    <Spinner v-else />
    <NuxtLink :to="localePath({ name: 'shop' })" class="btn btn-primary"
      >Zurück zum Shop
    </NuxtLink>
  </PageWrapper>
</template>

<script>
import CheckCircleIcon from '@/icons/CheckCircleIcon'
import PageWrapper from '@/components/core/PageWrapper'

import PageHeader from '@/components/Common/PageHeader'
import Spinner from '@/components/Common/Spinner'
import OrderOverview from '~/components/Orders/OrderOverview'

export default {
  name: 'CheckoutThankYou',
  components: {
    Spinner,
    PageHeader,
    CheckCircleIcon,
    PageWrapper,
    OrderOverview
  },

  middleware: ['auth'],
  data() {
    return {
      orderId: '',
      order: {}
    }
  },

  async fetch() {
    const type = this.$route.query.type
    this.orderId = this.$route.query.orderId

    if (type === 'paypal') {
      const payerId = this.$route.query.PayerID
      const lastOrder = this.$storage.getUniversal('last_order')
      const orderId = lastOrder?.id
      const token = this.$route.query.token

      try {
        await this.chargeFromPaypal(payerId, token, orderId)
      } catch (e) {
        // Handle Paypal Error
      } finally {
        this.orderId = orderId
        //  await this.$storage.removeUniversal('last_order')
      }
    }

    const load = ['orderProducts.product', 'shipping.country']
    const { data: order } = await this.$axios.$get(`orders/${this.orderId}`, {
      params: {
        load
      }
    })
    this.order = order

    if (this.$auth.hasScope('ghost')) {
      await this.$auth.logout()
    }
    this.$plausible.trackEvent('ORDER::CREATED')
    // Get a new Cart
    await this.$store.dispatch('cart/initalize')
  },
  methods: {
    chargeFromPaypal(payerId, token, orderId) {
      return this.$axios.$post(
        'paypal/charge',
        {
          payerId,
          token,
          orderId
        },
        { params: { load: ['orderProducts'] } }
      )
    }
  }
}
</script>

<style lang="scss" module>
.container {
  padding-bottom: $container-space-y;
  padding-top: $container-space-y;
}

.title {
  border-bottom: 3px solid $gray-600;
  font-size: rem-calc(15px);
  font-weight: 700;
  line-height: (23 / 15);
  margin-bottom: rem-calc(32px);
  padding-bottom: rem-calc(20px);
}

.text {
  font-size: rem-calc(15px);
  font-weight: 700;
  line-height: (23 / 15);
  margin-bottom: rem-calc(38px);

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
