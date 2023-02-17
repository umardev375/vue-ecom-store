<template>
  <BuilderRendererBase :rows="rows" />
</template>

<script>
import BuilderRendererBase from '@/components/Renderer/BuilderRendererBase'
export default {
  name: 'PreviewPage',
  components: { BuilderRendererBase },
  data() {
    return {
      child: null,
      rows: []
    }
  },
  mounted() {
    window.addEventListener('message', this.handleEvent)
  },

  methods: {
    handleEvent(e) {
      this.rows = e.data
    }
  }
}
</script>

<style lang="scss" scoped></style>
