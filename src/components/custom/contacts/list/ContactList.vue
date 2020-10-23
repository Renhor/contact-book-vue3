<template>
  <ol class="contacts-list">
    <li
      class="contacts-list_item-wrapper"
      v-for="contact in contacts"
      :key="contact.id">
      <ContactListItem
        :contact="contact"
        @remove="onRemove(contact.id)"
        @click="onNavigate(contact.id)"
      />
    </li>
  </ol>
</template>

<script >
  import { defineAsyncComponent } from 'vue';

  const ContactListItem = defineAsyncComponent(() => import('@/components/custom/contacts/list/ContactListItem'))

  export default {
    name: 'ContactList',
    props: {
      contacts: {
        type: Array,
      }
    },
    setup(props, { emit }) {
      const onRemove = (id) => emit('remove', id);
      const onNavigate = (id) => {
        emit('navigate', id);
      }

      return {
        onRemove,
        onNavigate
      };
    },
    components: {
      ContactListItem
    }
  };
</script>

<style lang="scss">
  .contacts-list {

  }

  .contacts-list_item-wrapper {
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
</style>
