<template>
  <ValidationObserver slim>
    <TextField
      v-model="formData.email"
      :rules="{ email: true, required: true }"
      label="Email"
      name="email"
    />
  </ValidationObserver>
</template>

<script>
// import debounce from 'lodash-es/debounce'
import { validate, ValidationObserver } from 'vee-validate'
import TextField from '@/components/Forms/TextField'
import FormMixin from '@/components/Forms/FormMixin'

const formDataDefaults = {
  email: process.dev ? 'sh4fty+++554454435@gmail.com' : '',
  password: 'Abztirentgire42#1',
  password_repeat: 'Abztirentgire42#1'
}
export default {
  name: 'GhostForm',

  components: {
    TextField,
    ValidationObserver
  },

  mixins: [FormMixin],

  props: {
    address: {
      type: Object,
      required: true
    },
    ghostExists: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      formDataDefaults
    }
  },

  methods: {
    // Todo: give user feedback while email is checking

    create() {
      return this.$axios.$post('ghosts', {
        ...this.formData,
        ...this.address,
        //  gender: 'MALE',
        shopId: this.$shopId
      })
    },

    login() {
      console.log('LOGIN WITH GHOST')
      return this.$auth.loginWith('volvStrategy', {
        data: { ...this.formData, attribute: this.$shopId }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
