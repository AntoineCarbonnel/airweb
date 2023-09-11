<template>
  <div id="template">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<style lang="scss">
html {
  font-size: 15px;
  color: $black;
  letter-spacing: 1.5px;
  scroll-behavior: smooth;
  font-family: 'Josefin Sans', sans-serif;

  body {
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
}

#template {
  background-color: $cream;
  min-height: 100vh;
}
</style>
<script setup lang="ts">

</script>
