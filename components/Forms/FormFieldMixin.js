import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider
  },

  inheritAttrs: false,

  props: {
    value: {
      type: [String, Number, Object, Boolean, Array],
      required: true,
      default: ''
    },

    group: {
      default: true,
      type: Boolean
    },

    rules: {
      type: Object,
      default: () => ({})
    },

    name: {
      type: String,
      required: true
    },

    field: {
      type: String,
      default: null
    },

    label: {
      type: String,
      default: null
    },

    disabled: {
      type: Boolean,
      default: false
    },

    readonly: {
      type: Boolean,
      default: false
    },

    placeholder: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      internalValue: this.value,
      focused: false
    }
  },

  computed: {
    fieldId() {
      return this.name
    },

    optional() {
      return !this.rules.required
    },

    required() {
      return !this.optional
    },

    internalRules() {
      return this.rules
    }
  },

  watch: {
    value(newVal) {
      this.internalValue = newVal
    }
  },

  methods: {
    focus() {
      this.focused = true
      this.$emit('focus')
    },

    blur() {
      this.focused = false
      this.$emit('blur')
    },

    update(newVal) {
      if (!this.disabled && !this.readonly) {
        this.$emit(
          'input',
          this.transformValue ? this.transformValue(newVal) : newVal
        )
      }
    },

    updateCheckbox(event) {
      this.update(event.target.checked)
    },

    updateValue(event) {
      this.update(event.target.value)
    }
  }
}
