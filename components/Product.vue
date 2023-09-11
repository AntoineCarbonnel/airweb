<template>
  <article>
    <figure>
      <img v-if="product.thumbnail_url" :src="product.thumbnail_url" width="64" alt="thumbnail"/>
      <img v-else width="64" src="~/assets/img/ticket.jpg"  alt="default thumbnail"/>
      <figcaption>
        <h3>{{ product.label }}</h3>
        <p>{{ product.description }}</p>
      </figcaption>
    </figure>
    <div class="buy">
      <div class="price">
        {{ formatPrice }}€
      </div>
      <button>
        <span class="img">
          <img src="~/assets/img/add-to-cart.png" width="16" alt="">
        </span>
        <span @click="store.addProduct(product.id, 1, product.label, formatPrice)" class="text">
          Ajouter au panier
        </span>
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import {useCartStore} from "~/stores/cart";

interface Product {
  id: string;
  label: string;
  description: string;
  price: number;
  category_id: string;
  thumbnail_url: string | null;
}

const props = defineProps({
      product: {
        type: Object as PropType<Product>,
        required: true
      }
    }),
    {product} = props,
    formatPrice = computed(() => {
      return product.price / 100
    }),
    store = useCartStore()


</script>

<style scoped lang="scss">
article {
  @include flex($direction: column, $align: spave-between);
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  gap: 20px;

  figure {
    @include flex(space-between);
    gap: 15px;

    img {
      aspect-ratio: 1 / 1;
      border-radius: 100%;
    }

    figcaption {
      @include flex($align: flex-start, $direction: column);

      h3 {
        font-size: 1.5rem;
        margin: 0;
      }

      p {
        margin-top: 10px;
        line-height: 1.5;
      }
    }
  }

  .buy {
    @include flex(space-between);

    .price {
      background-color: $black;
      color: white;
      border-radius: 10px;
      font-weight: bold;
      padding: 10px;
    }

    button {
      border: none;
      width: 210px;
      height: 40px;
      cursor: pointer;
      @include flex();
      overflow: hidden;
      font-size: 1.2rem;
      position: relative;
      border-radius: 10px;
      transition-duration: .5s;
      background-color: $blue;

      .img {
        position: absolute;
        left: -50px;
        width: 30px;
        height: 30px;
        background-color: transparent;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        z-index: 2;
        transition-duration: .5s;
      }

      .text {
        color: white;
        transition-duration: .5s;
        width: fit-content;
        font-size: 1.04em;
        font-weight: 600;
        @include flex();
        height: 100%;
        z-index: 1;
      }

      &:hover .img {
        transform: translateX(55px);
        border-radius: 40px;
        transition-duration: .5s;
      }

      &:hover .text {
        transform: translate(10px, 0px);
        transition-duration: .5s;
      }

      &:active {
        transform: scale(0.95);
        transition-duration: .5s;
      }
    }
  }
}
</style>
