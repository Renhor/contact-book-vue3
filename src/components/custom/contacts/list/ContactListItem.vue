<template>
  <div class="contact-list-item">
    <p class="contact-list-item_name">
      {{ contact.name }}

      <BaseIcon
        class="contact-list-item_icon"
        width="14"
        height="14"
        iconName="Arrow right"
        iconColor="#303030">
        <IconArrow />
      </BaseIcon>
    </p>

    <ContactListItemControls
      @remove="onRemove"
    />
  </div>
</template>

<script >
  import { defineAsyncComponent } from 'vue';

  const ContactListItemControls = defineAsyncComponent(() => import('@/components/custom/contacts/list/ContactListItemControls.vue'))
  const BaseIcon = defineAsyncComponent(() => import('@/components/common/BaseIcon.vue'));
  const IconArrow = defineAsyncComponent(() => import('@/components/common/icons/IconArrowRight.vue'));

  export default {
    name: 'ContactListItem',
    props: {
      contact: {
        type: Object,
        required: true
      }
    },
    setup(props, { emit }) {
      const onRemove = () => emit('remove');

      return {
        onRemove
      };
    },
    components: {
      ContactListItemControls,
      BaseIcon,
      IconArrow
    }
  };
</script>

<style lang="scss">
  .contact-list-item {
    border: $border--default;
    border-radius: $border-radius--default;
    transition: $transition-ease--default;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      cursor: pointer;
      background-color: $color-background--main;
      border-color: $color-blue--soft;

      .contact-list-item_icon {
        transform: translateX(15px) scale(1) rotate(360deg);
        opacity: 1;
      }
    }
  }

  .contact-list-item_name {
    display: flex;
    align-items: center;
  }

  .contact-list-item_icon {
    transition: $transition-ease--default;
    transform: translateX(15px) scale(0);
    opacity: 0;
  }
</style>
