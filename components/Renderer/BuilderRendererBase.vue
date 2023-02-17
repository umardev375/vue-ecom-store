<template>
  <div>
    <BuilderRow v-for="row in rows" :key="row.id" :row="row" />
  </div>
</template>

<script>
import BuilderRow from '@/components/Renderer/BuilderRow'

export default {
  name: 'BuilderRendererBase',
  components: { BuilderRow },

  props: {
    rows: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
