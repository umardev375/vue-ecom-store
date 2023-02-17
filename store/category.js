export const state = () => ({
  categories: []
})

export const mutations = {
  SET(state, payload) {
    state.categories = payload
  }
}
export const getters = {
  random: (state) => {
    const categoryWithProducts = state.categories.filter(
      (cat) => cat.products_count > 0
    )

    return categoryWithProducts[
      (categoryWithProducts.length * Math.random()) | 0
    ]
  },

  noEmpty: (state) => {
    return state.categories.filter((cat) => cat.products_count > 0)
  }
}
export const actions = {
  async fetchAll({ commit }) {
    const { data: categories } = await this.$axios.$get('products/categories', {
      params: { shopId: this.$shopId }
    })

    commit('SET', categories)
  }
}
