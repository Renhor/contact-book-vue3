<template>
  <header class="app-header">
    <RouterLink to="/">Home</RouterLink>
  </header>
</template>

<script>
  export default {
    name: 'AppHeader'
  }
</script>

<style lang="scss">
  .app-header {
    box-shadow: $box-shadow--light;
    padding: 25px;
    position: relative;
    z-index: 1;
  }
</style>
