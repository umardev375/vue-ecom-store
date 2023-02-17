export default {
  watch: {
    $route() {
      this.close()
    }
  },
  methods: {
    close() {
      this.$store.dispatch('modal/close')
    }
  }
}
