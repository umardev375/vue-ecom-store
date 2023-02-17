export default async function initalizeShop(
  {
    $config,
    store,
    $axios,
    redirect,
    $auth,
    $storage,
    error,
    route,
    req,
    app: { localePath, getRouteBaseName }
  },
  inject
) {
  const hostname = process.client ? window.location.hostname : req.headers.host
  let _shopId = ''
  if (!process.dev) {
    try {
      const response = await $axios.$get('shops/search', {
        params: {
          domain: hostname
        }
      })

      _shopId = response.data[0].id
    } catch (e) {
      inject('maintenance', true)
      return redirect(localePath({ name: 'maintenance' }))
    }
  } else {
    _shopId = $config.devShop
  }

  const shopId = route.query?.shopId || _shopId

  inject('shopId', shopId)

  if (!shopId) {
    redirect(localePath({ name: 'maintenance' }))
    return
  }

  try {
    await Promise.all([
      await store.dispatch('shop/fetchShop', shopId),

      await store.dispatch('shop/fetchGlobalShopSections', shopId)
    ])
  } catch (e) {
    console.error(e)
  }
}
