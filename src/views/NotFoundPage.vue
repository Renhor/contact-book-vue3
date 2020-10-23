<template>
  <BaseBlock>
    404
  </BaseBlock>
</template>

<script>
  import { defineAsyncComponent } from 'vue';

  const BaseBlock = defineAsyncComponent(() => import('@/components/common/BaseBlock'));

  export default {
    name: 'NotFoundPage',
    components: {
      BaseBlock
    }
  }
</script>

<style lang="scss">

</style>
