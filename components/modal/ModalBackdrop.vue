<template>
  <transition
    :enter-class="$style.backdropEnter"
    :enter-active-class="$style.backdropEnterActive"
    :leave-to-class="$style.backdropLeaveTo"
    :leave-active-class="$style.backdropLeaveActive"
    @before-enter="beforeEnter"
    @after-leave="afterLeave"
  >
    <div v-show="visible" :class="$style.backdrop" @click="close"></div>
  </transition>
</template>

<script>
export default {
  name: 'ModalBackdrop',

  computed: {
    visible() {
      return !!this.$store.state.modal.id
    }
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.onKeyUpEsc, true)
  },

  methods: {
    close() {
      this.$store.dispatch('modal/close')
    },

    onKeyUpEsc(event) {
      if (event.keyCode === 27) {
        this.close()
      }
    },

    beforeEnter() {
      const { documentElement } = document

      documentElement.style.overflowY = 'hidden'

      document.addEventListener('keyup', this.onKeyUpEsc, false)
    },

    afterLeave() {
      const { documentElement } = document

      documentElement.style.overflowY = null

      document.removeEventListener('keyup', this.onKeyUpEsc, false)
    }
  }
}
</script>

<style lang="scss" module>
.backdrop {
  background: rgba(#000, 0.1);
  display: none;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: z('modal-backdrop');

  @include media-breakpoint-down(sm) {
    display: block;
  }

  &--enter-active,
  &--leave-active {
    transition: opacity 200ms ease-out;
  }

  &--enter,
  &--leave-to {
    opacity: 0;
  }
}
</style>
