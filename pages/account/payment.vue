<template>
  <ChildPageWrapper :loading="$fetchState.pending">
    <TwoColHeader :title="$t('Zahlungsmethoden')">
      Verwalten Sie ihre Bezahlmethoden
    </TwoColHeader>
    <PayPalInfoText
      :paypal="paypal"
      @default="setDefault"
      @delete="deleteMethod"
    />

    <AccountContentBox title="Kreditkarte Hinzufügen">
      <StripeCard ref="stripeCard" v-model="stripeComplete" name="creditcard" />

      <ThemeButton :is-loading="loading" @click="createStripePaymentMethod"
        >Hinzufügen</ThemeButton
      >
    </AccountContentBox>
    <AccountContentBox title="Vorhanden Kreditkarten">
      <table class="table">
        <thead>
          <tr>
            <th>{{ $t('Kartentyp') }}</th>
            <th>{{ $t('Endziffern') }}</th>
            <th>{{ $t('Brand') }}</th>
            <th>{{ $t('Aktionen') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="method in stripeMethods" :key="method.id">
            <td>
              <PaymentIcons :brand="method.brand"></PaymentIcons>
            </td>
            <td>
              {{ method.last4 }}
            </td>
            <td>{{ method.brand }}</td>
            <td>
              <ThemeButton
                class="btn-sm"
                color="danger"
                @click="deleteMethod(method.id)"
                >{{ $t('Entfernen') }}</ThemeButton
              >
              <ThemeButton
                v-if="!method.default"
                class="btn-sm"
                color="primary"
                @click="setDefault(method.id)"
                >{{ $t('Als Standard setzten') }}</ThemeButton
              >
            </td>
          </tr>
        </tbody>
      </table>
    </AccountContentBox>
  </ChildPageWrapper>
</template>

<script>
import TwoColHeader from '@/components/TwoColHeader'
import ThemeButton from '@/components/Forms/TheButton'
import PaymentIcons from '@/components/Payments/PaymentIcons'
import StripeCard from '@/components/Payments/StripeCard'
import AccountContentBox from '@/components/Account/AccountContentBox'
import PayPalInfoText from '@/components/Account/PayPalInfoText'
import ChildPageWrapper from '@/components/core/LoadingWrapper'

export default {
  name: 'WalletPayment',
  components: {
    ChildPageWrapper,
    PayPalInfoText,
    AccountContentBox,
    StripeCard,
    PaymentIcons,
    ThemeButton,

    TwoColHeader
  },

  data() {
    return {
      stripeComplete: false,
      loading: false
    }
  },
  async fetch() {
    await this.$store.dispatch('account/payment/fetch')
  },

  computed: {
    stripeMethods() {
      return this.$store.getters['account/payment/stripe']
    },
    allMethods() {
      return this.$store.state.account.payment.methods
    },

    paypal() {
      return this.$store.getters['account/payment/papyal']
    }
  },
  methods: {
    async deleteMethod(methodId) {
      await this.$store.dispatch(
        'account/payment/removePaymentMethod',
        methodId
      )
    },
    async setDefault(id) {
      await this.$store.dispatch('account/payment/setDefault', id)
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

          await this.$axios.$post('/paymentmethods/stripe', {
            method: paymentMethod.id
          })

          await this.$store.dispatch('account/payment/fetch')

          card.clear()
        } catch (e) {
        } finally {
          this.loading = false
        }
      })
    }
  }
}
</script>
