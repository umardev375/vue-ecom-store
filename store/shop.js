export const state = () => ({
  current: {},
  header: {},
  footer: {},
  countries: [],
  settings: {
    currency: '€'
  },
  maintenance: false
})

export const getters = {
  isPublic(state) {
    return state.current.status === 'APPROVED'
  }
}

export const mutations = {
  SET_MAINTENANCE(state, payload) {
    state.maintenance = payload
  },
  SET_COUNTRIES(state, payload) {
    state.countries = payload
  },
  SET_SHOP(state, payload) {
    state.current = payload
  },

  SET_GLOBAL_SECTION(state, payload) {
    const globalSection = payload.type.toLowerCase()
    state[globalSection] = payload
  }
}

export const actions = {
  async fetchShop({ commit }, shopId) {
    const { data: shop } = await this.$axios.$get(`shops/${shopId}`)
    this.$storage.setUniversal('PLAUSIBLE_DOMAIN', shop.plausibleDomain)
    commit('SET_SHOP', shop)
  },
  async fetchCountries({ commit }) {
    try {
      const { data: countries } = await this.$axios.$get('base/countries')

      commit('SET_COUNTRIES', countries)
    } catch (e) {}
  },
  async fetchGlobalShopSections({ commit }, shopId) {
    try {
      const { data: sections } = await this.$axios.$get('pages/sections', {
        params: { shopId }
      })

      for (const section of sections) {
        commit('SET_GLOBAL_SECTION', section)
      }
    } catch (e) {}
  }
}
