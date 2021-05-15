import Vue from 'vue'
import Slovex, {createStore} from 'slovex'
import cart from './slices/cart'
import products from './slices/products'

Vue.use(Slovex)

const store = createStore({
  slices: [cart, products]
});

export default store;
