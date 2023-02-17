<template>
  <ValidationProvider
    v-slot="{ errors }"
    ref="validator"
    :vid="name"
    :rules="rules"
    :name="field || label || name"
    slim
  >
    <div
      :class="[
        'form-group',
        {
          'is-disabled': disabled,
          'has-value': !!value || cardNotEmpty,
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
      <input v-model="internalValue" type="hidden" />
      <div class="input-group">
        <div :class="['form-control', $style.stripe]">
          <div ref="stripeCard"></div>
        </div>
        <slot name="append"></slot>
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
const style = {
  base: {
    fontWeight: '500',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '12px'
  }
}
// https://gist.github.com/cannap/211f0368589cc40b3d062a9d56155ce1
const elementsConfig = {}
export default {
  name: 'StripeCard',

  mixins: [FormFieldMixin],

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      stripeLoaded: false,
      stripe: null,
      card: null,
      cardNotEmpty: false
    }
  },

  mounted() {
    this.stripeLoaded = true
    this.$emit('loaded', true)

    this.stripe = this.$stripe({
      stripeAccount: this.$store.state.shop.current.stripeId
    })

    this.card = this.stripe.elements(elementsConfig).create('card', { style })

    this.card.mount(this.$refs.stripeCard)

    this.card.on('change', ({ error, empty, complete }) => {
      this.cardNotEmpty = !empty
      this.update(complete)
      if (error) {
        this.$refs.validator.setErrors([error.message])
      } else {
        this.$refs.validator.reset()
      }
    })

    /* this.card.on('focus', () => {

    })

    this.card.on('blur', () => {

    }) */
  },

  beforeDestroy() {
    if (!this.card) {
      return
    }
    this.card.removeEventListener('change')
    this.card.destroy()
    this.card = null
    this.stripe = null
  },

  methods: {
    submit(fn) {
      return fn({
        stripe: this.stripe,
        card: this.card,
        cardValidator: this.$refs.validator
      })
    }
  }
}
</script>

<style lang="scss" module>
.stripe {
  :global(.form-group.is-focused) & {
    border-color: $input-focus-border-color;
    box-shadow: $input-btn-focus-box-shadow;
  }
}
</style>
