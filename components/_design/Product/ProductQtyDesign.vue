<template>
  <div :class="$style.group">
    <div :class="$style.btn">
      <MinusIcon :class="$style.btnSvg" />
    </div>
    <input min="1" value="1" :class="$style.input" type="number" />
    <div :class="$style.btn">
      <PlusIcon :class="$style.btnSvg" />
    </div>
  </div>
</template>

<script>
import MinusIcon from '@/icons/MinusIcon'
import PlusIcon from '@/icons/PlusIcon'
export default {
  name: 'ProductQtyDesign',
  components: { PlusIcon, MinusIcon }
}
</script>

<style lang="scss" module>
.group {
  display: flex;
}

.input {
  appearance: none;
  border-radius: 3px;
  border: 1px solid #e3e3e3;
  font-size: rem-calc(15px);
  font-weight: 700;
  height: rem-calc(48px);
  line-height: 1.2;
  width: rem-calc(48px);
  text-align: center;

  &:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:focus {
    outline: 0;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
}
.btn {
  align-items: center;
  border-radius: 3px;
  border: 1px solid #e3e3e3;
  cursor: pointer;
  display: flex;
  height: rem-calc(48px);
  justify-content: center;
  user-select: none;
  width: rem-calc(48px);

  &:first-child:not(:last-child) {
    border-right-color: transparent;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:last-child:not(:first-child) {
    border-left-color: transparent;
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
