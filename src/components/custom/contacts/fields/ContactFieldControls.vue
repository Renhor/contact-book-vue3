<template>
  <div class="contact-field_controls">
    <BaseButtonsContainer>
      <template v-if="isEditing">
        <BaseButton
          square
          @click="$emit('accept')">
          <BaseIcon
            iconColor="#FFFFFF"
            iconName="Accept">
            <IconAccept />
          </BaseIcon>
        </BaseButton>

        <BaseButton
          square
          variant="warning"
          @click="onCancel">
          <BaseIcon
            iconColor="#FFFFFF"
            iconName="Cancel">
            <IconCancel />
          </BaseIcon>
        </BaseButton>
      </template>

      <template v-else>
        <BaseButton
          square
          @click="$emit('edit')">
          <BaseIcon
            iconColor="#FFFFFF"
            iconName="Edit">
            <IconEdit />
          </BaseIcon>
        </BaseButton>

        <BaseButton
          square
          variant="danger"
          @click="onRemove">
          <BaseIcon
            iconColor="#FFFFFF"
            iconName="Delete">
            <IconDelete />
          </BaseIcon>
        </BaseButton>
      </template>
    </BaseButtonsContainer>

    <teleport to="#app">
      <ConfirmationModal
        :is-opened="modal.isOpened"
        :headingText="modal.headingText"
        :bodyText="modal.bodyText"
        @close="closeModal"
        @decline="onModalDecline"
        @accept="onModalAccept"
      />
    </teleport>
  </div>
</template>

<script>
  import { defineAsyncComponent, reactive } from 'vue';

  const ConfirmationModal = defineAsyncComponent(() => import('@/components/common/modals/ConfirmationModal'));

  const BaseButtonsContainer =  defineAsyncComponent(() => import('@/components/common/BaseButtonsContainer'));
  const BaseButton = defineAsyncComponent(() => import('@/components/common/BaseButton'));
  const BaseIcon = defineAsyncComponent(() => import('@/components/common/BaseIcon'));

  const IconAccept = defineAsyncComponent(() => import('@/components/common/icons/IconAccept'));
  const IconCancel = defineAsyncComponent(() => import('@/components/common/icons/IconCancel'));
  const IconDelete = defineAsyncComponent(() => import('@/components/common/icons/IconDelete'));
  const IconEdit = defineAsyncComponent(() => import('@/components/common/icons/IconEdit'));

  export default {
    name: 'ContactFieldControls',
    props: {
      isEditing: {
        type: Boolean,
        default: false
      }
    },
    setup(props, { emit }) {
      const modal = reactive({
        type: 'idle',
        isOpened: false,
        headingText: '',
        bodyText: ''
      });
      const openModal = () => modal.isOpened = true;
      const closeModal = () => modal.isOpened = false;

      const onCancel = () => {
        modal.type = 'update';
        modal.headingText = 'Decline changes';
        modal.bodyText = 'Are you sure you want decline changes?';
        openModal();
      };
      const onRemove = () => {
        modal.type = 'remove';
        modal.headingText = 'Remove field';
        modal.bodyText = 'Are you sure you want remove this field?';
        openModal();
      };

      const onModalAccept = () => {
        closeModal();

        if (modal.type === 'remove') {
          emit('remove');
        } else {
          emit('cancel');
        }
      }
      const onModalDecline = () => {
        closeModal();
      }

      return {
        modal,

        openModal,
        closeModal,
        onModalAccept,
        onModalDecline,

        onCancel,
        onRemove
      }
    },
    components: {
      BaseButton,
      BaseButtonsContainer,
      BaseIcon,
      IconAccept,
      IconDelete,
      IconCancel,
      IconEdit,
      ConfirmationModal
    },
  }
</script>

<style lang="scss">
  .contact-field_controls {
    .base-button {
      width: 44px;
      height: 39px;
    }
  }
</style>
