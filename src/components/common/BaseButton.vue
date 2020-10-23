<template>
  <button
    class="base-button"
    :class="className"
    :disabled="disabled"
    :type="type">
    <slot>{{ text }}</slot>
  </button>
</template>

<script >
  import { computed } from 'vue';

  export default {
    name: 'BaseButton',
    props: {
      type: {
        type: String,
        default: 'button',
        validator: (v) => ['submit', 'reset', 'button'].includes(v)
      },
      text: {
        type: String,
        default: ''
      },
      variant: {
        type: String,
        default: 'primary',
        validator: (v) => ['primary', 'info', 'warning', 'danger'].includes(v)
      },
      disabled: {
        type: Boolean,
        default: false
      },
      square: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'medium',
        validator: (v) => ['small', 'medium'].includes(v)
      }
    },
    setup(props) {
      const className = computed(() => [
        `-${props.variant}`,
        `-${props.size}`,
        props.square && `-square`
      ]);

      return {
        className
      };
    }
  };
</script>

<style lang="scss">
  .base-button {
    text-align: center;
    color: $color-white;
    border: none;
    border-radius: $border-radius--default;
    padding: 10px;
    cursor: pointer;
    transition: $transition-ease--default;

    &:disabled {
      cursor: not-allowed;
      opacity: .5;
    }

    &.-small {
      padding: 5px;
      font-size: $font-size--smaller;
    }

    &.-square {
      padding: 0;
      width: 40px;
      height: 40px;
      flex-grow: 0;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      &.-small {
        width: 30px;
        height: 30px;
      }
    }

    &.-primary {
      background-color: $color-primary;

      &:hover {
        background-color: $color-primary--darker;
      }

      &:active {
        background-color: $color-primary--lighter;
      }
    }

    &.-info {
      background-color: $color-info;

      &:hover {
        background-color: $color-info--darker;
      }

      &:active {
        background-color: $color-info--lighter;
      }
    }

    &.-warning {
      background-color: $color-warning;

      &:hover {
        background-color: $color-warning--darker;
      }

      &:active {
        background-color: $color-warning--lighter;
      }
    }

    &.-danger {
      background-color: $color-danger;

      &:hover {
        background-color: $color-danger--darker;
      }

      &:active {
        background-color: $color-danger--lighter;
      }
    }
  }
</style>
