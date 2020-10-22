<template>
  <div
    class="base-buttons-container"
    :class="className">
    <slot></slot>
  </div>
</template>

<script >
  import { computed } from 'vue';

  export default {
    name: 'BaseButtonsContainer',
    props: {
      btnAlign: {
        type: String,
        default: 'left',
        validator: (v) => ['left', 'center', 'right'].includes(v)
      }
    },
    setup(props) {
      const className = computed(() => [
        `-${props.btnAlign}`
      ]);

      return {
        className
      };
    }
  };
</script>

<style lang="scss">
  .base-buttons-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &.-center {
      justify-content: center;
    }

    &.-right {
      justify-content: flex-end;
    }

    .base-button:not(:first-of-type) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: 1px solid $color-border;
    }

    .base-button:not(:last-of-type) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .base-button:first-of-type:last-of-type {
      border-radius: $border-radius--default;
      border: none;
    }
  }
</style>
