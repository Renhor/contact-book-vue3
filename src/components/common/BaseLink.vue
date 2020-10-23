<template>
  <a
    class="base-link"
    :href="href"
    :target="target">
    <slot></slot>
  </a>
</template>

<script>
  export default {
    name: 'BaseLink',
    props: {
      href: {
        type: String,
        required: true
      },
      target: {
        type: String,
        default: '_parent'
      }
    },
  };
</script>

<style lang="scss">
  .base-link {
    color: $color-link;
  }
</style>
