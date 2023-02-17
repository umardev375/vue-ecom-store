<template>
  <ValidationProvider
    v-slot="{ errors }"
    :vid="name"
    :rules="rules"
    :name="field || label || name"
    slim
  >
    <div class="form-group">
      <label
        v-if="label || field"
        :class="['form-label', { 'sr-only': field && !label }]"
      >
        {{ label || field }}
        <span v-if="rules.required" class="form-label-asterisk">*</span>
      </label>
      <Vselect
        v-model="internalValue"
        append-to-body
        :calculate-position="withPopper"
        :options="options"
        :reduce="reducer"
        :placeholder="placeholder"
        :get-option-label="getOptionLabel"
      >
        <!-- pass through scoped slots -->
        <template
          v-for="(_, scopedSlotName) in $scopedSlots"
          #[scopedSlotName]="slotData"
        >
          <slot :name="scopedSlotName" v-bind="slotData" />
        </template>

        <!-- pass through normal slots -->
        <template v-for="(_, slotName) in $slots" #[slotName]>
          <slot :name="slotName" />
        </template>
      </Vselect>
      <small v-if="errors[0]" class="invalid-feedback">
        {{ errors[0] }}
      </small>
    </div>
  </ValidationProvider>
</template>

<script>
import Vselect from 'vue-select'
import { ValidationProvider } from 'vee-validate'
import { createPopper } from '@popperjs/core'

export default {
  name: 'VueSelect',
  components: {
    Vselect,
    ValidationProvider
  },
  props: {
    name: {
      type: String,
      required: true
    },

    value: {
      type: [String, Number, Object, Boolean],
      required: false,
      default: ''
    },

    field: {
      type: String,
      default: null
    },

    options: {
      required: true,
      type: Array
    },

    label: {
      type: String,
      default: null
    },

    placeholder: {
      required: true,
      type: String
    },

    reducer: {
      type: Function,
      default: (item) => item
    },
    getOptionLabel: {
      type: Function,
      default(option) {
        if (typeof option === 'object') {
          if (!Object.prototype.hasOwnProperty.call(option, this.label)) {
            // if (!option.hasOwnProperty(this.label)) {
            return console.warn(
              `[vue-select warn]: Label key "option.${this.label}" does not` +
                ` exist in options object ${JSON.stringify(option)}.\n` +
                'https://vue-select.org/api/props.html#getoptionlabel'
            )
          }
          return option[this.label]
        }
        return option
      }
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      internalValue: this.value
    }
  },

  watch: {
    internalValue(newVal) {
      this.$emit('input', newVal)
    },
    value(newVal) {
      this.internalValue = newVal
    }
  },
  methods: {
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

@import 'vue-select/src/scss/vue-select';

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
