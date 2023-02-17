<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CategoryWidgetTabs',
  methods: {
    close() {
      this.$children.forEach((child) => {
        child.close()
      })
    }
  }
}
</script>

<style lang="scss" module></style>
