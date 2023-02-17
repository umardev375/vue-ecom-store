<template>
  <ValidationObserver v-slot="{ handleSubmit }" slim>
    <form method="post" @click.prevent="handleSubmit(changeEmail)">
      <TextField
        v-model="formData.email"
        type="email"
        :rules="{ required: true }"
        label="Neue Email"
        name="email"
      ></TextField>
      <TextField
        v-model="formData.emailRepeat"
        type="email"
        :rules="{ required: true, confirmed: 'email' }"
        label="Email wiederholen"
        name="emailRepeat"
      ></TextField>

      <button type="submit" class="btn btn-dark btn-block">Email ändern</button>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import FormMixin from '@/components/Forms/FormMixin'
import TextField from '@/components/Forms/TextField'
export default {
  name: 'ChangeEmailForm',
  components: {
    ValidationObserver,
    TextField
  },
  mixins: [FormMixin],
  data() {
    return {
      formData: {
        email: '',
        emailRepeat: '',
        attribute: this.$shopId
      }
    }
  },
  methods: {
    changeEmail() {}
  }
}
</script>

<style lang="scss" scoped></style>
