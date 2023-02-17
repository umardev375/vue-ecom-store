import '@/polyfill/crypto'
import { nanoid } from 'nanoid'
import { GUEST_CART, CART_PARAMS } from '@/utils/constats'
import Vue from 'vue'

const defaultState = () => {
  return {
    cart: { items: [] },
    total: {
      formatted: '0,00 EUR'
    },
    totalNet: {
      formatted: '0,00 EUR'
    },
    totalVat: {
      formatted: '0,00 EUR'
    },

    shipping: {},

    open: false,
    isBusy: false,
    isMerging: 'NO'
  }
}
/*
const cartParams = {
 load: ['items.product']
}
*/
export const state = () => defaultState()

export const getters = {
  preSale(state) {
    const cartProducts = state.cart.items.map((item) => item.product.stocks[0])

    return cartProducts.some((prod) => {
      return prod.availableAmount <= 0
    })
  },

  itemCount: (state) => {
    if (!state.cart.items || state.cart.items.length === 0) return 0
    return state.cart.items.length
  },

  items: (state) => {
    return state.cart.items
  },

  total: ({ cart }) => {
    const { total, totalNet, totalVat, shipping } = cart

    return {
      total,
      net: totalNet,
      vat: totalVat,
      shipping
    }
  }
}

export const mutations = {
  SET_MERGING(state, payload) {
    state.isMerging = payload
  },

  SET_SHIPPING(state, payload) {
    state.shipping = payload
  },

  TOGGLE_CART(state, payload) {
    state.open = payload
  },

  UPDATE_CART_TOTAL({ cart }, payload) {
    for (const val of ['totalBat', 'total', 'totalNet']) {
      cart[val] = payload[val]
    }
  },

  REMOVE_ITEM(state, payload) {
    const itemIndex = state.cart.items.findIndex((item) => item.id === payload)
    state.cart.items.splice(itemIndex, 1)
  },

  RESET(state) {
    Object.assign(state, defaultState())
  },

  SET_CART(state, payload) {
    console.log('SET_CART', payload)
    state.cart = payload
  },

  ADD_ITEM(state, payload) {
    const itemIndex = state.cart.items.findIndex(
      (item) => item.id === payload.id
    )

    if (itemIndex > -1) {
      Vue.set(state.cart.items, itemIndex, payload)
    } else {
      state.cart.items.push(payload)
    }
  }
}

export const actions = {
  // Todo: for geust we need to pass identity
  async getShipping({ commit, state }) {
    if (state.cart.items.length === 0) return

    try {
      const { data: shipping } = await this.$axios.$get(
        `/shops/customers/carts/shipping/${state.cart.id}`,
        {
          params: {
            identity: this.$auth.loggedIn ? undefined : state.cart.identity,
            shopId: this.$shopId
          }
        }
      )

      commit('SET_SHIPPING', shipping)
    } catch (e) {}
  },

  async initalize({ dispatch, rootState, commit }) {
    if (!rootState.auth.loggedIn) {
      const guestHasCart = this.$storage.getUniversal(GUEST_CART)
      // When Guest has no cart
      if (!guestHasCart) {
        try {
          await dispatch('createGuestCart')
        } catch (e) {
          console.error(e.response)
        }
      } else {
        // Guest has a Cart
        try {
          await dispatch('getCartFromGuest')
        } catch (e) {
          await dispatch('createGuestCart')
          console.error(e.response)
        }
      }
    } else {
      // Handle Customer
      try {
        await dispatch('getLatestCartFromCustomer')
      } catch (e) {
        await dispatch('createCustomerCart')
      }
    }
  },

  async createGuestCart({ commit }) {
    const { data: cart } = await this.$axios.$post(
      'shops/customers/carts',
      {
        identity: nanoid(),
        shopId: this.$shopId
      },
      {
        params: {
          ...CART_PARAMS
        }
      }
    )

    this.$storage.setUniversal(GUEST_CART, cart)
    commit('SET_CART', cart)
  },

  async createCustomerCart({ commit, rootState }, isGhost) {
    try {
      const customerId = this.$auth.user.customer.id
      // Todo: Find a better way to handle when in build mode
      const { data: customerCart } = await this.$axios.$post(
        'shops/customers/carts',
        {
          customerId,
          shopId: this.$shopId
        },
        { params: { ...CART_PARAMS } }
      )

      if (!isGhost) {
        commit('SET_CART', customerCart)
        this.$storage.removeUniversal(GUEST_CART)
      }
      return customerCart
    } catch (e) {
      console.error(e)
    }
  },

  async getCartFromGuest({ commit, state, dispatch }) {
    const { id: cartId, identity } = this.$storage.getUniversal(GUEST_CART)

    const { data: currentCart } = await this.$axios.$get(
      `shops/customers/carts/${cartId}`,
      {
        params: {
          shopId: this.$shopId,
          identity,
          ...CART_PARAMS
        }
      }
    )

    commit('SET_CART', currentCart)
    try {
      await dispatch('getShipping', currentCart.id)
    } catch (e) {}
  },

  async getLatestCartFromCustomer({ commit, dispatch }) {
    // Let the error throw
    const { data: customerCart } = await this.$axios.$get(
      'shops/customers/carts/latest',
      {
        params: { ...CART_PARAMS }
      }
    )
    commit('SET_CART', customerCart)
    await dispatch('getShipping')
    return customerCart
  },

  async merge({ commit, state, dispatch }, isGhost) {
    if (state.cart.items.length) {
      const { id: guestCartId, identity } = this.$storage.getUniversal(
        GUEST_CART
      )

      try {
        let customerCart
        if (!isGhost) {
          customerCart = await dispatch('getLatestCartFromCustomer')
        } else {
          console.log('create customer cart for ghost')
          customerCart = await dispatch('createCustomerCart', isGhost)
          console.log('Customer Caret for ghost', customerCart)
        }
        const { data: mergedCart } = await this.$axios.$post(
          'shops/customers/carts/merge',
          {
            mergeToCartId: customerCart.id,
            mergeFromCartId: guestCartId,
            mergeFromIdentity: identity
          },
          { params: { ...CART_PARAMS } }
        )
        console.log('MERGE COMPLETE', mergedCart)
        commit('SET_CART', mergedCart)
        this.$storage.removeUniversal(GUEST_CART)
      } catch (e) {
        console.log(e)
        if (e.response.status === 404) {
          await dispatch('createCustomerCart')
        }
      }
    } else {
      try {
        const customerCart = await dispatch('getLatestCartFromCustomer')
        commit('SET_CART', customerCart)
        this.$storage.removeUniversal(GUEST_CART)
      } catch (e) {
        await dispatch('createCustomerCart')
      } finally {
        // @todo
      }
    }
  },

  async afterLogout({ commit, dispatch }) {
    this.$storage.removeUniversal(GUEST_CART)
    commit('RESET')
    await dispatch('initalize')
  },

  async addItem({ commit, dispatch, rootState, state }, { product, quantity }) {
    const formData = {
      cartId: state.cart.id,
      productId: product.id,
      identity: state.cart.identity,
      quantity,
      customerId: this.$auth?.user?.customer?.id
    }

    try {
      const { data: item } = await this.$axios.$post(
        'shops/customers/carts/items',
        formData,
        {
          params: { load: ['product.stocks'] }
        }
      )

      commit('ADD_ITEM', item)
      await dispatch('updateCartTotal')
      await dispatch('getShipping')
    } catch (e) {
      console.error(e)
    }
  },

  async cleanCart({ commit, state, dispatch }) {
    const id = state.cart.id
    const identity = state.cart.identity
    try {
      const { data: cleanedCart } = await this.$axios.$post(
        'shops/customers/carts/clear',
        { id, identity },
        { params: { load: ['items'] } }
      )

      commit('SET_CART', cleanedCart)
    } catch (e) {
      console.error(e.response)
    }
  },

  async removeItem({ commit, dispatch, state }, itemId) {
    try {
      /// shops/customers/carts/items/{id}
      await this.$axios.$delete(`/shops/customers/carts/items/${itemId}`, {
        params: { identity: state.cart.identity }
      })
      this.$toast.success(`${this.$i18n.t('Product removed')}`)
      commit('REMOVE_ITEM', itemId)
      await dispatch('updateCartTotal')
    } catch (e) {
      console.error(e)
    }
  },

  async updateQuantity({ commit, state, dispatch }, { productId, quantity }) {
    try {
      const { data: newItem } = await this.$axios.$put(
        `shops/customers/carts/items/${productId}`,
        {
          quantity,
          identity: state.cart.identity
        },
        {
          params: {
            load: ['product.stocks']
          }
        }
      )

      commit('ADD_ITEM', newItem)
      await dispatch('updateCartTotal')
      //  await dispatch('updateCartTotal')
    } catch (e) {
      console.error(e.response)
    }
  },

  async updateCartTotal({ commit, dispatch, state }) {
    const { data: cart } = await this.$axios.$get(
      `shops/customers/carts/${state.cart.id}`,

      {
        params: {
          identity: state.cart.identity,
          ...CART_PARAMS
        }
      }
    )

    commit('UPDATE_CART_TOTAL', cart)
    // await dispatch('updateCartTotal')
  }
}
