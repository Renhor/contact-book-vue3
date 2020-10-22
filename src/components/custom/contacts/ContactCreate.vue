<template>
  <div class="contact-create">
    <form
      class="contact-create_form"
      @submit.prevent="onSubmit">
      <div class="contact-create_form-row">
        <BaseInput
          v-model:value="field.value"
          placeholder="Enter name for a new contact"
          :type="field.type"
        />
        <BaseButton
          type="submit"
          text="Add contact"
          :disabled="!isValid"
        />
      </div>
    </form>
  </div>
</template>

<script >
  import { defineAsyncComponent, reactive, computed } from 'vue';

  const BaseInput = defineAsyncComponent(() => import('@/components/common/form/BaseInput.vue'));
  const BaseButton = defineAsyncComponent(() => import('@/components/common/BaseButton.vue'));

  export default {
    name: 'ContactCreate',
    setup(props, { emit }) {
      const field = reactive({
        type: 'text',
        value: ''
      });

      const isValid = computed(() => !!field.value)

      const onSubmit = () => {
        if (!isValid) return;

        emit('create', field.value);

        field.value = '';
      };

      return {
        field,
        isValid,
        onSubmit
      };
    },
    components: {
      BaseInput,
      BaseButton
    }
  };
</script>

<style lang="scss">
  .contact-create_form-row {
    width: 100%;
    display: flex;

    .base-input {
      flex-grow: 1;
    }
  }
</style>
