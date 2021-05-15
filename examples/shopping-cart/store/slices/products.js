import shop from '../../api/shop'

// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const effects = {
  getAllProducts ({ dispatch }) {
    shop.getProducts(products => {
      dispatch('setProducts', products)
    })
  }
}

// mutations
const mutations = {
  setProducts (state, products) {
    state.all = products
  },

  decrementProductInventory (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  }
}

export default {
  namespace: 'products',
  state,
  getters,
  effects,
  mutations
}
