<template>
  <div id="cart">
    <div class="container">
      <h1>Votre panier</h1>
      <div v-if="products.length > 0" class="productsList">
        <div class="header">
          <div class="label">
            Nom du produit
          </div>
          <div class="quantity">
            Quantité
          </div>
          <div class="price">
            Prix
          </div>
        </div>
        <article v-for="product in products">
          <div class="label">
            {{ product.label }}
          </div>
          <div class="quantity">
            {{ product.quantity }}
          </div>
          <div class="price">
            {{ product.price }}€
          </div>
        </article>
      </div>
      <div v-if="products.length > 0" class="total">
        <div class="label">
          Total
        </div>
        <div class="price">
          {{ total }}€
        </div>
      </div>
      <div v-if="products.length > 0" class="proceedPaiement">
        <button>Accéder au paiement</button>
      </div>
      <div v-else class="empty">
        Votre panier est vide :(
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCartStore} from "~/stores/cart";

const store = useCartStore(),
    products = computed(() => store.getProducts),
    total = computed(() => store.getTotalPrice)

</script>

<style scoped lang="scss">
#cart {
  .container {
    padding: 50px;
    margin: 100px auto;
    background-color: white;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;

    h1 {
      margin: 0;
    }

    .productsList {
      margin-top: 20px;

      .header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
        padding: 10px 0;
        border-bottom: 1px solid $grey;

        .label {
          font-weight: bold;
        }
      }

      article {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
        padding: 10px 0;
        border-bottom: 1px solid $grey;
      }
    }

    .total {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      padding: 10px 0;
      font-weight: bold;
      border-bottom: 1px solid $grey;
      margin-top: 20px;

      .label {
        font-size: 1.5rem;
      }

      .price {
        grid-column: 3 / 4;
      }
    }

    .proceedPaiement {
      margin-top: 20px;
      @include flex(flex-end);

      button {
        border: none;
        color: $blue;
        cursor: pointer;
        padding: 15px 30px;
        border-radius: 50px;
        background-color: $black;
        text-transform: uppercase;
      }
    }

    .empty {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>
