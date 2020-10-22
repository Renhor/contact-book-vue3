<template>
  <component
    :is="type"
    class="base-heading"
    :class="className">
    <slot></slot>
  </component>
</template>

<script>
  import { computed } from 'vue';

  export default {
    name: 'BaseHeading',
    props: {
      type: {
        type: String,
        default: 'h1'
      },
      center: Boolean
    },
    setup(props) {
      const className = computed(() => [
        `-${props.type}`,
        props.center && '-center'
      ]);

      return {
        className
      }
    },
  };
</script>

<style lang="scss">
  .base-heading {
    line-height: $line-height--heading;

    &.-center {
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    }

    &.-h1 {
      font-size: $font-size-h1;
      margin-bottom: 25px;
    }

    &.-h2 {
      font-size: $font-size-h2;
      margin-bottom: 20px;
    }

    &.-h3 {
      font-size: $font-size-h3;
      margin-bottom: 15px;
    }

    &.-h4 {
      font-size: $font-size-h4;
      margin-bottom: 10px;
    }

    &.-h5 {
      font-size: $font-size-h5;
      margin-bottom: 10px;
    }

    &.-h6 {
      font-size: $font-size-h6;
      margin-bottom: 10px;
    }
  }
</style>
