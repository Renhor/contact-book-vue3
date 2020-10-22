<template>
  <AppHeader />
  <main class="app-main">
    <RouterView />
  </main>
  <AppFooter />
</template>

<script >
  import { defineAsyncComponent } from 'vue'
  import { useStore } from "vuex";

  const AppHeader = defineAsyncComponent(() => import('@/components/AppHeader.vue'));
  const AppFooter = defineAsyncComponent(() => import('@/components/AppFooter.vue'));

  export default {
    name: 'App',
    setup() {
      const store = useStore();

      store.dispatch('contacts/loadContacts');
    },
    components: {
      AppHeader,
      AppFooter
    },
  }
</script>

<style lang="scss">
  #app {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }

  .app-main {
    background-color: $color-background--main;
    padding: 50px 0;
  }
</style>
