import Vue from 'vue'

export const defaultState = {
  items: [],
  item: {}
}

export const defaultMutations = {
  SET_ITEMS(state, payload) {
    //  state.items = payload

    Vue.set(state, 'items', payload)
  }
}

export const defaultActions = {
  async fetchAll({ commit }, { url, params = {}, get = '' }) {
    params.shopId = this.$shopId // Comes  from injection

    try {
      const { data: items } = await this.$axios.$get(url, { params })

      commit('SET_ITEMS', get ? items[get] : items)
    } catch (e) {
      console.log(e.response)
    }
  }
}
