<template>
  <div class="adressActions">
    <div
      v-if="Object.keys(address).length > 0"
      :class="['d-flex flex-column align-items-start my-4']"
    >
      <button
        v-show="!address.defaultDelivery"
        class="btn btn-link p-0 text-left p-0"
        @click="setDefault('delivery')"
      >
        Als Standard-Lieferadresse verwenden
      </button>
      <button
        v-show="!address.defaultBilling"
        class="btn btn-link p-0 text-left p-0"
        @click="setDefault('billing')"
      >
        Als Standard-Rechnungsadresse verwenden
      </button>
    </div>
    <div v-if="Object.keys(address).length > 0" class="d-flex">
      <NuxtLink
        :to="
          localePath({
            name: 'account-addresses-address',
            params: { address: address.id }
          })
        "
        class="btn btn-dark"
        >Bearbeiten</NuxtLink
      >
      <button
        :class="['btn btn-danger ml-2', { 'is-loading': isLoading }]"
        @click="deleteAddress"
      >
        Löschen
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddressActions',
  props: {
    address: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    async setDefault(type) {
      await this.$store.dispatch('account/address/setDefault', {
        address: this.address,
        type
      })
    },

    async deleteAddress() {
      const id = this.address.id
      await this.$store.dispatch('account/address/remove', id)
    }
  }
}
</script>

<style lang="scss" scoped></style>
