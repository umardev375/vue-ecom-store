<template>
  <div class="widget-header">
    <h3>
      {{ globalSettings.title.value }}
    </h3>
    <p v-if="globalSettings.subtext.value">
      {{ globalSettings.subtext.value }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'WidgetHeader',
  props: {
    globalSettings: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
