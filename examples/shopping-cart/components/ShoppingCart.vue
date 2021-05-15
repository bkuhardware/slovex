<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!products.length"><i>Please add some products to cart.</i></p>
    <ul>
      <li
        v-for="product in products"
        :key="product.id">
        {{ product.title }} - {{ product.price | currency }} x {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ total | currency }}</p>
    <p><button :disabled="!products.length" @click="checkout(products)">Checkout</button></p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapStateToComputed } from 'slovex'

export default {
  computed: {
      ...mapStateToComputed('cart', ['checkoutStatus', 'items']),
      ...mapStateToComputed('products', ['all']),
      products() {
          console.log(this);
          return this.items.map(({ id, quantity }) => {
              const product = this.all.find(product => product.id === id)
              return {
                  title: product.title,
                  price: product.price,
                  quantity
              }
          })
      },
      total() {
          return this.products.reduce((total, product) => {
              return total + product.price * product.quantity
          }, 0)
      }
  },
  methods: {
    checkout (products) {
      this.$slovex.dispatch('cart@checkout', products)
    }
  }
}
</script>
