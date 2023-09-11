<template>
  <div id="homepage">
    <section id="vitrine">
      <div class="container">
        <figure>
          <figcaption>
            <h1>
              Find the <br/>best <span>ticket.</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/> Quisquam, voluptatum. Quisquam, voluptatum.
            </p>
            <NuxtLink :to="{ path: '/', hash: '#products'}">
              <button>
                Shop now
              </button>
            </NuxtLink>
          </figcaption>
          <img src="~/assets/img/homepage.png" alt="homepage">
        </figure>
      </div>
    </section>
    <section id="products">
      <div class="container">
        <div class="header">
          <h2>
            Our products
          </h2>
          <div class="filter">
            Categories:
            <select v-model="categoryFilter">
              <option value="0">Tout les produits</option>
              <option v-for="category in filteredCategories" :value="category.id">
                {{ category.label }}
              </option>
            </select>
          </div>
        </div>
        <div id="productsList">
          <Product v-for="product in filteredProducts" :key="product.id" :product="product"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {useCatalogStore} from "~/stores/catalog";

interface Category {
  id: string;
  index: number;
  label: string;
  description: string;
}

interface Product {
  id: string;
  label: string;
  description: string;
  price: number;
  category_id: string;
  thumbnail_url: string | null;
}

const runtimeConfig = useRuntimeConfig(),
    {data} = await useFetch(`${runtimeConfig.public.api}/products`),
    products: Array<Product> = data.value,
    dataCategories: {} = await useFetch(`${runtimeConfig.public.api}/categories`),
    categories: Category[] = dataCategories.data.value,
    filteredCategories = ref(categories.sort((a, b) => a.index - b.index)),
    categoryFilter = ref("0"),
    catalogStore = useCatalogStore(),
    getSearch = computed(() => catalogStore.getSearch),
    filteredProducts = computed(() => {
      let filteredProducts = products

      if (categoryFilter.value !== "0") {
        filteredProducts = products.filter(product => product.category_id === categoryFilter.value as unknown as string)
      }

      if (getSearch.value !== "") {
        filteredProducts = filteredProducts.filter(product => product.label.toLowerCase().includes(getSearch.value.toLowerCase()))
      }

      return filteredProducts
    })

</script>

<style lang="scss" scoped>
#vitrine {
  .container {
    margin: 100px auto;

    figure {
      @include flex(space-between);
      margin: 0;

      figcaption {
        @include flex($align: flex-start, $direction: column);

        h1 {
          font-size: 5rem;
          margin: 0;

          > span {
            text-shadow: -1px -1px 0 $blue, 1px -1px 0 $blue, -1px 1px 0 $blue, 1px 1px 0 $blue;
            color: white;
          }
        }

        p {
          line-height: 1.5;
          margin: 30px 0;
        }

        button {
          border: none;
          color: $blue;
          cursor: pointer;
          padding: 15px 30px;
          border-radius: 50px;
          background-color: $black;
        }
      }

      > img {
        border-radius: 50px;
        width: 50%;
      }
    }
  }
}

#products {

  .header {
    @include flex(space-between);

    h2 {
      font-size: 2.5rem;
      margin: 50px 0;
    }

    .filter {
      select {
        cursor: pointer;
        -webkit-appearance: none;
        -moz-appearance: none;
        border-radius: 10px;
        padding: 15px 20px;
        outline: none;
        border: 1px solid $black;
        appearance: none;
      }
    }

  }

  #productsList {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}
</style>
