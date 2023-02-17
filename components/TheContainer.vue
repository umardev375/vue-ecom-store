<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TheContainer',

  props: {
    centered: {
      type: Boolean,
      default: false
    },
    lg: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" module>
.container {
  flex: 1 1 auto;
  margin: 0 auto;
  position: relative;
  max-width: $wrapper-inner-width;

  &--lg {
    max-width: $wrapper-inner-width-lg;
  }

  @media (max-width: $wrapper-width) {
    margin: rem-calc(0 $wrapper-padding);
  }

  @media (max-width: $wrapper-width-lg) {
    &--lg {
      margin: rem-calc(0 $wrapper-padding);
    }
  }

  @include media-breakpoint-down(sm) {
    margin: rem-calc(0 $wrapper-padding-sm);
  }
}
</style>
