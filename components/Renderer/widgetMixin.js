export default {
  props: {
    data: {
      required: true,
      type: [Object, Array]
    },
    settings: {
      type: [Object, Array],
      default: () => {}
    }
  }
}
