<template>
  <span :class="[$style.el, { [$style.elBlack]: black }]">{{ title }}</span>
</template>

<script>
export default {
  name: 'ProductBadge',
  props: {
    title: {
      type: String,
      required: true
    },

    black: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" module>
.el {
  @include font-size(9px);
  background-color: var(--theme-secondary-color);
  border-radius: 3px;
  color: #fff;
  display: inline-block;
  line-height: 1.2;
  padding: rem-calc(5px 8px 3px);
  text-transform: uppercase;

  &--black {
    background-color: var(--theme-primary-color);
  }
}
</style>
