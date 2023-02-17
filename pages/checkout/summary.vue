<template>
  <CheckoutWrapper title="Summary">
    <template #headerIcon>
      <CartIcon />
    </template>
    <template #default>
      <!--<h3 :class="$style.title">Order Number: 5874</h3>-->
      <CheckoutGroup :title="$t('Rechnungsadresse')" mb-sm>
        <AddressDisplay :address="invoiceAddress"></AddressDisplay>
      </CheckoutGroup>

      <CheckoutGroup :title="$t('Lieferadresse')" mb-sm>
        <AddressDisplay :address="deliveryAddress"></AddressDisplay>
      </CheckoutGroup>

      <CheckoutGroup :title="$t('Bezahlmethode')" mb-sm>
        <template v-if="paymentMethod.provider === 'stripe'"
          >Kreditkarte / Debit</template
        >
        <template v-else>Papyal</template>
      </CheckoutGroup>
    </template>

    <template #right>
      <CartTotal></CartTotal>

      <TheButton
        color="dark"
        :class="['btn btn-dark btn-block mt-4', $style.btn]"
        :is-loading="loading"
        @click="createOrder"
      >
        Kostenpflichtig bestellen
      </TheButton>
    </template>
  </CheckoutWrapper>
</template>

<script>
import CheckoutWrapper from '@/components/Checkout/CheckoutWrapper'
import CartTotal from '@/components/Checkout/Total'
import CheckoutGroup from '@/components/Checkout/CheckoutGroup'
import AddressDisplay from '@/components/Address/AddressDisplay'
import CartIcon from '@/icons/CartIcon'
import TheButton from '@/components/Forms/TheButton'
// import { loadStripe } from '@stripe/stripe-js'

export default {
  name: 'CheckoutSummaryPage',
  components: {
    TheButton,
    CartIcon,
    AddressDisplay,
    CheckoutGroup,
    CartTotal,
    CheckoutWrapper
  },
  middleware({ store, redirect, app }) {
    // Todo: Check payment is selected

    const checkoutState = store.state.checkout

    const hasDeliveryAddress = checkoutState.deliveryAddress.id
    const hasInvoiceAddress = checkoutState.invoiceAddress.id
    const hasPaymentMethod = checkoutState.hasPaymentMethod
    if (!hasDeliveryAddress || !hasInvoiceAddress) {
      return redirect(app.localePath('checkout'))
    } else if (!hasPaymentMethod) {
      return redirect(app.localePath('checkout-payment'))
    }
  },

  data() {
    return {
      loading: false
    }
  },
  computed: {
    deliveryAddress() {
      return this.$store.state.checkout.deliveryAddress
    },

    invoiceAddress() {
      return this.$store.state.checkout.invoiceAddress
    },

    cart() {
      return this.$store.state.cart.cart
    },

    paymentMethod() {
      return this.$store.state.checkout.paymentMethod
    },
    preSale() {
      return this.$store.getters['cart/preSale']
    }
  },
  methods: {
    async createOrder() {
      const provider = this.paymentMethod.provider
      const methodId = this.paymentMethod.method.id

      const successRoute = this.localePath({
        name: 'checkout-thank-you',
        query: { type: provider }
      })
      const cancelRoute = this.localePath({ name: 'cancelled' })

      const orderData = {
        customerId: this.$auth.user.customer.id,
        cartId: this.cart.id,
        deliveryAddressId: this.deliveryAddress.id,
        billingAddressId: this.invoiceAddress.id,
        paymentMethodId: methodId,
        preSale: this.preSale
      }
      if (provider === 'paypal') {
        const successUrl = `${location.origin}${successRoute}`
        const cancelUrl = `${location.origin}${cancelRoute}`

        orderData.successUrl = successUrl
        orderData.cancelUrl = cancelUrl
        try {
          this.loading = true
          const { data: newOrder } = await this.$axios.$post(
            'orders',
            orderData
          )
          this.$storage.setUniversal('last_order', newOrder)

          window.location = newOrder.paymentUrl
        } catch (e) {
          console.log(e)
        }
      } else if (provider === 'stripe') {
        try {
          this.loading = true
          const { data: order } = await this.$axios.$post('orders', orderData)

          if (order.stripeSecret) {
            try {
              await this.$stripe({
                stripeAccount: this.$store.state.shop.current.stripeId
              }).confirmCardPayment(order.stripeSecret)
            } catch (e) {
              console.log('Stripe Error', e)
            }
          }

          await this.$router.replace(
            this.localePath({
              name: 'checkout-thank-you',
              query: {
                type: 'stripe',
                orderId: order.id
              }
            })
          )
        } catch (e) {
          console.error(e.response)
        } finally {
          this.loading = false
        }
      }
    }
  }
}
</script>

<style lang="scss" module>
.title {
  border-bottom: 3px solid $gray-600;
  font-size: rem-calc(15px);
  font-weight: 700;
  line-height: (23 / 15);
  margin-bottom: rem-calc(34px);
  padding-bottom: rem-calc(20px);
}

.btn {
  padding-bottom: rem-calc(20px);
  padding-top: rem-calc(20px);
}
</style>
