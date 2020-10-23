<template>
  <BaseModal
    class="confirmation-modal"
    :is-opened="isOpened"
    @close="onClose">
    <BaseBlock>
      <div class="confirmation-modal_header">
        <BaseHeading type="h3">
          {{ headingText }}
        </BaseHeading>

        <BaseSeparator />
      </div>

      <div class="confirmation-modal_body">
        <BaseText class="confirmation-modal_body-slot">
          {{ bodyText }}
        </BaseText>
      </div>

      <div class="confirmation-modal_footer">
        <BaseButtonsContainer btnAlign="right">
          <BaseButton
            variant="danger"
            text="Accept"
            @click="onAccept"
          />

          <BaseButton
            variant="primary"
            text="Decline"
            @click="onDecline"
          />
        </BaseButtonsContainer>
      </div>
    </BaseBlock>
  </BaseModal>
</template>

<script >
  import { defineAsyncComponent } from 'vue';

  const BaseModal = defineAsyncComponent(() => import('@/components/common/BaseModal'));
  const BaseBlock = defineAsyncComponent(() => import('@/components/common/BaseBlock'));
  const BaseButtonsContainer = defineAsyncComponent(() => import('@/components/common/BaseButtonsContainer'));
  const BaseButton = defineAsyncComponent(() => import('@/components/common/BaseButton'));
  const BaseText = defineAsyncComponent(() => import('@/components/common/BaseText'));
  const BaseHeading = defineAsyncComponent(() => import('@/components/common/BaseHeading'));
  const BaseSeparator = defineAsyncComponent(() => import('@/components/common/BaseSeparator'));

  export default {
    name: 'ConfirmationModal',
    props: {
      isOpened: {
        type: Boolean,
        default: false
      },
      headingText: {
        type: String,
        default: 'Please confirm your action'
      },
      bodyText: {
        type: String,
        default: 'This action could be destructive, do you want to continue?'
      }
    },
    setup(props, { emit }) {
      const onAccept = () => emit('accept');
      const onDecline = () => emit('decline');
      const onClose = () => emit('close');

      return {
        onAccept,
        onDecline,
        onClose
      };
    },
    components: {
      BaseModal,
      BaseBlock,
      BaseButtonsContainer,
      BaseButton,
      BaseText,
      BaseHeading,
      BaseSeparator
    }
  };
</script>

<style lang="scss">
  .confirmation-modal {

  }

  .confirmation-modal_header {

  }

  .confirmation-modal_body {

  }

  .confirmation-modal_body-slot {

  }

  .confirmation-modal_footer {
    margin-top: 20px;
  }
</style>
