<template>
  <div class="header mb-4">
    <h1 v-if="title" class="title mb-2">
      {{ title }}
    </h1>
    <p v-if="hasDefaultSlot">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'TwoColHeader',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    hasDefaultSlot() {
      return !!this.$slots.default
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  color: var(--theme-primary-color);
}
</style>
