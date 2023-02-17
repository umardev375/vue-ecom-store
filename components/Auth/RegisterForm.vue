<template>
  <ValidationObserver
    ref="validator"
    v-slot="{ handleSubmit, invalid }"
    tag="form"
    slim
  >
    <form @submit.prevent="handleSubmit(register)">
      <!-- <div class="form-row">
        <div class="col">
          <SelectField
            v-model="formData.gender"
            :rules="{ required: true }"
            :label="$t('Anrede')"
            name="gender"
            :options="genderOptions"
          ></SelectField>
        </div>
      </div> -->

      <div class="form-row">
        <div class="col">
          <TextField
            v-model="formData.name"
            name="name"
            :rules="{ required: true }"
            :label="$t('Firstname')"
          ></TextField>
        </div>
        <div class="col">
          <TextField
            v-model="formData.lastname"
            name="lastname"
            :rules="{ required: true }"
            :label="$t('Lastname')"
          ></TextField>
        </div>
      </div>
      <TextField
        v-model="formData.email"
        name="Email"
        :rules="{ required: true, email: true }"
        :label="$t('Email')"
      ></TextField>

      <div class="form-row">
        <div class="col">
          <TextField
            v-model="formData.password"
            name="password"
            type="password"
            :rules="{ required: true, min: 8 }"
            :label="$t('Password')"
          >
            <template #help>
              {{ $t('auth.passwordInfo') }}
            </template>
          </TextField>
        </div>
        <div class="col">
          <TextField
            v-model="formData.password_repeat"
            name="password_repeat"
            type="password"
            :rules="{ confirmed: 'password', required: true }"
            :label="$t('Repeat Password')"
          ></TextField>
        </div>
      </div>

      <div class="footer d-flex align-items-center">
        <button
          type="submit"
          :disabled="invalid"
          class="btn btn-dark"
          :class="{ 'is-loading': loading }"
        >
          {{ $t('Register') }}
        </button>
        <span class="footer__or d-inline-block mx-2"> oder </span>
        <NuxtLink :to="localePath({ name: 'login' })">
          {{ $t('Einloggen') }}</NuxtLink
        >
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import FormMixin from '@/components/Forms/FormMixin'
import TextField from '@/components/Forms/TextField'
// import SelectField from '@/components/Forms/SelectField'

const formDataDefaults = {
  name: 'Marko',
  lastname: 'Bolliger',
  email: 'xxx',
  password: 'Abztirentgire42#1',
  password_repeat: 'Abztirentgire42#1',
  role: 'customer'
  // gender: ''
  // redirectUrl: 'localhost:3008/account/success'
}

export default {
  name: 'RegisterForm',
  components: {
    //  SelectField,
    ValidationObserver,
    TextField
  },

  mixins: [FormMixin],
  data() {
    return {
      formDataDefaults: {
        ...formDataDefaults,
        attribute: this.$shopId,
        redirectUrl: `${location.origin}${this.localePath({ name: 'login' })}`
      }
      //  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{7,})/
    }
  },

  computed: {
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
          label: this.$t('Divers')
        }
      ]
    }
  },

  methods: {
    async register() {
      try {
        await this.$axios.$post('user/register', this.formData)

        this.$toast.success('Account Created')
        this.$storage.removeUniversal('customer_cart')
        await this.$router.replace(
          this.localePath({
            name: 'login',
            query: { success: true, email: this.formData.email }
          })
        )
      } catch (e) {
        this.catchLaravelErrors(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
