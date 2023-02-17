<template>
  <div class="d-flex flex-wrap pt-5">
    <div
      v-for="(color, i) in theme"
      :key="i"
      class="col-auto color m-5 p-5"
      :style="{ backgroundColor: color }"
    >
      {{ color }} - {{ i }}
    </div>

    <pre>{{ theme }}</pre>
  </div>
</template>

<script>
export default {
  name: 'Theme',
  inject: ['theme']
}
</script>

<style lang="scss" scoped></style>
