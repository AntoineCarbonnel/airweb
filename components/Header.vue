<template>
  <header>
    <div class="container">
      <div class="logo">
        <NuxtLink href="/">
          <span class="orange"></span>
          <span class="title">
            Tickety
          </span>
        </NuxtLink>
      </div>
      <div id="searchbar">
        <input type="text" v-model="search" placeholder="Search for shoes, brands and more">
        <div class="search">
          <img src="~/assets/img/search.png" width="16" alt="search">
        </div>
      </div>
      <nav>
        <NuxtLink :to="{ path: '/', hash: '#products'}">
          Our products
        </NuxtLink>
        <a href="">Collections</a>
        <a href="">Why us</a>

        <NuxtLink href="/cart" class="cart">
          <img src="~/assets/img/cart.png" width="24" alt="cart">
          <span class="totalQuantity">
            {{ totalProducts }}
          </span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import {useCartStore} from "~/stores/cart";
import {useCatalogStore} from "~/stores/catalog";

const cartStore = useCartStore(),
    catalogStore = useCatalogStore(),
    totalProducts = computed(() => cartStore.getTotalProducts),
    search = ref("")

watch(search, () => {
  catalogStore.setSearch(search.value)
})




</script>

<style lang="scss" scoped>
header {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1.5fr;
    grid-template-rows: 40px;
    padding: 5px 0;

    .logo {
      position: relative;
      font-weight: bold;
      font-size: 2rem;

      .orange {
        background-color: $blue;
        border-radius: 10px;
        position: absolute;
        height: 100%;
        width: 20px;
        left: -3px;
      }

      .title {
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
      }
    }

    #searchbar {
      position: relative;

      input {
        width: 100%;
        height: 100%;
        padding: 5px 20px;
        border-radius: 50px;
        border: 1px solid $grey;
      }

      .search {
        position: absolute;
        cursor: pointer;
        top: 50%;
        right: 10px;
        padding: 0 10px;
        transform: translateY(-50%);
        border-left: 1px solid $grey;
      }
    }

    nav {
      @include flex(space-around);

      a {
        @include flex();
      }

      .cart {
        position: relative;

        .totalQuantity {
          right: -10px;
          width: 20px;
          bottom: -5px;
          color: white;
          height: 20px;
          @include flex();
          font-weight: 600;
          font-size: .7rem;
          padding-left: 3px;
          position: absolute;
          border-radius: 100%;
          background-color: #040E1E;
        }
      }
    }
  }
}
</style>
