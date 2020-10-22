<template>
  <div class="base-input">
    <input
      class="base-input_inner"
      type="text"
      :value="value"
      :placeholder="placeholder"
      @input="onInput"
    />
  </div>
</template>

<script>
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
      const onInput = ($event) => {
        emit('update:value', $event.target.value)
      }

      return {
        onInput
      };
    }
  };
</script>

<style lang="scss">
  .base-input {
    border: $border--default;
    border-radius: $border-radius--default;
    padding: 10px;
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
