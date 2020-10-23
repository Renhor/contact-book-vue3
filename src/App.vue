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

  import { LocalContacts } from '@/services/LocalContacts';

  const AppHeader = defineAsyncComponent(() => import('@/components/AppHeader'));
  const AppFooter = defineAsyncComponent(() => import('@/components/AppFooter'));

  export default {
    name: 'App',
    setup() {
      const store = useStore();

      const actionName = 'contacts/loadContacts';
      store.dispatch(actionName);
      store.subscribeAction({
        after: action => {
          if (action.type === actionName) return ;
          LocalContacts.save(store.getters['contacts/contacts']);
        }
      });
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
