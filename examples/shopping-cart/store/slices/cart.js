import shop from '../../api/shop'

// initial state
// shape: [{ id, quantity }]
const state = {
  items: [],
  checkoutStatus: null
}

// getters
// const getters = {
//   cartProducts: (state, getters, rootState) => {
//     return state.items.map(({ id, quantity }) => {
//       const product = rootState.products.all.find(product => product.id === id)
//       return {
//         title: product.title,
//         price: product.price,
//         quantity
//       }
//     })
//   },
//
//   cartTotalPrice: (state, getters) => {
//     return getters.cartProducts.reduce((total, product) => {
//       return total + product.price * product.quantity
//     }, 0)
//   }
// }

// actions
const effects = {
  checkout ({ dispatch, state }, products) {
    const savedCartItems = [...state.items]
    dispatch('setCheckoutStatus', null)
    // empty cart
    dispatch('setCartItems', { items: [] })
    shop.buyProducts(
      products,
      () => dispatch('setCheckoutStatus', 'successful'),
      () => {
        dispatch('setCheckoutStatus', 'failed')
        // rollback to the cart saved before sending the request
        dispatch('setCartItems', { items: savedCartItems })
      }
    )
  },

  addProductToCart ({ state, dispatch }, product) {
    dispatch('setCheckoutStatus', null)
    if (product.inventory > 0) {
      const cartItem = state.items.find(item => item.id === product.id)
      if (!cartItem) {
        dispatch('pushProductToCart', { id: product.id })
      } else {
        dispatch('incrementItemQuantity', cartItem)
      }
      // remove 1 item from stock
      dispatch('products@decrementProductInventory', { id: product.id })
    }
  }
}

// mutations
const mutations = {
  pushProductToCart (state, { id }) {
    state.items.push({
      id,
      quantity: 1
    })
  },

  incrementItemQuantity (state, { id }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity++
  },

  setCartItems (state, { items }) {
    state.items = items
  },

  setCheckoutStatus (state, status) {
    state.checkoutStatus = status
  }
}

export default {
  namespace: 'cart',
  state,
  effects,
  mutations
}
