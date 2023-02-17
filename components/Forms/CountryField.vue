<template>
  <ValidationProvider
    v-slot="{ errors }"
    :vid="name"
    :rules="rules"
    :name="field || label || name"
    slim
  >
    <div class="form-group" :class="{ 'is-invalid': errors[0] }">
      <label
        v-if="label || field"
        :for="fieldId"
        :class="['form-label', { 'sr-only': field && !label }]"
      >
        {{ label || field }}
        <span v-if="rules.required" class="form-label-asterisk">*</span>
      </label>
      <Vselect
        v-model="internalValue"
        append-to-body
        :calculate-position="withPopper"
        :clearable="false"
        :options="countries"
        :reduce="reduceToId"
        placeholder="Select a Country"
        label="name"
      ></Vselect>
      <small v-if="errors[0]" class="invalid-feedback">
        {{ errors[0] }}
      </small>
    </div>
  </ValidationProvider>
</template>

<script>
import Vselect from 'vue-select'
import { ValidationProvider } from 'vee-validate'
import 'vue-select/dist/vue-select.css'
import { createPopper } from '@popperjs/core'

export default {
  name: 'ConutryField',
  components: {
    Vselect,
    ValidationProvider
  },
  props: {
    name: {
      type: String,
      default: 'country'
    },
    value: {
      type: String,
      default: ''
    },
    field: {
      type: String,
      default: null
    },

    label: {
      type: String,
      default: null
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      internalValue: '',
      defaultCountry: 'DE'
    }
  },
  async fetch() {
    await this.$store.dispatch('shop/fetchCountries')
  },
  computed: {
    countries() {
      return this.$store.state.shop.countries
    },
    fieldId() {
      return this.name
    }
  },

  watch: {
    internalValue(newVal) {
      this.$emit('input', newVal)
    },

    countries: {
      immediate: true,
      handler(newVal) {
        if (newVal.length > 0) {
          const country = this.countries.find(
            (country) => country.iso === this.defaultCountry
          )

          this.internalValue = country.id
        }
      }
    }
  },

  methods: {
    reduceToId(country) {
      return country.id
    },
    withPopper(dropdownList, component, { width }) {
      dropdownList.style.width = width

      const popper = createPopper(component.$refs.toggle, dropdownList, {
        // placement: this.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -1]
            }
          },
          {
            name: 'toggleClass',
            enabled: true,
            phase: 'write',
            fn({ state }) {
              component.$el.classList.toggle(
                'drop-up',
                state.placement === 'top'
              )
            }
          }
        ]
      })

      return () => popper.destroy()
    }
  }
}
</script>

<style lang="scss">
.is-invalid {
  .invalid-feedback {
    display: block;
  }
  .vs__dropdown-toggle {
    border-color: #e72d5c;
  }
}

$vs-colors: (
  lightest: $input-border-color,
  light: rgba(60, 60, 60, 0.5),
  dark: $body-color,
  darkest: rgba(0, 0, 0, 0.15)
) !default;
$vs-component-line-height: 1.2;
$vs-border-width: 1px;
$vs-dropdown-box-shadow: none;
$vs-state-active-bg: $primary;

// custom
$vs-component-space-y: calc(#{$input-padding-y} - #{$vs-border-width});
$vs-component-space-x: calc(#{$input-padding-x} - #{$vs-border-width});
$vs-selected-mx: rem-calc(2px);
$vs-selected-space-x: calc(
  #{$input-padding-x} - #{$vs-selected-mx} - #{$vs-border-width}
);

.v-select {
  @include font-size(12px);
}

.vs__search,
.vs__search:focus {
  font-family: $font-family-base;
  font-weight: $font-weight-base;
  margin: rem-calc($vs-component-space-y 0 0 0);
  padding: 0 ($vs-component-space-x);
}

.vs__dropdown-toggle {
  padding: rem-calc(0 0 $vs-component-space-y 0);
}

.vs__selected {
  padding: 0 $vs-selected-space-x;
  margin: rem-calc($vs-component-space-y $vs-selected-mx 0 $vs-selected-mx);
}

.vs__selected-options {
  padding: 0;
}

.vs__actions {
  padding: $vs-component-space-y 12px 0 6px;
}

.vs__dropdown-menu {
  border-top-style: solid;
  padding: 0;
}

.vs__dropdown-option {
  border-bottom: 1px solid rgba($gray-600, 0.34);
  line-height: $line-height-base;
  padding: rem-calc(14px 16px);
  position: relative;

  &::before {
    background: $vs-state-active-bg;
    content: '';
    display: none;
    left: 0;
    height: $vs-border-width;
    position: absolute;
    top: -$vs-border-width;
    width: 100%;
  }

  &--highlight::before {
    display: block;
  }

  &:last-child {
    border-bottom-color: transparent;
  }

  &:not(.vs__dropdown-option--highlight) {
    color: $body-color;
  }
}
</style>
