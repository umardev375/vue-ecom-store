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

    <button
      :class="['btn btn-dark', { 'is-loading': loading }]"
      :disabled="(invalid && validated) || loading"
      type="submit"
    >
      {{ $t('Password wiederherstellen') }}
    </button>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import FormMixin from '@/components/Forms/FormMixin'
import TextField from '@/components/Forms/TextField'

const formDataDefaults = {
  url: '',
  email: ''
}

export default {
  name: 'ForgotPasswordForm',

  components: {
    TextField,
    ValidationObserver
  },

  mixins: [FormMixin],

  data() {
    return {
      formDataDefaults
    }
  },

  methods: {
    async submit() {
      if (!(await this.validate())) {
        return
      }

      this.loading = true

      try {
        const resetPasswordRoute = this.localePath({ name: 'reset-password' })

        this.formData.url = `${location.origin}${resetPasswordRoute}`
        await this.$axios.$post('/user/password/email', {
          ...this.formData,
          attribute: this.$shopId
        })
        this.$toast.success(
          this.$i18n.t('We have e-mailed your password reset link')
        )
        // await this.$store.dispatch('authUser/forgotPassword', this.formData)
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
