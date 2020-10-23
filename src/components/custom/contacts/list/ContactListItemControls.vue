<template>
  <BaseButtonsContainer
    btnAlign="center">
    <BaseButton
      square
      size="small"
      variant="danger"
      @click.stop="onRemove">
      <BaseIcon
        iconColor="#FFFFFF"
        iconName="delete">
        <IconDelete />
      </BaseIcon>
    </BaseButton>
  </BaseButtonsContainer>
</template>

<script >
  import { defineAsyncComponent } from 'vue';

  const BaseButton = defineAsyncComponent(() => import('@/components/common/BaseButton'));
  const BaseButtonsContainer = defineAsyncComponent(() => import('@/components/common/BaseButtonsContainer'));
  const BaseIcon = defineAsyncComponent(() => import('@/components/common/BaseIcon'));
  const IconDelete = defineAsyncComponent(() => import('@/components/common/icons/IconDelete'));

  export default {
    name: 'ContactListItemControls',
    setup(props, { emit }) {
      const onRemove = () => emit('remove');

      return {
        onRemove
      };
    },
    components: {
      BaseButton,
      BaseButtonsContainer,
      BaseIcon,
      IconDelete
    }
  };
</script>

<style lang="scss">
  .constants-list-item-controls {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
