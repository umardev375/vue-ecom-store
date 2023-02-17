<template>
  <ValidationObserver v-slot="{ valid }" slim>
    <CheckoutWrapper title="Payment">
      <template #headerIcon>
        <CartIcon />
      </template>
      <CheckoutGroup :title="$t('checkout.titles.choosePayment')">
        <PaymentMethods v-model="provider"></PaymentMethods>
      </CheckoutGroup>

      <CheckoutGroup>
        <CheckboxField
          v-model="differntAddressForBilling"
          :group="false"
          name="differentaddress"
          :label="$t('checkout.labels.differntAddressForBilling')"
          @input="setBillingAddress"
        />
        <CheckoutGroup
          v-if="differntAddressForBilling"
          :title="$t('checkout.titles.billingAddress')"
        >
          <AddressForm
            :create-new-address.sync="createAddress"
            :addresses="billingAddress"
            :path="addressPath"
          ></AddressForm>
        </CheckoutGroup>
      </CheckoutGroup>

      <template #afterContent>
        <CheckoutFooter>
          <CheckoutBackBtn :to="localePath({ name: 'checkout' })">
            {{ $t('checkout.buttons.backToShipping') }}
          </CheckoutBackBtn>

          <template #right>
            <button
              class="btn btn-primary"
              :class="{ 'is-loading': loading }"
              :disabled="!hasPaymentMethod || !valid"
              @click="procceed"
            >
              Weiter zur Übersicht
            </button>
          </template>
        </CheckoutFooter>
      </template>

      <template #right>
        <CartTotal></CartTotal>
      </template>
    </CheckoutWrapper>
  </ValidationObserver>
</template>

<script>
import CheckoutBackBtn from '@/components/Checkout/CheckoutBackBtn'
import CheckoutFooter from '@/components/Checkout/CheckoutFooter'
import CheckoutWrapper from '@/components/Checkout/CheckoutWrapper'
import CheckoutGroup from '@/components/Checkout/CheckoutGroup'
import CartTotal from '@/components/Checkout/Total'
import AddressForm from '@/components/Checkout/PresistAddressForm'
import CheckboxField from '@/components/Forms/CheckBoxField'
import CartIcon from '@/icons/CartIcon'
import { ValidationObserver } from 'vee-validate'
import PaymentMethods from '@/components/Payments/PaymentMethods'

export default {
  name: 'PaymentPage',
  components: {
    CartIcon,
    CheckoutBackBtn,
    CheckoutFooter,
    PaymentMethods,
    CheckboxField,
    AddressForm,
    CartTotal,
    CheckoutGroup,
    CheckoutWrapper,
    ValidationObserver
  },

  middleware({ store, redirect, app }) {
    const hasDeliveryAddress = store.state.checkout.deliveryAddress.id

    if (!hasDeliveryAddress) {
      return redirect(app.localePath('checkout'))
    }
  },

  data() {
    return {
      differntAddressForBilling: false,
      stripeSelectedCard: 'new',
      provider: '',
      createAddress: false,
      loading: false,
      allowNextStep: false,
      addressPath: 'invoiceAddress'
    }
  },

  computed: {
    deliveryAddress() {
      return this.$store.state.checkout.deliveryAddress
    },

    billingAddress() {
      return this.$store.getters['account/address/billing']
    },
    hasPaymentMethod() {
      return this.$store.state.checkout.hasPaymentMethod
    },

    // Current select method
    selectedPaymentMethod() {
      return this.$store.state.checkout.paymentMethod
    },

    customerStripeMethods() {
      return this.paymentMethods.filter((method) => method.type === 'stripe')
    },

    /* paymentMethods() {
     return this.$store.state.customer.paymentMethods
     }, */
    invoiceAddress() {
      return this.$store.state.checkout.invoiceAddress
    }
  },

  created() {
    if (!this.differntAddressForBilling)
      this.$store.commit('checkout/SET_ADDRESS', {
        path: 'invoiceAddress',
        address: this.deliveryAddress
      })
  },

  methods: {
    setBillingAddress(val) {
      if (val) {
        this.$store.commit('checkout/RESET_ADDRESS', 'invoiceAddress')
      } else {
        this.$store.commit('checkout/SET_ADDRESS', {
          path: 'invoiceAddress',
          address: this.deliveryAddress
        })
      }
    },

    // setPaymentMethod(type) {},
    async procceed() {
      this.loading = true

      try {
        if (this.createAddress) {
          await this.$store.dispatch('checkout/createAddressAndSet', {
            path: this.addressPath,
            address: this.invoiceAddress
          })
        }
        await this.$router.push(this.localePath({ name: 'checkout-summary' }))
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
