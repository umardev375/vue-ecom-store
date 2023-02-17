<template functional>
  <div
    :class="[
      $style.container,
      {
        [$style.containerInline]: inline,
        [$style.containerAbsolute]: absolute
      }
    ]"
  >
    <div
      :class="[
        $style.spinner,
        {
          [$style.spinnerLg]: lg,
          [$style.spinnerSm]: sm
        }
      ]"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',

  props: {
    absolute: {
      type: Boolean,
      default: false
    },

    inline: {
      type: Boolean,
      default: false
    },

    lg: {
      type: Boolean,
      default: false
    },

    sm: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  justify-content: center;

  &--absolute {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &--inline {
    display: inline-flex;
  }
}

.spinner {
  animation: rotate 1s linear infinite;
  border-radius: 50%;
  border: rem-calc(5px) solid;
  border-right-color: var(
    --theme-primary-color
  ); // IMPORTANT: must be after border
  color: var(--theme-secondary-color);
  height: rem-calc(48px);
  position: relative;
  width: rem-calc(48px);

  &--lg {
    border: rem-calc(7px) solid;
    border-right-color: var(
      --theme-primary-color
    ); // IMPORTANT: must be after border
    height: rem-calc(96px);
    width: rem-calc(96px);
  }

  &--sm {
    border: rem-calc(3px) solid;
    border-right-color: var(
      --theme-primary-color
    ); // IMPORTANT: must be after border
    height: rem-calc(24px);
    width: rem-calc(24px);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
