<template>
  <TextField
    :value="value"
    :rules="{
      required: true,
      // regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
      min: 6
    }"
    :name="name"
    :label="label || $t('Password')"
    :placeholder="placeholder"
    type="password"
    @input="$emit('input', $event)"
  >
    <template #help>
      {{ $t('auth.passwordInfo') }}
    </template>
  </TextField>
</template>

<script>
import TextField from '@/components/Forms/TextField'

export default {
  components: { TextField },

  props: {
    value: {
      type: String,
      required: true
    },

    name: {
      type: String,
      default: 'password'
    },

    label: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" module></style>
