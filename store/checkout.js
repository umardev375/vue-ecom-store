import { getField, updateField } from 'vuex-map-fields'

const defaultAddressFields = {
  countryId: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  zip: '',
  company: '',
  firstname: '',
  lastname: '',
  id: '',
  vat: '',
  defaultBilling: false,
  defaultDelivery: false
}

export const state = () => ({
  invoiceAddress: {
    ...defaultAddressFields
  },

  deliveryAddress: { ...defaultAddressFields },

  shippingMethod: 'free',
  paymentMethod: null,

  hasPaymentMethod: false,
  mode: 'guest'
})

export const getters = {
  getField
}

export const mutations = {
  updateField,

  SET_MODE(state, payload) {
    state.mode = payload
  },

  SET_HAS_PAYMENT_METHOD(state, payload) {
    state.hasPaymentMethod = payload
  },

  SET_ADDRESS(state, { path, address }) {
    state[path] = { ...defaultAddressFields, ...address }
  },

  RESET_ADDRESS(state, path) {
    state[path] = defaultAddressFields
  },

  CHANGE_SHIPPING_METHOD(state, payload) {
    state.shippingMethod = payload
  },

  CHANGE_PAYMENT_METHOD(state, payload) {
    state.paymentMethod = payload
  }
}

export const actions = {
  setShippingMethod({ commit }, method) {
    commit('CHANGE_SHIPPING_METHOD', method)
  },

  async createAddressAndSet({ commit }, { address, path }) {
    try {
      const { data: serverAddress } = await this.$axios.$post(
        'shops/customers/addresses',
        address
      )

      commit('SET_ADDRESS', { path, address: serverAddress })
    } catch (e) {}
  }

  /*
  setPaymentMethod({ commit }, method) {
    commit('CHANGE_PAYMENT_METHOD', method)
  } */
}
