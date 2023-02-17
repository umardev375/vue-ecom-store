<template>
  <ValidationObserver
    ref="validator"
    v-slot="{ invalid, validated }"
    tag="form"
    @submit.prevent="submit"
  >
    <TextField
      v-model="formData.email"
      :rules="{ required: true, email: true }"
      name="email"
      :label="$t('Email')"
      type="email"
    />

    <PasswordField v-model="formData.password" :label="$t('Password')" />

    <TextField
      v-model="formData.password_confirmation"
      :rules="{ required: true, confirmed: 'password' }"
      name="password_confirmation"
      :label="$t('Password Confirmation')"
      :field="$t('Password')"
      type="password"
    />

    <button
      :disabled="(invalid && validated) || loading"
      :class="['btn btn-success btn-block mt-4', { 'is-loading': loading }]"
      type="submit"
    >
      {{ $t('Reset password') }}
    </button>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import FormMixin from '@/components/Forms/FormMixin'
// import PasswordField from '@/components/Forms/PasswordField'
import TextField from '@/components/Forms/TextField'
import PasswordField from '@/components/Forms/PasswordField'
const formDataDefaults = {
  token: '',
  email: '',
  password: '',
  password_confirmation: ''
}

export default {
  name: 'ResetPasswordForm',

  components: {
    PasswordField,
    TextField,
    ValidationObserver
  },

  mixins: [FormMixin],

  data() {
    return {
      formDataDefaults
    }
  },

  created() {
    this.setFormData({
      token: this.$route.query.token,
      attribute: this.$shopId
    })
  },

  methods: {
    async submit() {
      if (!this.formData.token || !(await this.validate())) {
        return
      }

      this.loading = true

      try {
        let redirect = { name: 'login' }
        redirect = this.localePath ? this.localePath(redirect) : redirect
        this.$router.push(redirect)
      } catch (e) {
        this.catchLaravelErrors(e)
        this.loading = false
      }
    }
  }
}
</script>
