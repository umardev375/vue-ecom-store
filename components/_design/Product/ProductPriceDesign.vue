<template>
  <p :class="$style.el">From $399</p>
</template>

<script>
export default {
  name: 'ProductPriceDesign'
}
</script>

<style lang="scss" module>
.el {
  @include font-size(20px);
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0;
}
</style>
