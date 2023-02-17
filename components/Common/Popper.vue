<template>
  <div v-click-outside="hide" class="position-relative">
    <div ref="button" @click="toggle">
      <slot name="trigger" :visible="visible"></slot>
    </div>
    <div v-if="visible" ref="popup" :class="$style.popup">
      <slot></slot>
      <div :class="$style.arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import { createPopper } from '@popperjs/core/lib/popper-lite'
import flip from '@popperjs/core/lib/modifiers/flip'
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow'
import offset from '@popperjs/core/lib/modifiers/offset'
import arrow from '@popperjs/core/lib/modifiers/arrow'

export default {
  name: 'ThePopper',

  directives: { ClickOutside },

  props: {
    placement: {
      type: String,
      default: 'bottom'
    },

    offset: {
      type: Array,
      default: () => [0, 8]
    }
  },

  data() {
    return {
      visible: false
    }
  },

  beforeDestroy() {
    this.hide()
  },

  methods: {
    async show() {
      this.visible = true
      await this.$nextTick()
      this.popper = createPopper(this.$refs.button, this.$refs.popup, {
        placement: this.placement,
        modifiers: [
          flip,
          preventOverflow,
          arrow,
          offset,
          {
            name: 'offset',
            options: {
              offset: this.offset
            }
          }
        ]
      })
    },

    hide() {
      this.visible = false
      if (!this.popper) {
        return
      }
      this.popper.destroy()
      this.popper = null
    },

    toggle() {
      if (this.visible) {
        this.hide()
      } else {
        this.show()
      }
    }
  }
}
</script>

<style lang="scss" module>
.popup {
  z-index: z('modal');
}

.popup[data-popper-placement^='top'] > .arrow {
  bottom: -4px;
}

.popup[data-popper-placement^='bottom'] > .arrow {
  top: -4px;
}

.popup[data-popper-placement^='left'] > .arrow {
  right: -4px;
}

.popup[data-popper-placement^='right'] > .arrow {
  left: -4px;
}

.arrow,
.arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  z-index: -1;
}

.arrow::before {
  content: '';
  transform: rotate(45deg);
  left: 0;
  top: 0;
}
</style>
