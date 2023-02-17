export default async function cart({ $auth, $shopId, store, $isInFrame }) {
  // console.log(app.getRouteBaseName())
  // Todo: handle checkout-thank-you after paypal redirect
  // Todo: move logic in initalizeShop
  // if ($maintenance) return
  if (!$shopId || $isInFrame) {
    if (!$shopId) {
      console.error('Cart cannot be initalized witouth a Shop id')
    } else {
      console.error('Shop will not work fully in Preview mode')
      return
    }
  }
  // Todo: make it in the background so we dont block rendering
  await store.dispatch('cart/initalize')

  $auth.$storage.watchState('loggedIn', async (loggedIn) => {
    const isGhost = store.state.auth.user.isGhost
    //  inject('ghost', isGhost)
    if (loggedIn) {
      await store.dispatch('cart/merge', isGhost)
    } else {
      await store.dispatch('cart/afterLogout')
    }
  })

  // inject('ghost', false)
}
