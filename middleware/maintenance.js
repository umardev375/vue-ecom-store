export default function CheckForMaintenance({
  store,
  redirect,
  app: { localePath, getRouteBaseName }
}) {
  const isMaintenanceShop = store.state.shop.maintenance
  const isMaintenancePage = getRouteBaseName() === 'maintenance'

  if (!isMaintenanceShop && isMaintenancePage)
    return redirect(localePath({ name: 'index' }))

  if (isMaintenanceShop) {
    // Here we need to check the loggedin user

    if (isMaintenancePage) return
    return redirect(503, localePath({ name: 'maintenance' }))
  }
}
