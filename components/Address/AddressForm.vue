<template>
  <ValidationObserver v-slot="{ handleSubmit }" slim>
    <div class="form-row">
      <div class="col-md-6">
        <TextField
          v-model="formData.firstname"
          :rules="{ required: true }"
          :label="$t('checkout.labels.firstname')"
          name="firstname"
        />
      </div>

      <div class="col-md-6">
        <TextField
          v-model="formData.lastname"
          :rules="{ required: true }"
          :label="$t('checkout.labels.lastname')"
          name="lastname"
        />
      </div>
    </div>

    <TextField
      v-model="formData.company"
      :rules="{ required: false }"
      :label="$t('checkout.labels.company')"
      name="copmany"
    />

    <TextField
      v-model="formData.addressLine1"
      :rules="{ required: true }"
      :label="$t('checkout.labels.addressLine1')"
      name="addressline1"
    />

    <TextField
      v-model="formData.addressLine2"
      :rules="{ required: false }"
      :label="$t('checkout.labels.addressLine2')"
      name="addressline2"
    />

    <div class="form-row">
      <div class="col-md-6">
        <TextField
          v-model="formData.city"
          :rules="{ required: true }"
          :label="$t('checkout.labels.city')"
          name="City"
        />
      </div>

      <div class="col-md-6">
        <TextField
          v-model="formData.zip"
          :rules="{ required: true }"
          :label="$t('checkout.labels.zip')"
          name="postcalcode"
        />
      </div>
    </div>

    <ConutryField
      v-model="formData.country"
      label="Land"
      :rules="{ required: true }"
    />

    <div :class="['row', $style.checkboxGroup]">
      <div class="col-auto">
        <CheckboxField
          v-model="formData.defaultBilling"
          label="Default Billing"
          name="defaultBilling"
        ></CheckboxField>
      </div>

      <div class="col-auto">
        <CheckboxField
          v-model="formData.defaultDelivery"
          label="Default Delivery"
          name="defaultdelivery"
        ></CheckboxField>
      </div>
    </div>
    <button
      type="submit"
      :class="['btn btn-dark', { 'is-loading': loading }]"
      @click="handleSubmit(submit)"
    >
      {{ buttonText }}
    </button>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import FormMixin from '@/components/Forms/FormMixin'
import TextField from '@/components/Forms/TextField'
import CheckboxField from '@/components/Forms/CheckBoxField'
import { normalizeAddress } from '@/utils/address'
import ConutryField from '@/components/Forms/CountryField'
export default {
  name: 'AddressForm',
  components: {
    ConutryField,
    TextField,
    ValidationObserver,

    CheckboxField
  },
  mixins: [FormMixin],
  props: {},
  computed: {
    countries() {
      return this.$store.state.shop.countries
    }
  },
  methods: {
    async submit() {
      this.loading = true
      const formData = normalizeAddress(this.formData)
      try {
        if (this.item.id) {
          // Update
          await this.$axios.$put(
            `shops/customers/addresses/${this.item.id}`,
            formData
          )
          this.$toast.success(this.$t('Adresse wurde geändert'))
        } else {
          // Create
          await this.$store.dispatch('account/address/add', formData)
          this.$toast.success(this.$t('Adresse wurde eingetragen'))
        }
      } catch (e) {
      } finally {
        this.loading = false
      }
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
