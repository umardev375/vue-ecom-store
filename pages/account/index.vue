<template>
  <ChildPageWrapper :loading="$fetchState.pending">
    <!-- Todo: Styling -->
    <div class="row">
      <div class="col">
        <TwoColHeader
          :title="`Willkommen, ${$auth.user.name} ${$auth.user.lastname}`"
        >
          Dies ist Ihr Konto Dashboard, wo Sie die Möglichkeit haben, Ihre
          letzten Kontoaktivitäten einzusehe
        </TwoColHeader>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <AccountContentBox :title="$t('Persönliche Daten')">
          <p>
            {{ $auth.user.name }} <br />
            Geburststag
            {{ $auth.user.lastname }}<br />
            {{ $auth.user.email }}
          </p>
          <template #footer>
            <NuxtLink
              class="btn btn-dark btn-block"
              :to="localePath({ name: 'account-profile' })"
            >
              Persönliche Daten ändern
            </NuxtLink>
          </template>
        </AccountContentBox>
      </div>
      <div class="col-md-6">
        <AccountContentBox :title="$t('Gewählte Zahlungsart')">
          <div v-if="defaultPayment" class="payment">
            <PaymentImage :provider="defaultPayment.type"></PaymentImage>
          </div>
          <div v-else class="noPayment">
            {{ $t('Sie haben keine Standard bezahlmöglichkeit hinterlegt.') }}
          </div>
          <template #footer>
            <NuxtLink
              class="btn btn-dark btn-block"
              :to="localePath({ name: 'account-payment' })"
              >Zahlungsarten verwalten</NuxtLink
            >
          </template>
        </AccountContentBox>
      </div>

      <div class="col-md-6">
        <AccountContentBox :title="$t('Standard Lieferadresse')">
          <AddressDisplay :address="defaultDeliveryAddress">
            <template #empty>
              {{ $t('Es wurde noch keine Standard Lieferadresse hinterlegt.') }}
            </template>
          </AddressDisplay>
          <template #footer>
            <NuxtLink
              class="btn btn-dark btn-block"
              :to="localePath({ name: 'account-addresses' })"
              >Adressen verwalten</NuxtLink
            >
          </template>
        </AccountContentBox>
      </div>

      <div class="col-md-6">
        <AccountContentBox :title="$t('Standard Rechnungsadresse')">
          <AddressDisplay :address="defaultBillingAddress">
            <template v-if="!defaultBillingAddress" #empty>
              {{
                $t('Es wurde noch keine Standard Rechnungsadresse hinterlegt.')
              }}
            </template>
          </AddressDisplay>

          <template #footer>
            <NuxtLink
              class="btn btn-dark btn-block"
              :to="localePath({ name: 'account-addresses' })"
              >Adressen verwalten</NuxtLink
            >
          </template>
        </AccountContentBox>
      </div>
    </div>
  </ChildPageWrapper>
</template>

<script>
import AccountContentBox from '@/components/Account/AccountContentBox'
import TwoColHeader from '@/components/TwoColHeader'
import AddressDisplay from '@/components/Address/AddressDisplay'
import PaymentImage from '@/components/Payments/PaymentImage'
import ChildPageWrapper from '@/components/core/LoadingWrapper'
export default {
  name: 'AccountIndexPage',

  components: {
    ChildPageWrapper,
    PaymentImage,
    AddressDisplay,
    TwoColHeader,
    AccountContentBox
  },

  middleware: ['auth', 'isGhost'],

  async fetch() {
    await Promise.all([
      await this.$store.dispatch('account/address/fetch'),
      await this.$store.dispatch('account/payment/fetch')
    ])
  },

  computed: {
    defaultPayment() {
      return this.$store.getters['account/payment/default']
    },

    deliveryEqualToBilling() {
      return this.defaultDelivery.id === this.defaultBilling.id
    },

    defaultDeliveryAddress() {
      return this.$store.getters['account/address/defaultDelivery']
    },

    defaultBillingAddress() {
      return this.$store.getters['account/address/defaultBilling']
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  line-height: 1.5em;
}
</style>
