<template>
  <ValidationProvider
    v-slot="{ errors }"
    :vid="name"
    :rules="rules"
    :name="field || label || name"
    slim
  >
    <div class="list-group">
      <label
        v-for="option in options"
        :key="option.value"
        :for="option.value"
        :class="[$style.item, { active: internalValue === option.value }]"
        class="list-group-item"
      >
        <span class="d-flex justify-content-between align-items-center">
          <span
            :class="[$style.radio, { 'align-items-center': radioItemsCenter }]"
          >
            <input
              :id="option.value"
              v-model="internalValue"
              :disabled="option.disabled"
              name="radios"
              :value="option.value"
              :class="$style.radioInput"
              type="radio"
              @change="updateValue"
            />
            <span :class="$style.radioIndicator"></span>
            <slot name="label" :option="option">
              {{ option.label }}
            </slot>
          </span>
          <span class="d-block">
            <slot name="description" :option="option">
              {{ option.description }}
            </slot>
          </span>
        </span>

        <slot
          v-if="
            (option.value === internalValue &&
              !!$scopedSlots[`extra-${option.value}`]) ||
            option.extra
          "
          :name="`extra-${option.value}`"
          :option="option"
        >
          <div
            v-if="option.extra && option.value === internalValue"
            class="extra-text help-feedback"
          >
            {{ option.extra }}
          </div>
        </slot>
      </label>
    </div>
    {{ errors[0] }}
  </ValidationProvider>
</template>

<script>
import FormFieldMixin from '~/components/Forms/FormFieldMixin'

export default {
  name: 'RadioList',
  mixins: [FormFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    },
    radioItemsCenter: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" module>
.item {
  margin-bottom: 0;
}

.label {
  display: block;

  &::before,
  &::after {
  }
}

//Tood: theme
/*.active {
  border-color: darken(#e9edf2, 10%);
  background: #e9edf2;

  .form-text {
    color: black;
    font-weight: 400;
  }
}*/

.radio {
  font-weight: 600;
  display: inline-flex;
  position: relative;

  input {
    opacity: 0;
    position: absolute;
  }

  &__indicator {
    background: transparent;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 0 1px $gray-600;
    height: rem-calc(12px);
    margin-right: rem-calc(13px);
    width: rem-calc(12px);

    .radio input:checked + & {
      background: black;
    }
  }
}
</style>
