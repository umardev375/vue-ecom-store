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
        $style.checkboxGroup,
        'form-group',
        {
          'is-disabled': disabled,
          'is-focused': focused,
          'is-invalid': errors[0]
        }
      ]"
    >
      <label :for="fieldId" :class="$style.checkbox">
        <input
          :id="fieldId"
          v-model="internalValue"
          :name="name"
          :disabled="disabled"
          :readonly="readonly"
          :class="$style.checkboxInput"
          type="checkbox"
          @focus="focus"
          @blur="blur"
          @change="updateCheckbox"
        />
        <CheckmarkSquareIcon :class="$style.checkboxCheckmark" />
        <span :class="$style.checkboxLabel">
          {{ label || field }}
          <span v-if="rules.required" class="form-label-asterisk">*</span>
        </span>
      </label>
      <small v-if="errors[0]" class="invalid-feedback">
        {{ errors[0] }}
      </small>
      <small v-else-if="$slots.help" class="help-feedback">
        <slot name="help"></slot>
      </small>
    </div>
  </ValidationProvider>
</template>

<script>
import FormFieldMixin from '@/components/Forms/FormFieldMixin'
import CheckmarkSquareIcon from '~/icons/CheckmarkSquareIcon'

export default {
  name: 'CheckboxField',
  components: { CheckmarkSquareIcon },
  mixins: [FormFieldMixin],

  methods: {
    transformValue(value) {
      return Boolean(value)
    }
  }
}
</script>

<style lang="scss" module src="./CheckboxField.scss"></style>
