export default function closeDrawer({ store }) {
  if (store.state.cart.open) store.commit('cart/TOGGLE_CART', false)
}
