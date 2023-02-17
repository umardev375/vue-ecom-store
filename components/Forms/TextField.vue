<template>
  <ValidationProvider
    v-slot="{ errors }"
    :vid="name"
    :rules="rules"
    :name="field || label || name"
    slim
  >
    <div
      :class="[
        {
          'form-group': group,
          'has-value': !!value,
          'is-disabled': disabled,
          'is-focused': focused,
          'is-invalid': errors[0]
        }
      ]"
    >
      <label
        v-if="label || field"
        :for="fieldId"
        :class="['form-label', { 'sr-only': field && !label }]"
      >
        {{ label || field }}
        <span v-if="rules.required" class="form-label-asterisk">*</span>
      </label>
      <div class="input-group">
        <input
          :id="fieldId"
          ref="input"
          v-model="internalValue"
          :class="['form-control', { 'is-invalid': errors[0] }]"
          :name="name"
          :type="type"
          :disabled="disabled"
          :readonly="readonly"
          :placeholder="placeholder"
          @focus="focus"
          @blur="blur"
          @input="updateValue"
        />
        <slot name="append" />

        <small v-if="errors[0]" class="invalid-feedback">
          {{ errors[0] }}
          <slot v-show="focused" name="error" />
        </small>
      </div>
      <small v-if="$slots.help" class="help-feedback d-block mt-2">
        <slot name="help" />
      </small>
    </div>
  </ValidationProvider>
</template>

<script>
// import slugify from 'slugify'
import FormFieldMixin from '@/components/Forms/FormFieldMixin'

export default {
  name: 'TextField',
  mixins: [FormFieldMixin],

  props: {
    type: {
      type: String,
      default: 'text',
      validator: (val) => {
        return [
          'url',
          'text',
          'password',
          'email',
          'search',
          'tel',
          'number'
        ].includes(val)
      }
    }
  }
}
</script>

<style lang="scss" module></style>
