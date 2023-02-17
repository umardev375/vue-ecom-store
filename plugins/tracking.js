// <script async defer data-domain="coz1geyufo.shop.volv.cpi.ninja" src="https://analytics.volv.com/js/plausible.js"></script>

//
import Plausible from 'plausible-tracker'

let isTracking = false
export default function plausibleTracking(
  { $shopId, store, $storage },
  inject
) {
  if (isTracking) return

  $storage.watchState('PLAUSIBLE_DOMAIN', (domain) => {
    if (isTracking) return
    if (domain) {
      const plausible = new Plausible({
        domain,
        trackLocalhost: false,
        apiHost: 'https://analytics.volv.com'
      })
      isTracking = true
      plausible.enableAutoPageviews()
      inject('plausible', plausible)
    }
  })

  // const plausible = new Plausible
}
