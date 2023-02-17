<template>
  <form autocomplete="off" class="address">
    <VueSelect
      v-if="showAddressSelection"
      v-model="selected"
      placeholder="Select a Address"
      :options="addresses"
      :addresses="addresses"
      name="address"
      :get-option-label="addressLabel"
      :label="$t('checkout.labels.selectAddress')"
      @input="selectAddress"
    />

    <!--   <div class="form-row">
      <div class="col">
        <SelectField
          v-model="gender"
          :rules="{ required: true }"
          :label="$t('Anrede')"
          name="gender"
          :options="genderOptions"
        ></SelectField>
      </div>
    </div> -->

    <div class="form-row">
      <div class="col-md-6">
        <TextField
          v-model="firstname"
          :rules="{ required: true }"
          :label="$t('checkout.labels.firstname')"
          name="firstname"
        />
      </div>

      <div class="col-md-6">
        <TextField
          v-model="lastname"
          :rules="{ required: true }"
          :label="$t('checkout.labels.lastname')"
          name="lastname"
        />
      </div>
    </div>

    <TextField
      v-model="company"
      :rules="{ required: false }"
      :label="$t('checkout.labels.company')"
      name="copmany"
    />

    <TextField
      v-model="addressLine1"
      :rules="{ required: true }"
      :label="$t('checkout.labels.addressLine1')"
      name="addressline1"
    />

    <TextField
      v-model="addressLine2"
      :rules="{ required: false }"
      :label="$t('checkout.labels.addressLine2')"
      name="addressline2"
    />

    <div class="form-row">
      <div class="col-md-6">
        <TextField
          v-model="zip"
          :rules="{ required: true }"
          :label="$t('checkout.labels.zip')"
          name="postcalcode"
        />
      </div>

      <div class="col-md-6">
        <TextField
          v-model="city"
          :value="''"
          :rules="{ required: true }"
          :label="$t('checkout.labels.city')"
          name="City"
        />
      </div>
    </div>
    <!--
    <VueSelect
      v-model="countryId"
      :rules="{ required: true }"
      :label="$t('checkout.labels.country')"
      :options="countries"
      :reducer="reduceCountries"
      :get-option-label="countryLabel"
      name="countryId"
      :placeholder="$t('common.pleaseSelect')"
    /> -->

    <ConutryField
      v-model="countryId"
      label="Land"
      :rules="{ required: true }"
    />

    <div v-show="$auth.loggedIn" :class="['row', $style.checkboxGroup]">
      <div class="col-auto">
        <CheckboxField
          v-model="defaultBilling"
          label="Default Billing"
          name="defaultBilling"
        />
      </div>

      <div class="col-auto">
        <CheckboxField
          v-model="defaultDelivery"
          label="Default Delivery"
          name="defaultdelivery"
        />
      </div>
    </div>

    <NuxtLink :to="localePath({ name: 'account-addresses' })">
      {{ $t('Addressen verwalten') }}</NuxtLink
    >
  </form>
</template>

<script>
import TextField from '@/components/Forms/TextField'
import mapDynamicFields from '@/utils/mapDynamicFields'
import VueSelect from '@/components/Forms/ExtendedSelect'
import CheckboxField from '@/components/Forms/CheckBoxField'
import { compareAddresses, normalizeAddress } from '@/utils/address'
import ConutryField from '@/components/Forms/CountryField'

export default {
  name: 'PersistAddressForm',
  components: {
    ConutryField,
    CheckboxField,
    VueSelect,
    TextField
  },

  props: {
    addresses: {
      required: false,
      type: Array,
      default: () => []
    },

    createNewAddress: {
      type: Boolean,
      default: false
    },
    /**
     * Is for Vuex module/namespace.path
     */
    path: {
      required: true,
      type: String
    },

    storeModule: {
      default: 'checkout',
      type: String
    }
  },
  data() {
    return {
      selected: null,
      stopWatcher: false,
      defaultCountry: 'DE'
    }
  },
  computed: {
    showAddressSelection() {
      return this.addresses.length > 0 && !this.$auth.hasScope('ghost')
    },

    countries() {
      return this.$store.state.shop.countries
    },
    genderOptions() {
      return [
        {
          id: 'FEMALE',
          label: this.$t('Frau')
        },
        {
          id: 'MALE',
          label: this.$t('Herr')
        },
        {
          id: 'INTERSEX',
          label: this.$t('Diverse')
        }
      ]
    },
    currentAddress() {
      return this.$store.state.checkout[this.path]
    },
    ...mapDynamicFields(
      [
        'firstname',
        'lastname',
        'vat',
        'countryId',
        'city',
        'zip',
        'company',
        'addressLine1',
        'addressLine2',
        'defaultBilling',
        'defaultDelivery'
        // 'gender'
      ],
      'path'
    )
  },

  watch: {
    currentAddress: {
      handler(newAddress, oldAddress) {
        const hasSameAddress = this.addresses.find((addr) => {
          return compareAddresses(addr, newAddress)
        })

        if (!hasSameAddress) {
          this.$emit('update:createNewAddress', true)
          this.selected = null
        } else {
          this.selected = hasSameAddress
          this.$emit('update:createNewAddress', false)
        }
      },
      deep: true
    }
  },

  methods: {
    selectAddress(address) {
      if (address) {
        const normalizedAddress = normalizeAddress(address)

        this.$store.commit('checkout/SET_ADDRESS', {
          path: this.path,
          address: normalizedAddress
        })
        this.$emit('update:createNewAddress', false)
      } else {
        this.$store.commit('checkout/RESET_ADDRESS', this.path)
      }
    },

    addressLabel(address) {
      return address.title
    },

    countryLabel(country) {
      return country.name
    },

    reduceCountries(country) {
      return country.id
    }
  }
}
</script>

<style lang="scss" module>
.checkbox-group {
  margin-bottom: rem-calc(6px);
  margin-top: rem-calc(22px);
}
</style>
