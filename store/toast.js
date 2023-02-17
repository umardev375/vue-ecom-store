let lastId = 0

export const state = () => ({
  all: []
})

export const getters = {
  ids: (state) => state.all.map((toast) => toast.id),
  all: (state) => state.all,
  any: (state) => Boolean(state.all.length),
  activeId: (state) =>
    state.all.length ? state.all[state.all.length - 1].id : null
}

export const actions = {
  open({ commit }, payload) {
    commit('OPEN', payload)
  },

  close({ commit }, id) {
    commit('CLOSE', id)
  },

  closeActive({ commit, getters }) {
    commit('CLOSE', getters.activeId)
  },

  closeAll({ commit }) {
    commit('CLOSE_ALL')
  }
}

export const mutations = {
  OPEN(state, payload = {}) {
    if (!payload.id) {
      payload.id = `toast-${(lastId += 1)}`
    }

    // add toast
    state.all.push(payload)
  },

  CLOSE(state, id) {
    if (!id) {
      return
    }

    const removeIndex = state.all.findIndex((toast) => toast.id === id)

    if (removeIndex !== -1) {
      state.all.splice(removeIndex, 1)
    }
  },

  CLOSE_ALL(state) {
    state.all = []
  }
}
