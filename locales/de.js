import validations from 'vee-validate/dist/locale/de.json'
import shop from '@/locales/de/shop'
import auth from '@/locales/de/auth'
import checkout from '@/locales/de/checkout'
import common from '@/locales/de/common'
const customValidations = {}
export default {
  auth,
  hello: 'Hallo Welt',
  validations: { ...validations.messages, ...customValidations },
  shop,
  checkout,
  common
}
