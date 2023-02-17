import { extend, configure } from 'vee-validate'
/* eslint-disable */
import {
  required,
  email,
  is_not,
  min,
  max,
  min_value,
  max_value,
  regex,
  numeric,
  confirmed
} from 'vee-validate/dist/rules'

// Add the rules you need.
extend('required', required)
extend('email', email)
extend('min_value', min_value)
extend('max_value', max_value)
extend('min', min)
extend('max', max)
extend('regex', regex)
extend('numeric', numeric)
extend('confirmed', confirmed)
extend('is_not', is_not)

// setInteractionMode('eager');

export default function VeeValidatePlugin({ app }) {
  configure({
    defaultMessage: (_, values) =>
      app.i18n.t(`validations.${values._rule_}`, values)
  })
}
