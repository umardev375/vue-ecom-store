export default {
  computed: {
    hasWave() {
      return this.settings?.hasWave?.value || false
    },
    wave() {
      if (!this.hasWave) return false

      return {
        svg: this.settings?.wave?.value?.wave,
        color: this.settings?.wave?.value?.color
      }
    }
  }
}
