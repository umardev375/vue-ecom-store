import validations from 'vee-validate/dist/locale/en.json'

const customValidations = {}
export default {
  validations: { ...validations.messages, ...customValidations }
}
