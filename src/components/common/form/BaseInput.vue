<template>
  <label
    class="base-input"
    :class="className">
    <input
      class="base-input_inner"
      type="text"
      :value="value"
      :placeholder="placeholder"
      @input="onInput"
      @focusin="focused = true"
      @focusout="focused = false"
    />
  </label>
</template>

<script>
  import { computed, ref } from 'vue';

  export default {
    name: 'BaseInput',
    props: {
      type: {
        type: String,
        default: 'text',
        validator: (v) => ['text', 'email', 'password'].includes(v),
      },
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    setup(props, { emit }) {
      const focused = ref(false);
      const className = computed(() => [
        focused.value && '-focused'
      ]);

      const onInput = ($event) => {
        emit('update:value', $event.target.value)
      }

      return {
        focused,
        className,

        onInput,
      };
    }
  };
</script>

<style lang="scss">
  .base-input {
    border: $border--default;
    border-radius: $border-radius--default;
    padding: 9px;

    &.-focused {
      border-color: $color-primary;
    }
  }

  .base-input_inner {
    padding: 0;
    border: none;
    width: 100%;

    &::placeholder {
      color: $color-placeholder;
    }
  }
</style>
