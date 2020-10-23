<template>
  <div class="contact-fields-form">
    <form
      class="contact-fields-form_form"
      @submit.prevent="onSubmit">

      <div class="contact-fields-form_form-row">
        <BaseInput
          v-for="field in fields"
          v-model:value="field.value"
          :placeholder="field.placeholder"
          :type="field.type"
          :key="field.key"
        />

        <BaseButtonsContainer
          v-if="newContact">
          <BaseButton
            type="submit"
            text="Add Field"
          />
        </BaseButtonsContainer>
      </div>
    </form>
  </div>
</template>

<script>
  import { defineAsyncComponent, reactive, computed, watch } from 'vue';

  const BaseInput = defineAsyncComponent(() => import('@/components/common/form/BaseInput'));
  const BaseButton = defineAsyncComponent(() => import('@/components/common/BaseButton'));
  const BaseButtonsContainer = defineAsyncComponent(() => import('@/components/common/BaseButtonsContainer'));

  export default {
    name: 'ContactFieldForm',
    props: {
      newContact: {
        type: Boolean,
        default: false
      },
      field: {
        type: Object,
        default: undefined
      },
      shouldSubmit: {
        type: Boolean,
        default: false
      },
    },
    setup(props, { emit }) {
      const fields = reactive({
        name: {
          key: 'name',
          type: 'text',
          placeholder: 'Field name',
          value: '',
        },
        value: {
          key: 'value',
          type: 'text',
          placeholder: 'Field value',
          value: '',
        },
      });
      const isValid = computed(() => {
        return fields.name.value && fields.value.value;
      });
      const shouldSubmit = computed(() => props.shouldSubmit);

      const setFromProps = () => {
        fields.name.value = props.field.name;
        fields.value.value = props.field.value;
      };
      const clearFields = () => {
        for (const key in fields) {
          const field = fields[key];

          field.value = '';
        }
      }
      const onSubmit = () => {
        if (!isValid.value) return ;

        const field = {
          name: fields.name.value,
          value: fields.value.value
        };

        emit('submit-form', field);

        if (props.newContact) {
          clearFields();
        }
      };

      if (!props.newContact) {
        setFromProps();
      }

      watch(shouldSubmit, (shouldSubmit) => {
        if (shouldSubmit) onSubmit();
      })

      return {
        fields,

        onSubmit,
      }
    },
    components: {
      BaseInput,
      BaseButton,
      BaseButtonsContainer
    }
  }
</script>

<style lang="scss">
  .contact-fields-form_form-row {
    display: flex;
    align-items: center;

    .base-input {
      width: 120px;
      flex-grow: 1;

      border-radius: 2px 0 0 2px;

      @include breakpoint('phone') {
        width: 100px;
      }

      &:not(:first-of-type) {
        border-radius: 0 2px 2px 0;
      }
    }

    .base-button {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
  }
</style>
