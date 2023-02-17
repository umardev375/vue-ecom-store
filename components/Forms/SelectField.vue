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
        <select
          :id="fieldId"
          v-model="internalValue"
          class="custom-select"
          :name="name"
          :disabled="disabled"
          :readonly="readonly"
          @change="updateValue"
        >
          <option value="" :disabled="required" :selected="!value">
            {{ placeholder || $t('Select') }}
          </option>
          <option
            v-for="option in internalOptions"
            :key="option.id"
            :value="String(option.id)"
          >
            {{ option.title || option.name || option.label }}
          </option>
        </select>
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

export default {
  name: 'SelectField',
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

    new: {
      type: String,
      default: ''
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

      let options = Array.isArray(this.options)
        ? this.options
        : this.options.split(',')

      options = options.map((option) =>
        Object.prototype.toString.call(option) === '[object Object]'
          ? option
          : {
              id: option.trim(),
              title: option.trim()
            }
      )

      if (this.new) {
        options.unshift({
          id: 'new',
          title: this.new
        })
      }

      return options
    }
  },

  methods: {
    transformValue(value) {
      return this.boolOptions ? Boolean(value) : value
    }
  }
}
</script>
