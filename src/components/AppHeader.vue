<template>
  <header class="app-header">
    <BaseContainer>
      <router-link to="/">Home</router-link>
    </BaseContainer>
  </header>
</template>

<script>
  import { defineAsyncComponent } from 'vue';

  const BaseContainer = defineAsyncComponent(() => import('@/components/common/BaseContainer'));

  export default {
    name: 'AppHeader',
    components: {
      BaseContainer
    }
  }
</script>

<style lang="scss">
  .app-header {
    box-shadow: $box-shadow--light;
    padding: 25px 0;
    position: relative;
    z-index: 1;

    a {
      text-decoration: none;
      color: $color-link;
    }

    .router-link-exact-active {
      color: $color-text;
    }
  }
</style>
