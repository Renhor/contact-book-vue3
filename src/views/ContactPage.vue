<template>
  <div class="page contact-page">
    <BaseContainer>
      <BaseHeading center>Contact {{ contact.name }}</BaseHeading>

      <div class="contact-page_row">
        <BaseBlock>
          <ContactFieldForm
            newContact
            @submit-form="onCreate"
          />

          <BaseSeparator v-if="fieldsExist" />

          <ContactFields
            :fields="contact.fields"
            @update="onUpdate"
            @remove="onRemove"
          />
        </BaseBlock>

        <BaseBlock>
          <ContactHistory
            :contactId="+id"
          />
        </BaseBlock>
      </div>
    </BaseContainer>
  </div>
</template>

<script>
  import { computed, defineAsyncComponent, onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';

  const ContactHistory = defineAsyncComponent(() => import('@/components/custom/contacts/ContactHistory'));
  const ContactFieldForm = defineAsyncComponent(() => import('@/components/custom/contacts/fields/ContactFieldForm'));
  const ContactFields = defineAsyncComponent(() => import('@/components/custom/contacts/fields/ContactFields'));
  const BaseContainer = defineAsyncComponent(() => import('@/components/common/BaseContainer'));
  const BaseHeading = defineAsyncComponent(() => import('@/components/common/BaseHeading'));
  const BaseBlock = defineAsyncComponent(() => import('@/components/common/BaseBlock'));
  const BaseSeparator = defineAsyncComponent(() => import('@/components/common/BaseSeparator'));

  export default {
    name: 'ContactPage',
    props: {
      id: {
        type: [Number, String],
        required: true
      }
    },
    setup(props) {
      const contactId = +props.id;
      const store = useStore();
      const router = useRouter();
      const contact = computed(() => store.getters['contacts/contactById'](contactId));

      const checkId = () => {
        if (!contact.value) router.push('/404');
      };

      checkId();

      const fieldsExist = computed(() => Boolean(contact.value.fields.length));

      const onCreate = field => {
        store.dispatch('contacts/addContactField', { field, contactId });
      };
      const onRemove = fieldId => {
        store.dispatch('contacts/removeContactField', { fieldId, contactId });
      };
      const onUpdate = field => {
        store.dispatch('contacts/updateContactField', { field, contactId });
      };

      const subscribeActions = [
        'contacts/addContactField',
        'contacts/removeContactField',
        'contacts/updateContactField'
      ];
      const unsubscribe = store.subscribeAction({
        before: (action) => {
          if (!subscribeActions.includes(action.type)) return ;

          store.dispatch('contacts/saveHistory', {
            actionType: action.type,
            contactId
          })
        },
        after: (action) => {
          if (!subscribeActions.includes(action.type)) return ;

          store.dispatch('contacts/saveHistoryActual', contactId)
        }
      });

      onBeforeUnmount(() => {
        store.dispatch('contacts/clearHistory');
        unsubscribe();
      });

      return {
        contact,
        fieldsExist,

        onCreate,
        onRemove,
        onUpdate
      }
    },
    components: {
      BaseSeparator,
      ContactFieldForm,
      ContactFields,
      BaseHeading,
      BaseContainer,
      BaseBlock,
      ContactHistory
    },
  }
</script>

<style lang="scss">
  .contact-page_row {
    display: flex;
    align-items: flex-start;

    .base-block:first-of-type {
      flex: 1 1 200px;
      margin-right: 20px;
    }

    .base-block:last-of-type {
      flex: 0 0 250px;
    }

    @include breakpoint('phone') {
      flex-direction: column;

      .base-block {
        flex: 1 1 100% !important;
        width: 100%;
        margin-right: 0;
        margin-bottom: 15px;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
