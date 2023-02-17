const defaultState = () => {
  return {
    open: false
  }
}
export const state = () => defaultState()

export const mutations = {
  TOGGLE_SEARCH(state, payload) {
    state.open = payload
  }
}
