<template>
  <div class="payment">
    <RadioList
      v-model="provider"
      name="Selected Payment"
      radio-items-center
      :options="providers"
      :rules="{ required: true }"
    >
      <template #label="{ option }">
        <PaymentImage
          :alt="option.label"
          :provider="option.value"
        ></PaymentImage>
      </template>

      <template #extra-stripe>
        <!-- Figure out why selectfield is lost focus wehen stipeCard field apears -->
        <div class="mt-5">
          <SelectField
            v-model="selectedStripeMethod"
            :options="selectCustomerStripmethods"
            name="selectCard"
            new="Neue Karte Hinzufügen"
            field-id="stripeCard"
            :rules="{ required: true }"
            placeholder="Neue Karte hinzufügen"
            label="Karte auswählen oder hinzufügen"
            @input="setStripeMethod"
          ></SelectField>
        </div>
      </template>
    </RadioList>
    <div
      v-if="
        provider === 'stripe' &&
        (customerStripeMethods.length === 0 || selectedStripeMethod === 'new')
      "
      class="mt-3"
    >
      <StripeCard
        ref="stripeCard"
        v-model="stripeComplete"
        :rules="{ required: true }"
        name="stripeCard"
        label="Karte"
      ></StripeCard>

      <button
        :disabled="loading"
        type="button"
        class="btn btn-primary mt-3"
        :class="{ 'is-loading': loading }"
        @click="createStripePaymentMethod"
      >
        Karte hinzufügen
      </button>
    </div>
    <div v-if="$auth.loggedIn" class="text-right">
      <NuxtLink
        :to="localePath({ name: 'account-payment' })"
        class="btn btn-link"
        >Zahlungsarten verwalten
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import RadioList from '@/components/Forms/RadioList'
import StripeCard from '@/components/Payments/StripeCard'
import SelectField from '@/components/Forms/SelectField'
import PaymentImage from '@/components/Payments/PaymentImage'

export default {
  name: 'PaymentMethods',

  components: {
    PaymentImage,
    SelectField,
    StripeCard,
    RadioList
  },

  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      stripeComplete: false,
      selectedStripeMethod: 'new',
      provider: this.value,
      loading: false,
      providers: [
        {
          label: 'Paypal',
          disabled: false,
          value: 'paypal',
          description: 'Paypal'
        },
        {
          label: 'Stripe',
          value: 'stripe',
          description: 'Kreditkarte / Debit'
        }
      ]
    }
  },

  async fetch() {
    await this.$store.dispatch('account/payment/fetch')
  },

  computed: {
    paymentMethods() {
      return this.$store.state.account.payment.methods
    },

    selectCustomerStripmethods() {
      return this.customerStripeMethods.map((method) => {
        return {
          id: method.id,
          title: `${method.brand} - ${method.last4}`
        }
      })
    },

    customerStripeMethods() {
      return this.paymentMethods.filter((method) => method.type === 'stripe')
    },
    customerPaypalMethods() {
      return this.paymentMethods.filter((method) => method.type === 'paypal')
    }
  },
  watch: {
    async provider(newVal) {
      if (newVal) {
        await this.providerChanged(newVal)
      }
    }
  },
  mounted() {
    this.$store.commit('checkout/SET_HAS_PAYMENT_METHOD', false)
  },
  methods: {
    async providerChanged(provider) {
      this.$emit('input', provider)
      if (provider === 'paypal') {
        if (this.customerPaypalMethods.length === 0) {
          // create paypal method

          await this.$store.dispatch('account/payment/createPaypalMethod')
        }
        // emit paypal
        this.emitMethod('paypal', this.customerPaypalMethods[0])

        // this.$emit() here we set the paymentMethod to Stripe
      } else if (provider === 'stripe') {
        // maybe we need to select the first stripe method

        if (this.customerStripeMethods.length !== 0) {
          this.selectedStripeMethod = this.customerStripeMethods[0].id

          this.emitMethod('stripe', this.customerStripeMethods[0])
        } else {
          this.$store.commit('checkout/SET_HAS_PAYMENT_METHOD', false)
        }
      }
    },

    async createStripePaymentMethod() {
      this.loading = true
      const { data: stripeIntent } = await this.$axios.$post(
        '/paymentmethods/stripe/intent'
      )

      this.$refs.stripeCard.submit(async ({ stripe, card, cardValidator }) => {
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: 'card',
          card
        })

        if (error) {
          // Error from createPaymentMethod
          this.loading = false
          cardValidator.setErrors([error.message])
          return
        }

        try {
          const clientSecret = stripeIntent.secret
          const paymentMethodFromStripe = paymentMethod.id

          const { error } = await stripe.confirmCardSetup(clientSecret, {
            payment_method: paymentMethodFromStripe
          })

          if (error) {
            this.loading = false
            cardValidator.setErrors([error.message])
            return
          }

          const { data: paymentMethodFromServer } = await this.$axios.$post(
            '/paymentmethods/stripe',
            {
              method: paymentMethod.id
            }
          )

          await this.$store.dispatch('account/payment/fetch')
          this.selectedStripeMethod = paymentMethodFromServer.id
          this.emitMethod('stripe', paymentMethodFromServer)
          card.clear()
        } catch (e) {
        } finally {
          this.loading = false
        }
      })
    },
    /**
     *
     * @param provider stripe/paypal
     * @param method the created method itself
     */
    emitMethod(provider, method) {
      try {
        this.$store.commit('checkout/CHANGE_PAYMENT_METHOD', {
          provider,
          method
        })

        this.$emit('method-changed', {
          provider,
          method
        })

        this.$store.commit('checkout/SET_HAS_PAYMENT_METHOD', true)
      } catch (e) {
        console.log(e)
      }
    },

    getStripeMethod(id) {
      return this.customerStripeMethods.find((method) => method.id === id)
    },

    setStripeMethod() {
      if (this.provider === 'stripe') {
        const stripeMethod = this.getStripeMethod(this.selectedStripeMethod)

        if (stripeMethod) {
          this.emitMethod('stripe', stripeMethod)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.manage-link {
  margin-top: 5px;
}
</style>
