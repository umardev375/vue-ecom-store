<template>
  <div :class="$style.el">
    <h4 :class="$style.title">{{ title }}</h4>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ProductAttributeSectionDesign',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" module>
.title {
  @include font-size(12px);
  line-height: (23 / 12);
  margin-bottom: rem-calc(10px);
}
</style>
