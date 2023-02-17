<template functional>
  <div :class="[$style.group, { [$style.groupMbSm]: props.mbSm }]">
    <slot name="beforeTitle"></slot>
    <h4 v-if="props.title" :class="$style.title">{{ props.title }}</h4>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CheckoutGroup',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    mbSm: {
      type: Boolean,
      default: false
    },
    last: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" module>
.group {
  margin-bottom: rem-calc(40px);

  &--mb-sm {
    margin-bottom: rem-calc(40px);
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.title {
  font-size: rem-calc(15px);
  margin-bottom: rem-calc(12px);
  color: var(--theme-primary-color);
}
</style>
