export const state = () => ({
  id: false
})

export const getters = {
  is(state) {
    return (id) => {
      return state.id === id
    }
  }
}

export const actions = {
  open({ commit }, id) {
    commit('SET', id)
  },

  close({ commit }) {
    commit('SET', 0)
  }
}

export const mutations = {
  SET(state, id) {
    state.id = id
  }
}
