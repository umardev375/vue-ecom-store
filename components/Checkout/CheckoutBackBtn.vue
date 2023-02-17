<template>
  <NuxtLink :to="to" class="btn-link">
    <CadetIcon :class="$style.btnSvg" />
    <slot></slot>
  </NuxtLink>
</template>

<script>
import CadetIcon from '@/icons/CadetIcon'

export default {
  name: 'CheckoutBackBtn',
  components: { CadetIcon },
  props: {
    to: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" module>
.btn__svg {
  height: 0.833em;
  margin-right: 1em;
  width: 0.833em;
}
</style>
