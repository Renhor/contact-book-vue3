<template>
  <div class="base-block">
    <slot></slot>
  </div>
</template>

<script >
  export default {
    name: 'BaseBlock'
  };
</script>

<style lang="scss">
  .base-block {
    border-radius: $border-radius--default;
    padding: 20px;
    background-color: $color-background--block;
    box-shadow: $box-shadow--light;
  }
</style>
