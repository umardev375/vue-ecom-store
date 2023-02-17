export const state = () => ({
  methods: []
})

export const mutations = {
  SET_METHODS(state, payload) {
    state.methods = payload
  },

  ADD_PAYMENT_METHOD(state, payload) {
    state.methods.unshift(payload)
  },

  REMOVE_PAYMENT_METHOD(state, payload) {
    const methodIndex = state.methods.findIndex(
      (method) => method.id === payload
    )

    // Vue.delete(state.paymentMethods, methodIndex)
    state.methods.splice(methodIndex, 1)
  }
}

export const getters = {
  default: (state) => {
    return state.methods.find((method) => method.default === 1)
  },

  stripe: (state) => {
    return state.methods.filter((method) => method.type === 'stripe')
  },

  papyal: (state) => {
    return state.methods.filter((method) => method.type === 'paypal')[0]
  }
}

export const actions = {
  async setDefault({ commit, dispatch }, id) {
    try {
      await this.$axios.post(`/paymentmethods/${id}/default`)

      await dispatch('fetch')
    } catch (e) {
      this.$toast.error(
        this.$i18n.t('Konnte Bezahlmöglichkeit nicht als Standard setzten')
      )
    }
  },

  async fetch({ commit }) {
    try {
      const { data: methods } = await this.$axios.$get('paymentmethods')
      commit('SET_METHODS', methods)
    } catch (e) {}
  },

  async removePaymentMethod({ commit }, id) {
    try {
      await this.$axios.delete(`paymentmethods/${id}`)

      commit('REMOVE_PAYMENT_METHOD', id)
    } catch (e) {
      console.log(e)
    }
  },

  async createPaypalMethod({ commit }) {
    try {
      const { data: paypalMethod } = await this.$axios.$post(
        '/paymentmethods',
        {
          type: 'paypal',
          default: false
        }
      )

      commit('ADD_PAYMENT_METHOD', paypalMethod)
    } catch (e) {}
  }
}
