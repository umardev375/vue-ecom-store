<template>
  <TransitionGroup
    :enter-class="$style.enter"
    :enter-active-class="$style.enterActive"
    :leave-to-class="$style.leaveTo"
    :leave-active-class="$style.leaveActive"
    :move-class="$style.move"
    :class="$style.list"
    tag="div"
  >
    <div v-for="toast in toasts" :key="toast.id" :class="$style.listItem">
      <ToastItem v-bind="toast" />
    </div>
  </TransitionGroup>
</template>

<script>
import ToastItem from './ToastItem'

export default {
  name: 'ToastManager',

  components: {
    ToastItem
  },

  computed: {
    toasts() {
      return this.$store.getters['toast/all']
    }
  }
}
</script>

<style lang="scss" module>
.enter-active,
.leave-to,
.move {
  transition: opacity 200ms, transform 200ms;
}

.enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.leave-to {
  opacity: 0;
}

.leave-active {
  position: absolute;
}

.list {
  bottom: 0;
  max-width: 420px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;

  z-index: z('toast');

  &__item {
    padding: 0 20px 20px;
    width: 100%;
  }
}
</style>
