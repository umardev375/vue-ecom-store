export const state = () => ({
  all: [],
  meta: {},
  loading: false
})

export const mutations = {
  SET(state, payload) {
    state.all = payload
  },

  SET_META(state, payload) {
    state.meta = payload
  },

  SET_LOADING(state, payload) {
    state.loading = payload
  }
}

export const actions = {
  // Tood: make a factory function
  async fetchAll({ commit }, params) {
    const defaultParams = {
      pageLength: 10,
      page: 1,
      sortField: 'created_at',
      sortDirection: 'DESC',
      shopId: this.$shopId,
      ...params
    }

    try {
      commit('SET_LOADING', true)
      const { data: products, meta: productMeta } = await this.$axios.$get(
        'products',
        {
          params: { ...defaultParams, ...params }
        }
      )

      commit('SET', products)
      commit('SET_META', productMeta)
    } catch (e) {
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async search({ commit }, params) {
    const defaultParams = {
      pageLength: 10,
      page: 1,
      sortField: 'created_at',
      sortDirection: 'DESC',
      shopId: this.$shopId,
      ...params
    }

    try {
      commit('SET_LOADING', true)
      const { data: products, meta: productMeta } = await this.$axios.$get(
        'products/search',
        {
          params: { ...defaultParams, ...params }
        }
      )

      commit('SET', products)
      commit('SET_META', productMeta)
    } catch (e) {
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async byCategory({ commit }, params) {
    const defaultParams = {
      shopId: this.$shopId,

      ...params
    }

    try {
      commit('SET_LOADING', true)
      const { data: products, meta: productMeta } = await this.$axios.$get(
        'products/categories',
        {
          params: defaultParams
        }
      )

      commit('SET', products[0].products)
      commit('SET_META', productMeta)
    } catch (e) {
    } finally {
      commit('SET_LOADING', false)
    }
  }
}
