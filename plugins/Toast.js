class Toast {
  constructor(store) {
    this.store = store
  }

  open(message, options = {}) {
    options.message = message
    this.store.dispatch('toast/open', options)
  }

  close(id) {
    this.store.dispatch('toast/close', id)
  }

  closeAll() {
    this.store.dispatch('toast/closeAll')
  }

  closeActive() {
    this.store.dispatch('toast/closeActive')
  }

  error(message, options = {}) {
    options.type = 'error'
    this.open(message, options)
  }

  success(message, options = {}) {
    options.type = 'success'
    this.open(message, options)
  }

  info(message, options = {}) {
    options.type = 'info'
    this.open(message, options)
  }

  laravel(backendErrors = {}, options = {}) {
    // get errors fields
    const fields = Object.keys(backendErrors)

    // run only if there are any fields
    if (!fields.length) {
      return
    }

    const field = fields[0]

    // sometimes backend does not return field errors as array but as string or object
    const errors = Array.isArray(backendErrors[field])
      ? backendErrors[field]
      : Object.prototype.toString.call(backendErrors[field]) ===
        '[object Object]'
      ? Object.values(backendErrors[field])
      : [backendErrors[field]]

    if (!errors || !errors.length) {
      return
    }

    if (!options.type) {
      options.type = 'error'
    }

    this.open(errors[0], options)
  }

  catchLaravelErrors(e, options) {
    const { response } = e

    if (!response || !response.data || !response.data.errors) {
      if (!response) {
        this.error(e.message)
      } else if (!response.data) {
        this.error(response.statusText)
      } else if (response.data.message) {
        this.error(response.data.message)
      } else if (response.data.error) {
        this.error(response.data.error)
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

      this.error(error)
      return
    }

    this.laravel(errors, options)
  }
}

export default function ({ store }, inject) {
  const toast = new Toast(store)

  inject('toast', toast)
}
