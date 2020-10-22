<template>
  <footer class="app-footer">
    <BaseText
      class="app-footer_app-name"
      center>
      Contact Book App
    </BaseText>

    <BaseText
      class="app-footer_credentials"
      size="small"
      center
      secondary>Powered by
      <BaseLink
        href="https://t.me/renhor"
        target="_blank">
        Renhor
      </BaseLink>
    </BaseText>
  </footer>
</template>

<script >
  import { defineAsyncComponent } from 'vue';

  const BaseText = defineAsyncComponent(() => import('@/components/common/BaseText.vue'));
  const BaseLink = defineAsyncComponent(() => import('@/components/common/BaseLink.vue'));

  export default {
    name: 'AppFooter',
    components: {
      BaseText,
      BaseLink
    }
  }
</script>

<style lang="scss">
  .app-footer {
    width: 100%;
    box-shadow: $box-shadow--light;
    padding: 15px;
    position: relative;
    z-index: 1;
  }

  .app-footer_app-name {
    margin-bottom: 10px;
  }

  .app-footer_credentials {

  }
</style>
