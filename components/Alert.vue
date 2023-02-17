<template>
  <div class="alert" :class="alertClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AlertBanner',
  props: {
    variant: {
      type: String,
      default: 'info'
    }
  },
  computed: {
    alertClass() {
      return {
        'alert-success': this.variant === 'success',
        'alert-info': this.variant === 'info'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
