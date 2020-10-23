<template>
  <ul class="contact-fields">
    <li
      class="contact-fields_item"
      v-for="field in fields"
      :key="field.id">
      <ContactField
        :field="field"
        @remove="onRemove"
        @update="onUpdate"
      />
    </li>
  </ul>
</template>

<script>
  import { defineAsyncComponent } from 'vue';

  const ContactField = defineAsyncComponent(() => import('@/components/custom/contacts/fields/ContactField'));

  export default {
    name: 'ContactFields',
    props: {
      fields: {
        type: Array,
        required: true
      }
    },
    setup(props, { emit }) {
      const onRemove = fieldId => {
        emit('remove', fieldId);
      };

      const onUpdate = field => {
        emit('update', field);
      };

      return {
        onRemove,
        onUpdate
      }
    },
    components: {
      ContactField
    }
  }
</script>

<style lang="scss">
  .contact-fields_item {
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
</style>
