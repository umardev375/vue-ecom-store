export const state = () => ({
  all: []
})

export const mutations = {
  SET_ALL(state, payload) {
    payload.forEach((addr) => {
      // Fill empty  values with empty strings
      Object.keys(addr).forEach((key) => {
        if (key === 'country') {
          addr.countryId = addr[key]
        }

        if (!addr[key]) {
          addr[key] = ''
        }
      })
    })

    state.all = payload
  },

  REMOVE(state, id) {
    const adressIndex = state.all.findIndex((addr) => addr.id === id)

    state.all.splice(adressIndex, 1)
  },

  SET_DEFAULT(state, { id, type }) {
    const currentDefaultIndex = state.all.findIndex(
      (address) => address[type] === 1
    )

    if (currentDefaultIndex > -1) {
      state.all[currentDefaultIndex][type] = 0
    }

    const newDefaultIndex = state.all.findIndex((address) => address.id === id)

    state.all[newDefaultIndex][type] = 1
  }
}
export const getters = {
  defaultDelivery(state) {
    return state.all.find((address) => address.defaultDelivery === 1) || {}
  },

  defaultBilling(state) {
    return state.all.find((address) => address.defaultBilling === 1) || {}
  },

  delivery: (state) => {
    return state.all
      .map((address) => {
        const title = `${address.defaultDelivery ? 'Default - ' : ''} ${
          address.addressLine1
        }`
        return {
          title,
          ...address
        }
      })
      .sort((a, b) => (a.defaultDelivery > b.defaultDelivery ? -1 : 1))
  },

  billing: (state) => {
    return state.all
      .map((address) => {
        const title = `${address.defaultBilling ? 'Default - ' : ''} ${
          address.addressLine1
        }`

        return {
          title,
          ...address
        }
      })
      .sort((a, b) => (a.defaultBilling > b.defaultBilling ? -1 : 1))
  }
}

export const actions = {
  async fetch({ commit }) {
    const { data: all } = await this.$axios.$get(
      'shops/customers/addresses',
      {}
    )

    commit('SET_ALL', all)
  },

  async add({ commit, dispatch }, payload) {
    try {
      // const { data: address } = await this.$axios.$post(
      //   'shops/customers/addresses',
      //   payload
      // )
      await this.$axios.$post('shops/customers/addresses', payload)

      // commit('ADD_NEW_ADDRESS', address)
      // reload addresses
      await dispatch('fetch')
    } catch (e) {}
  },

  async remove({ commit }, addressId) {
    /// shops/customers/addresses/{id}

    try {
      await this.$axios.$delete(`/shops/customers/addresses/${addressId}`)
      commit('REMOVE', addressId)
    } catch {}
  },

  /**
   *
   * @param commit
   * @param {object} address
   * @param {string} type - billing or delivery
   * @returns {Promise<void>}
   */

  async setDefault({ commit }, { address, type }) {
    const types = {
      billing: 'defaultBilling',
      delivery: 'defaultDelivery'
    }
    try {
      await this.$axios.$put(`shops/customers/addresses/${address.id}`, {
        ...address,
        [types[type]]: 1,
        countryId: address.country
      })

      commit('SET_DEFAULT', { id: address.id, type: types[type] })
    } catch (e) {}
  }
}
