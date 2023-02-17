export const state = () => ({
  all: [],
  meta: {}
})

export const mutations = {
  SET_ORDERS(state, payload) {
    state.all = payload
  },

  SET_META(state, payload) {
    state.meta = payload
  }
}
export const getters = {}

export const actions = {
  async fetch({ commit }, params = {}) {
    const defaultParams = {
      customerId: this.$auth.user.customer.id,
      pageLength: 10,
      page: 1,
      sortField: 'created_at',
      load: ['orderProducts.product', 'returnOrders'],
      sortDirection: 'DESC',
      ...params
    }

    const { data: orders, meta } = await this.$axios.$get('orders', {
      params: { ...defaultParams }
    })

    commit('SET_META', meta)
    commit('SET_ORDERS', orders)
  }
}
