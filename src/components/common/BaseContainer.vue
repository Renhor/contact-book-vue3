<template>
  <div class="base-container">
    <slot></slot>
  </div>
</template>

<script >
  export default {
    name: 'BaseContainer',
    setup() {
      return {};
    }
  };
</script>

<style lang="scss">
  .base-container {
    width: 100%;
    max-width: 738px;
    margin: 0 auto;

    @include breakpoint('phone') {
      margin: 0 15px;
      width: auto;
    }
  }
</style>
