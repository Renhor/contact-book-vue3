<template>
  <div class="contact-history">
    <BaseButtonsContainer
      btn-align="center">
      <BaseButton
        square
        :disabled="!canStepBack"
        @click="stepBack">
        <BaseIcon
          iconColor="#FFF"
          iconName="Step back">
          <IconBack />
        </BaseIcon>
      </BaseButton>

      <BaseButton
        square
        :disabled="!canStepNext"
        @click="stepNext">
        <BaseIcon
          iconColor="#FFF"
          iconName="Next step">
          <IconNext />
        </BaseIcon>
      </BaseButton>
    </BaseButtonsContainer>

    <BaseSeparator />

    <ol class="contact-history_list">
      <li class="contact-history_list-item">
        <BaseText :secondary="step !== -1">
          Initial
        </BaseText>
      </li>
      <li
        v-for="(action, i) in actions"
        class="contact-history_list-item"
        :key="i">
        <BaseText
          :secondary="step !== i">
          {{ action }}
        </BaseText>
      </li>
    </ol>
  </div>
</template>

<script>
  import { computed, defineAsyncComponent } from 'vue';

  import { useStore } from 'vuex';

  const BaseButtonsContainer = defineAsyncComponent(() => import('@/components/common/BaseButtonsContainer'));
  const BaseButton = defineAsyncComponent(() => import('@/components/common/BaseButton'));
  const BaseIcon = defineAsyncComponent(() => import('@/components/common/BaseIcon'));
  const BaseSeparator = defineAsyncComponent(() => import('@/components/common/BaseSeparator'));
  const BaseText = defineAsyncComponent(() => import('@/components/common/BaseText'));
  const IconBack = defineAsyncComponent(() => import('@/components/common/icons/IconBack'));
  const IconNext = defineAsyncComponent(() => import('@/components/common/icons/IconNext'));

  export default {
    name: 'ContactHistory',
    props: {
      contactId: {
        type: Number,
        required: true
      }
    },
    setup(props) {
      const store = useStore();
      const history = computed(() => store.getters['contacts/history']);
      const step = computed(() => store.getters['contacts/historyStep'])
      const historyExists = computed(() => Boolean(history.value.length));
      const actions = computed(() => history.value.map(h => h.actionType.split('/')[1]))

      const canStepBack = computed(() => step.value > -1);
      const canStepNext = computed(() => step.value + 1 < history.value.length);

      const stepBack = () => {
        store.dispatch('contacts/stepBackHistory', props.contactId);
      };
      const stepNext = () => {
        store.dispatch('contacts/stepNextHistory', props.contactId);
      };

      return {
        history,
        historyExists,
        step,
        actions,

        canStepBack,
        canStepNext,

        stepBack,
        stepNext
      }
    },
    components: {
      IconNext,
      IconBack,
      BaseIcon,
      BaseButton,
      BaseButtonsContainer,
      BaseSeparator,
      BaseText
    },
  }
</script>

<style lang="scss">
  .contact-history_list {

  }

  .contact-history_list-item {
    margin-bottom: 10px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
</style>
