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
          'is-disabled': disabled,
          'is-focused': focused,
          'is-invalid': errors[0]
        }
      ]"
    >
      <label
        v-if="label || field"
        :for="`${fieldId}-0`"
        :class="['form-label', { 'sr-only': field && !label }]"
      >
        {{ label || field }}
        <span v-if="rules.required" class="form-label-asterisk">*</span>
      </label>
      <div :class="['row', { 'flex-column': !inline }]">
        <div
          v-for="(option, index) in internalOptions"
          :key="index"
          class="col-auto"
        >
          <div :class="[$style.checkbox, $style.checkboxLg]">
            <input
              :id="`${fieldId}-${index}`"
              v-model="internalValue"
              :disabled="disabled || option.disabled"
              :readonly="readonly || option.readonly"
              :value="option.id"
              :class="$style.checkboxInput"
              type="radio"
              @change="updateValue"
            />
            <CheckmarkSquareIcon :class="$style.checkboxCheckmark" />
            <label :for="`${fieldId}-${index}`" :class="$style.checkboxLabel">
              {{ option.title || option.name || option.label }}
            </label>
          </div>
        </div>
      </div>
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
  name: 'RadioInline',
  components: { CheckmarkSquareIcon },
  mixins: [FormFieldMixin],

  props: {
    options: {
      type: [String, Array],
      default: () => []
    },

    boolOptions: {
      type: Boolean,
      default: false
    },

    inline: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    internalOptions() {
      if (this.boolOptions) {
        return [
          {
            id: true,
            title: this.$t('Yes')
          },
          {
            id: false,
            title: this.$t('No')
          }
        ]
      }

      const options = Array.isArray(this.options)
        ? this.options
        : this.options.split(',')

      return options.map((option) =>
        Object.prototype.toString.call(option) === '[object Object]'
          ? option
          : {
              id: option.trim(),
              title: option.trim()
            }
      )
    }
  },

  methods: {
    transformValue(value) {
      return this.boolOptions ? Boolean(value) : value
    }
  }
}
</script>

<style lang="scss" module src="./CheckboxField.scss"></style>
