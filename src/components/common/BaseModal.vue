<template>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
    <div
      v-if='isReady'
      class='base-modal'
      @click.self='emitCloseEvent'>
      <transition
        enter-active-class="animated slideIn"
        leave-active-class="animated slideOut">
        <div
          v-if="isReadyDialog"
          class='base-modal_dialog'>
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script >
  import { watch, ref, computed } from 'vue';

  export default {
    name: 'BaseModal',
    props: {
      isOpened: {
        type: Boolean,
        default: false
      }
    },
    setup(props, { emit }) {
      const isReady = ref(false);
      const isReadyDialog = ref(false);
      const isOpened = computed(() => props.isOpened);

      const watchOpened = (isOpened) => {
        if (isOpened) {
          isReady.value = true;
          setTimeout(() => isReadyDialog.value = true, 0);
        } else {
          isReadyDialog.value = false;
          setTimeout(() => isReady.value = false, 0);
        }
      };
      watch(isOpened, watchOpened);

      const emitCloseEvent = () => emit('close');

      return {
        isReady,
        isReadyDialog,
        emitCloseEvent
      };
    }
  };
</script>

<style lang="scss">
  .base-modal {
    position: fixed !important;
    top: 0;
    left: 0;
    z-index: $z-index-modal;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    background-color: rgba(0, 0, 0, .3);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 100px;
    padding-bottom: 150px;

    @include breakpoint('phone') {
      padding: 50px 0;

      .base-modal_dialog {
        margin: 0 15px;
        max-width: 96vw;
      }
    }
  }
</style>
