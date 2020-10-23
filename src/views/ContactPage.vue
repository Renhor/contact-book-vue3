<template>
  <div class="page contact-page">
    <BaseContainer>
      <BaseHeading center>Contact {{ contact.name }}</BaseHeading>

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
    </BaseContainer>
  </div>
</template>

<script>
  import { computed, defineAsyncComponent } from 'vue'
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';

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
      const contact = computed(() => store.getters['contacts/contactById'](contactId))

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
      BaseBlock
    },
  }
</script>

<style scoped>

</style>
