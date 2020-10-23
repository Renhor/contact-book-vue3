<template>
  <p class="base-text" :class="className">
    <slot></slot>
  </p>
</template>

<script >
  import { computed } from 'vue';

  export default {
    name: 'BaseText',
    props: {
      secondary: Boolean,
      center: Boolean,
      right: Boolean,
      size: {
        type: String,
        default: 'medium'
      }
    },
    setup(props) {
      const className = computed(() => [
        props.secondary && '-secondary',
        props.center && '-center',
        props.right && '-right',
        `-${props.size}`
      ]);

      return {
        className
      }
    }
  };
</script>

<style lang="scss">
  .base-text {
    line-height: $line-height--text;

    &.-right {
      text-align: right;
    }

    &.-center {
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    }

    &.-small {
      font-size: $font-size--small;
    }

    &.-medium {
      font-size: $font-size--medium;
    }

    &.-bigger {
      font-size: $font-size--bigger;
    }

    &.-big {
      font-size: $font-size--big;
    }

    &.-secondary {
      color: $color-text--secondary;
    }
  }
</style>
