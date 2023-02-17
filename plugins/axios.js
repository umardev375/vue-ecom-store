export default function ({ $axios, $shopId }) {
  console.log('Axios rewquest')
  $axios.onRequest((config) => {
    config.params = config.params || {}
    config.params.shopId = $shopId
    console.log(config.params)
    return config
  })
}
