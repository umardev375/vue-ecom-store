<template>
  <transition
    :enter-class="$style.enter"
    :enter-active-class="$style.enterActive"
    :leave-to-class="$style.leaveTo"
    :leave-active-class="$style.leaveActive"
    appear
  >
    <aside :class="$style.panel">
      <button :class="$style.closeBtn" type="button" @click="close">
        <CloseIcon2 />
      </button>
      <div :class="$style.inner">
        <TheNavDesign :class="$style.nav" />
      </div>
    </aside>
  </transition>
</template>

<script>
import TheNavDesign from '@/components/_design/Nav/TheNavDesign'
import ModalMixin from '@/components/modal/ModalMixin'
import CloseIcon2 from '@/icons/CloseIcon2'

export default {
  name: 'NavPanel',

  components: {
    CloseIcon2,
    TheNavDesign
  },

  mixins: [ModalMixin]
}
</script>

<style lang="scss" module>
.enter-active,
.leave-active {
  transition: transform 200ms ease-out;
}

.enter,
.leave-to {
  transform: translateX(100%);
}

.panel {
  background-color: #fff;
  color: $body-color;
  height: 100%;
  display: none;
  max-width: 400px;
  position: fixed;
  right: 0;
  top: 0;
  width: 90%;
  z-index: z('modal');

  @include media-breakpoint-down(sm) {
    display: flex;
  }
}

.closeBtn {
  background: transparent;
  border: 0;
  color: $gray-600;
  padding: rem-calc(9px);
  margin: rem-calc(19px 0);
  position: absolute;
  right: rem-calc($wrapper-padding);
  top: 0;

  @include media-breakpoint-down(sm) {
    right: rem-calc($wrapper-padding-sm);
  }

  &:focus {
    outline: 0;
  }

  svg {
    fill: currentColor;
    height: rem-calc(18px);
    width: rem-calc(18px);
  }
}

.inner {
  flex: 1 1 auto;
  overflow: auto;
  padding: rem-calc(90px $wrapper-padding);
}

.nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;

  li {
    margin: rem-calc(18px 0);
  }
}
</style>
