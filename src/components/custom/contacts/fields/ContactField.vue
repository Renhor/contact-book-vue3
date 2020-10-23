<template>
  <div class="contact-field">
    <ContactFieldShow
      v-if="status === 'idle'"
      :name="field.name"
      :value="field.value"
    />

    <ContactFieldForm
      v-else
      :field="field"
      :should-submit="status === 'submitting'"
      @submit-form="onUpdate"
    />

    <ContactFieldControls
      :is-editing="status === 'editing'"
      @accept="onAcceptEdit"
      @cancel="onDeclineEdit"
      @remove="onRemove"
      @edit="onBeginEdit"
    />
  </div>
</template>

<script>
  import { defineAsyncComponent, ref } from 'vue';

  const ContactFieldForm = defineAsyncComponent(() => import('@/components/custom/contacts/fields/ContactFieldForm'));
  const ContactFieldShow = defineAsyncComponent(() => import('@/components/custom/contacts/fields/ContactFieldShow'));
  const ContactFieldControls = defineAsyncComponent(() => import('@/components/custom/contacts/fields/ContactFieldControls'));

  export default {
    name: 'ContactField',
    props: {
      field: {
        type: Object,
        required: true
      },
    },
    setup(props, { emit }) {
      const status = ref('idle');

      const onAcceptEdit = () => {
        status.value = 'submitting';
      };
      const onDeclineEdit = () => {
        status.value = 'idle';
      };
      const onRemove = () => {
        emit('remove', props.field.id);
      };
      const onBeginEdit = () => {
        status.value = 'editing';
      };
      const onUpdate = field => {
        status.value = 'idle';
        emit('update', {
          id: props.field.id,
          ...field
        })
      };

      return {
        status,
        onAcceptEdit,
        onDeclineEdit,
        onRemove,
        onBeginEdit,
        onUpdate,
      }
    },
    components: {
      ContactFieldForm,
      ContactFieldShow,
      ContactFieldControls,
    }
  }
</script>

<style lang="scss">
  .contact-field {
    display: flex;
    align-items: center;

    .contact-fields-form {
      width: 100%;
    }

    .base-input {

    }
  }
</style>
