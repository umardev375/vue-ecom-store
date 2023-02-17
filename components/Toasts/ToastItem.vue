<template>
  <div
    :id="id"
    :class="[$style.toast, $style[type]]"
    @mouseenter="stop"
    @mouseleave="start"
    @click="close"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'ToastItem',

  props: {
    id: {
      type: [String, Number],
      required: true
    },

    message: {
      type: [String, Number],
      required: true
    },

    buttons: {
      type: Array,
      default: () => []
    },

    duration: {
      type: Number,
      default: 5000
    },

    type: {
      type: String,
      default: '',
      validator(value) {
        return ['success', 'error', 'info'].includes(value)
      }
    }
  },

  data() {
    return {
      startedAt: 0,
      remaining: this.duration
    }
  },

  mounted() {
    this.start()
  },

  methods: {
    start() {
      if (!this.duration) {
        return
      }

      this.startedAt = Date.now()

      this.durationTimeoutId = window.setTimeout(() => {
        this.close()
      }, this.remaining)
    },

    stop() {
      window.clearTimeout(this.durationTimeoutId)
      this.remaining -= Date.now() - this.startedAt
    },

    close() {
      this.stop()
      this.$toast.close(this.id)
    }
  }
}
</script>

<style lang="scss" module>
.toast {
  text-align: center;
  background-color: #363636;
  border-radius: 4px;
  box-shadow: 0 0 rem-calc(76px) 0 rgba(46, 48, 64, 0.21);
  color: #ffffff;
  overflow: auto;
  padding: 20px 10px;
}

.success {
  background: var(--theme-success-color);
  box-shadow: 0 0 rem-calc(20px) 0 var(--theme-success-color-tint);
}

.error {
  background: var(--theme-danger-color);
  box-shadow: 0 0 rem-calc(20px) 0 var(--theme-danger-color-tint);
}

.info {
  background: var(--theme-primary-color);
  box-shadow: 0 0 rem-calc(20px) 0 var(--theme-primary-color-tint);
}
</style>
