<template>
  <ValidationObserver v-slot="{ handleSubmit }" slim>
    <form method="post" @submit.prevent="handleSubmit(changePassword)">
      <TextField
        v-model="formData.password_old"
        name="old_password"
        type="password"
        :rules="{ required: true }"
        :label="$t('Altes Passwort')"
      />

      <TextField
        v-model="formData.password_new"
        name="new_password"
        type="password"
        :rules="{ required: true, min: 8 }"
        :label="$t('Passwort')"
      >
        <template #help>
          {{ $t('auth.passwordInfo') }}
        </template>
      </TextField>

      <TextField
        v-model="formData.password_new_repeat"
        name="new_password_repeat"
        type="password"
        :rules="{ required: true, confirmed: 'new_password' }"
        :label="$t('Passwort wiederholen')"
      />

      <button class="btn btn-dark btn-block" type="submit">
        {{ $t('Passwort ändern') }}
      </button>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import FormMixin from '@/components/Forms/FormMixin'
import TextField from '@/components/Forms/TextField'

export default {
  name: 'ChangePasswordForm',
  components: {
    ValidationObserver,
    TextField
  },
  mixins: [FormMixin],
  data() {
    return {
      formData: {
        password_old: '',
        password_new: '',
        password_new_repeat: '',
        attribute: this.$shopId
      }
    }
  },
  methods: {
    async changePassword() {
      try {
        await this.$axios.$put('user/password/update', this.formData)
      } catch (e) {
        this.setLaravelErrors(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
