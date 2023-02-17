<template>
  <div class="variant" :class="{ 'variant--light': light }">{{ variant }}</div>
</template>

<script>
export default {
  name: 'VariantBadget',
  props: {
    variant: {
      type: String,
      default: ''
    },
    light: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.variant {
  @include font-size(12px);
  border-radius: rem-calc(4px);

  color: #283976;
  line-height: 1.2;
  margin-right: rem-calc(4px);
  overflow: hidden;
  font-weight: 400;
  position: relative;
  padding: rem-calc(4px);

  //background: var(--theme-secondary-color);
  border: 1px solid #e3e3e3;

  &--light {
    color: white;
    border-color: rgba(#e3e3e3, 0.4);
  }
}
</style>
