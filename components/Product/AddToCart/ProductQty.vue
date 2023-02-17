<template>
  <div :class="$style.group">
    <button type="button" :class="$style.btn" @click="minus">
      <MinusIcon :class="$style.btnSvg" />
    </button>
    <input
      v-model="internalValue"
      min="1"
      :class="$style.input"
      type="number"
    />
    <button type="button" :class="$style.btn" @click="plus">
      <PlusIcon :class="$style.btnSvg" />
    </button>
  </div>
</template>

<script>
import MinusIcon from '@/icons/MinusIcon'
import PlusIcon from '@/icons/PlusIcon'

export default {
  // Todo: Keep on mouse and count
  name: 'ProductQty',
  components: {
    PlusIcon,
    MinusIcon
  },
  props: {
    value: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      internalValue: this.value
    }
  },

  methods: {
    plus() {
      this.internalValue = this.internalValue + 1
      this.$emit('input', this.internalValue)
    },

    minus() {
      if (this.internalValue - 1 <= 0) {
        return
      }
      this.internalValue = this.internalValue - 1
      this.$emit('input', this.internalValue)
    },
    reset() {
      this.internalValue = 1
    }
  }
}
</script>

<style lang="scss" module>
.group {
  display: flex;
}

.input {
  appearance: none;
  border-radius: 3px;
  border: 1px solid var(--theme-primary-color);
  font-size: rem-calc(15px);
  font-weight: 700;
  height: rem-calc(48px);
  line-height: 1.2;
  width: rem-calc(48px);
  text-align: center;
  color: var(--theme-primary-color);
  &:not(:last-child) {
    border-left: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:not(:first-child) {
    border-right: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:focus {
    outline: 0;
  }

  /*&::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }*/
}

.btn {
  align-items: center;
  border-radius: 3px;
  border: 1px solid var(--theme-primary-color);
  cursor: pointer;
  color: var(--theme-primary-color);
  display: flex;
  height: rem-calc(48px);
  justify-content: center;
  user-select: none;
  width: rem-calc(48px);
  background: white;

  &:focus {
    border-color: $body-color;
    outline: none;
  }

  &:first-child:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:last-child:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &__svg {
    fill: currentColor;
    width: rem-calc(12px);
    height: rem-calc(12px);
  }
}
</style>
