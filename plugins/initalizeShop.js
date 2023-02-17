async function backgroundTask(task) {
  return await task
}

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
  const before = Date.now()

  const hostname = process.client ? window.location.hostname : req.headers.host
  let _shopId = ''
  if (!$config.enableDevShop) {
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

  backgroundTask(store.dispatch('shop/fetchShop', shopId)).then()
  backgroundTask(store.dispatch('menu/fetchHeader', shopId)).then()
  backgroundTask(store.dispatch('shop/fetchCountries')).then()
  backgroundTask(store.dispatch('shop/fetchGlobalShopSections', shopId)).then()
  const after = new Date()

  console.log('Shop finisin in S', (after - before) / 1000)
}
