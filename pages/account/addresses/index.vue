<template>
  <ChildPageWrapper :loading="$fetchState.pending" :class="$style.address">
    <!-- Todo: Styling -->
    <TwoColHeader :title="$t('Adressen')">
      {{ $t('Bearbeiten oder fügen Sie neue Adressen hinzu.') }}
      <div class="new-address">
        <NuxtLink
          :to="localePath({ name: 'account-addresses-create' })"
          class="btn btn-dark mt-4 d-inline-block"
        >
          {{ $t('Neue Adresse hinzufügen') }}
        </NuxtLink>
      </div>
    </TwoColHeader>
    <div>
      <div class="row">
        <div class="col-md-6">
          <AccountContentBox :title="$t('Standard Lieferadresse')">
            <AddressDisplay :address="defaultDelivery">
              <template #empty>
                {{
                  $t('Es wurde noch keine Standard Lieferadresse hinterlegt.')
                }}</template
              >
              <template #footer>
                <AddressActions
                  v-if="defaultDelivery"
                  :address="defaultDelivery"
                />
              </template>
            </AddressDisplay>
          </AccountContentBox>
        </div>
        <div class="col-md-6">
          <AccountContentBox :title="$t('Standard Rechnungsadresse')">
            <AddressDisplay
              v-if="!deliveryEqualToBilling"
              :address="defaultBilling"
            >
              <template #empty>
                {{
                  $t(
                    'Es wurde noch keine Standard Rechnungsadresse hinterlegt.'
                  )
                }}
              </template>

              <template #footer>
                <AddressActions
                  v-if="Object.keys(defaultBilling).length"
                  :address="defaultBilling"
                />
              </template>
            </AddressDisplay>

            <div v-else class="equal">
              {{ $t('Rechnungsadresse ist gleich Lieferadresse') }}
            </div>
          </AccountContentBox>
        </div>
      </div>
    </div>
    <div class="addresses">
      <AccountContentBox
        v-if="addresses.length"
        :title="$t('Weitere Adressen')"
      >
        <div class="row">
          <AddressDisplay
            v-for="address in addresses"
            :key="address.id"
            :class="[$style.addressBox, 'py-4 col-md-6']"
            :address="address"
          >
            <template #footer>
              <AddressActions :address="address" />
            </template>
          </AddressDisplay>
        </div>
      </AccountContentBox>
    </div>
  </ChildPageWrapper>
</template>

<script>
import TwoColHeader from '@/components/TwoColHeader'
import AddressDisplay from '@/components/Address/AddressDisplay'
import AddressActions from '@/components/Address/AddressActions'
import AccountContentBox from '@/components/Account/AccountContentBox'
import ChildPageWrapper from '@/components/core/LoadingWrapper'
export default {
  name: 'AddressesPage',
  components: {
    ChildPageWrapper,
    AccountContentBox,
    AddressActions,
    AddressDisplay,
    TwoColHeader
  },
  async fetch() {
    await this.$store.dispatch('account/address/fetch')
  },

  computed: {
    addresses() {
      return this.$store.state.account.address.all.filter((addr) => {
        return !(addr.defaultBilling || addr.defaultDelivery)
      })
    },

    defaultDelivery() {
      return this.$store.getters['account/address/defaultDelivery']
    },

    defaultBilling() {
      return this.$store.getters['account/address/defaultBilling']
    },

    deliveryEqualToBilling() {
      return this.defaultDelivery.id === this.defaultBilling.id
    }
  }
}
</script>

<style lang="scss" module>
.address {
  &__all {
    border-top: 1px solid grey;
  }
  &__box {
    border-bottom: 1px solid grey;
  }
}
</style>
