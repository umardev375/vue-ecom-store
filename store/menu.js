export const state = () => ({
  headerMenu: [],
  loading: false
})

export const mutations = {
  SET(state, payload) {
    state.all = payload
  },
  SET_HEADERMENU(state, payload) {
    state.headerMenu = payload
  },

  SET_LOADING(state, payload) {
    state.loading = payload
  }
}

export const actions = {
  // Tood: make a factory function
  async fetchHeader({ commit }, params) {
    const defaultParams = {
      shopId: this.$shopId,
      ...params
    }

    try {
      commit('SET_LOADING', true)
      const { data: menus } = await this.$axios.$get('/shops/menus', {
        params: {
          load: ['children.value'],
          location: 'HEADERMENU',
          shopId: this.$shopId
        }
      })

      commit('SET_HEADERMENU', menus[0])
    } catch (e) {
    } finally {
      commit('SET_LOADING', false)
    }
  }
}
