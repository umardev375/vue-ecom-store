import deepmerge from 'deepmerge'

export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },

    updateMessage: {
      type: String,
      default: 'Item wurde geupdated'
    },
    createMessage: {
      type: String,
      default: 'Item wurde erstellt'
    }
  },

  data() {
    return {
      formData: {},
      formDataDefaults: {},
      loading: false
    }
  },

  computed: {
    buttonText() {
      if (this.item.id) return 'Änderungen Speichern'

      return 'Hinzufügen'
    },
    isNew() {
      return !this.item.id
    }
  },

  created() {
    this.formData = deepmerge({}, this.formDataDefaults)
    if (this.item.id) {
      this.formData = this.item
    }
  },

  methods: {
    setFormData(data, formDataKey = 'formData') {
      const formData = deepmerge(this.formData, data)
      Object.keys(formData).forEach((key) => {
        if (typeof formData[key] === 'undefined' || formData[key] === null) {
          formData[key] = this.formDataDefaults[key]
        }
      })
      this[formDataKey] = formData
    },

    validate() {
      // await this.$refs.validator.validate()
      return !this.loading && this.$refs.validator.validate()
    },

    resetErrors() {
      // get validation observer
      const validationObserver = this.$refs.validator

      // reset validationObserver if it exists
      if (validationObserver) {
        requestAnimationFrame(() => {
          validationObserver.reset()
        })
      }
    },

    resetForm() {
      // reset formData if we have defaults
      if (Object.keys(this.formDataDefaults).length) {
        this.formData = deepmerge({}, this.formDataDefaults)
      }

      this.resetErrors()
    },

    setLaravelErrors(backendErrors = {}) {
      if (!backendErrors) {
        return
      }

      // get errors fields
      const fields = Object.keys(backendErrors)

      // run only if there are any fields

      if (!fields.length) {
        return
      }

      // get validation observer
      const validationObserver =
        this.$refs && this.$refs.validator ? this.$refs.validator : null

      let toasted = false

      // get validation provider for each field
      fields.forEach((field) => {
        const validationProvider = validationObserver
          ? validationObserver.refs[field]
          : null

        // sometimes backend does not return field errors as array but as string or object
        const errors = Array.isArray(backendErrors[field])
          ? backendErrors[field]
          : Object.prototype.toString.call(backendErrors[field]) ===
            '[object Object]'
          ? Object.values(backendErrors[field])
          : [backendErrors[field]]

        // insert error if we have such validation provider
        // otherwise toast it

        if (validationProvider) {
          validationProvider.applyResult({
            errors,
            valid: false,
            failedRules: {}
          })
        } else {
          this.$toast.error(errors[0])
          toasted = true
        }
      })

      if (!toasted) {
        this.$toast.error(
          this.$t
            ? this.$t('The given data was invalid')
            : 'The given data was invalid'
        )
      }
    },

    catchLaravelErrors(e) {
      const { response } = e

      if (!response || !response.data || !response.data.errors) {
        if (!response) {
          this.$toast.error(e.message)
        } else if (!response.data) {
          this.$toast.error(response.statusText)
        } else if (response.data.message) {
          this.$toast.error(response.data.message)
        } else if (response.data.error) {
          this.$toast.error(response.data.error)
        }

        return
      }

      const {
        data: { errors }
      } = response

      if (Array.isArray(errors)) {
        let error = errors[0]

        while (Array.isArray(error)) {
          error = error[0]
        }

        this.$toast.error(error)
        return
      }

      this.setLaravelErrors(errors)
    }
  }
}
