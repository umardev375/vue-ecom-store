<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="left">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutFooter'
}
</script>

<style lang="scss" module></style>
