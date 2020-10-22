<template>
  <div class="page home-page">
    <BaseContainer>
      <BaseHeading center>Contact List</BaseHeading>

      <BaseBlock>
        <ContactCreate
          @create="onCreateContact"
        />

        <BaseSeparator
          v-if="isContactsExists"
        />

        <ContactList
          :contacts="contacts"
          @remove="onRemoveContact"
          @navigate="goToContact"
        />
      </BaseBlock>
    </BaseContainer>

    <teleport to="#app">
      <ConfirmationModal
        :is-opened="isModalOpened"
        :headingText="confirmationModalHeading"
        :bodyText="confirmationModalText"
        @close="closeConfirmationModal"
        @decline="onRemoveContactDecline"
        @accept="onRemoveContactAccept"
      />
    </teleport>
  </div>
</template>

<script >
  import { defineAsyncComponent, computed, ref } from 'vue';
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";

  const BaseContainer = defineAsyncComponent(() => import('@/components/common/BaseContainer.vue'));
  const BaseHeading = defineAsyncComponent(() => import('@/components/common/BaseHeading.vue'));
  const BaseBlock = defineAsyncComponent(() => import('@/components/common/BaseBlock.vue'));
  const BaseSeparator = defineAsyncComponent(() => import('@/components/common/BaseSeparator.vue'));
  const ContactList = defineAsyncComponent(() => import('@/components/custom/contacts/list/ContactList.vue'));
  const ContactCreate = defineAsyncComponent(() => import('@/components/custom/contacts/ContactCreate.vue'));
  const ConfirmationModal = defineAsyncComponent(() => import('@/components/common/modals/ConfirmationModal.vue'));

  export default {
    name: 'HomePage',
    setup() {
      const store = useStore();
      const router = useRouter();
      const contacts = computed(() => store.getters['contacts/contacts'])
      const isContactsExists = computed(() => Boolean(contacts.value.length));

      const onCreateContact = (name) => {
        store.dispatch('contacts/addContact', name);
      };
      const goToContact = (id) => {
        router.push(`/contacts/${id}`);
      };

      const isModalOpened = ref(false);
      const contactIdToRemove = ref(-1);
      const contactToRemove = computed(() => {
        return contacts.value.find((contact) => contact.id === contactIdToRemove.value);
      })
      const confirmationModalHeading = computed(() => {
        if (contactToRemove.value === undefined) return '';

        return contactToRemove.value.name;
      });
      const confirmationModalText = computed(() => {
        if (contactToRemove.value === undefined) return '';

        return contactToRemove.value.name;
      });

      const openConfirmationModal = () => {
        isModalOpened.value = true;
      };
      const closeConfirmationModal = () => {
        isModalOpened.value = false;
      };
      const onRemoveContact = (id) => {
        openConfirmationModal();
        contactIdToRemove.value = id;
      };
      const onRemoveContactAccept = () => {
        closeConfirmationModal();
        store.dispatch('contacts/removeContact', contactIdToRemove.value);
      };
      const onRemoveContactDecline = () => {
        closeConfirmationModal();
      };

      return {
        contacts,
        isContactsExists,
        isModalOpened,
        onCreateContact,
        goToContact,

        confirmationModalHeading,
        confirmationModalText,
        onRemoveContact,
        openConfirmationModal,
        closeConfirmationModal,
        onRemoveContactAccept,
        onRemoveContactDecline,
      }
    },
    components: {
      BaseContainer,
      BaseHeading,
      BaseBlock,
      BaseSeparator,
      ContactList,
      ContactCreate,
      ConfirmationModal
    }
  }
</script>

<style lang="scss">

</style>
