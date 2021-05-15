<template>
  <ul>
    <li
      v-for="product in products"
      :key="product.id">
      {{ product.title }} - {{ product.price | currency }}
      <br>
      <button
        :disabled="!product.inventory"
        @click="addProductToCart(product)">
        Add to cart
      </button>
    </li>
  </ul>
</template>

<script>
import { mapStateToComputed, mapDispatchToMethods } from 'slovex'

export default {
  computed:mapStateToComputed('products', { products: 'all' }),
  methods: mapDispatchToMethods('cart', [
    'addProductToCart'
  ]),
  created () {
    this.$slovex.dispatch('products@getAllProducts');
  }
}
</script>
