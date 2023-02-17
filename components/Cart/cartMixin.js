export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  methods: {
    async deleteItem(id) {
      await this.$store.dispatch('cart/removeItem', id)
      await this.$store.dispatch('cart/getShipping')
    },
    async updateQuantity(newQuantity) {
      await this.$store.dispatch('cart/updateQuantity', {
        productId: this.item.id,
        quantity: newQuantity
      })
    }
  }
}
