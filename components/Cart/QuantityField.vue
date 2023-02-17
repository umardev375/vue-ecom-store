<template>
  <div :class="[$style.qty, { [$style.qtySm]: sm }]">
    <button :class="$style.btn" @click="minus">
      <MinusIcon :class="$style.btnSvg" />
    </button>
    <input
      :value="item.quantity"
      :class="$style.input"
      readonly
      type="number"
      aria-label="Item Quantity"
    />

    <button :class="$style.btn" @click="plus">
      <PlusIcon :class="$style.btnSvg" />
    </button>
  </div>
</template>

<script>
// Todo: quantity
import MinusIcon from '~/icons/MinusIcon'
import PlusIcon from '~/icons/PlusIcon'

export default {
  name: 'QuantityField',
  components: {
    PlusIcon,
    MinusIcon
  },
  props: {
    item: {
      type: Object,
      required: true
    },

    sm: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      internalValue: this.item.quantity
    }
  },

  computed: {
    quantity: {
      get() {
        return this.internalValue
      },
      set(val) {
        const isNegative = val <= 0 || val === ''
        this.internalValue = isNegative ? 1 : val
      }
    }
  },

  methods: {
    plus() {
      this.internalValue += 1
      this.internalValue = this.item.quantity + 1
      this.$emit('input', this.internalValue)
    },

    minus() {
      if (this.internalValue - 1 <= 0) {
        return
      }
      this.internalValue = this.item.quantity - 1
      this.$emit('input', this.internalValue)
    }
  }
}
</script>

<style lang="scss" module>
.qty {
  display: flex;
}

.input {
  appearance: none;
  border-radius: 0;
  border: 1px solid #dedede;
  color: #525252;
  font-size: rem-calc(12px);
  font-weight: $font-weight-base;
  line-height: 1.1;
  padding: rem-calc(5px 6px);
  pointer-events: none;
  text-align: center;
  width: rem-calc(34px); // i made it a bit bigger for two numbers

  &:not(:first-child) {
    border-left: 0;
  }

  &:not(:last-child) {
    border-right: 0;
  }

  .qty--sm & {
    font-size: rem-calc(12px);
    padding: rem-calc(5px 6px);
    width: rem-calc(34px);
  }
}

.btn {
  background: transparent;
  border: 1px solid #dedede;
  color: $gray-600;
  padding: rem-calc(7px);
  transition: color 150ms ease-in-out;
  width: rem-calc(26px);

  .qty--sm & {
    padding: rem-calc(7px);
    width: rem-calc(26px);
  }

  &:focus {
    border-color: $body-color;
    color: $body-color;
    outline: 0;
  }

  &__svg {
    display: block;
    fill: currentColor;
    height: rem-calc(10px);
    width: rem-calc(10px);
  }
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
</style>
