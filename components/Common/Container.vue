<template functional>
  <div
    class="container-bg"
    :class="props.full ? 'container-full' : 'container'"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Container',
  props: {
    full: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.container-bg {
  background: white;

  @include media-breakpoint-up(md) {
    padding-top: rem-calc(80px);
  }

  /* padding: 14px 14px;
  @include media-breakpoint-up(md) {
    padding: 65px 80px;
  }*/
}
</style>
