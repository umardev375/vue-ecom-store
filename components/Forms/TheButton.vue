<template>
  <component
    :is="tag"
    :class="computedClass"
    class="btn"
    :to="to"
    :type="type"
    @[clickEvent]="$emit('click')"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'TheButton',
  inject: ['theme'],
  props: {
    type: {
      type: String,
      default: 'button'
    },

    color: {
      type: String,
      default: 'primary'
    },

    tag: {
      type: String,
      default: 'button'
    },

    to: {
      type: [Object, String],
      default: null
    },
    icon: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    sm: {
      type: Boolean,
      default: false
    },
    link: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    computedClass() {
      return [
        `btn--${this.color}`,
        {
          'btn-link': this.link,
          'btn--loading': this.isLoading,
          'btn-sm': this.sm
        }
      ]
    },
    clickEvent() {
      if (this.tag === 'button') return 'click'
      return null
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes spinLoader {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.btn {
  &.btn-link {
    padding: 0;
    color: var(--theme-primary-color);
    text-decoration: none;
    background-color: transparent;
    &:hover {
      background: transparent;
      font-weight: 700;
      // background: var(--theme-primary-shade-color);
      //  color: var(--theme-primary-shade-color);
    }
  }

  &--loading {
    color: transparent !important;
    position: relative;
    pointer-events: none;

    &:after {
      animation: spinLoader 500ms infinite linear;
      border: 1px solid #fff;
      border-radius: 50%;
      border-right-color: transparent;
      border-top-color: transparent;
      content: '';
      display: block;
      height: 1em;
      position: absolute;
      left: calc(50% - (1em / 2));
      top: calc(50% - (1em / 2));
      width: 1em;
    }
  }

  &--dark {
    color: #fff;
    background-color: #000;
    border-color: #000;
  }

  &--primary {
    background: var(--theme-primary-color);
    color: white;
    &:hover {
      background: var(--theme-primary-shade-color);
    }
  }

  &--success {
    background: var(--theme-success-color);
    color: white;
    &:hover {
      background: var(--theme-success-shade-color);
    }
  }

  &--secondary {
    background: var(--theme-secondary-color);
    color: white;
    &:hover {
      background: var(--theme-secondary-shade-color);
    }
  }
  &--danger {
    background: var(--theme-danger-color);
    color: white;
    &:hover {
      background: var(--theme-danger-shade-color);
    }
  }
}
</style>
