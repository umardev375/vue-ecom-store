<template>
  <div class="badge" :class="statusClass">{{ statusText }}</div>
</template>

<script>
export default {
  name: 'OrderStatusIndicator',
  props: {
    status: {
      type: String,
      required: true
    }
  },

  computed: {
    statusText() {
      return this.status.toLowerCase()
    },

    statusClass() {
      return `badge--${this.elClass}`
    },

    success() {
      return ['COMPLETED', 'APPROVED', 'SHIPPED'].includes(this.status)
    },

    warning() {
      return ['PENDING', 'OPEN', 'READY_FOR_SHIPPING'].includes(this.status)
    },

    danger() {
      return ['REFUND', 'REFUNDED'].includes(this.status)
    },

    primary() {
      return ['SHIPPING'].includes(this.status)
    },

    elClass() {
      if (this.primary) {
        return 'primary'
      }
      if (this.success) {
        return 'success'
      }
      if (this.warning) {
        return 'warning'
      }
      if (this.danger) {
        return 'danger'
      }
      return null
    }
  }
}
</script>

<style lang="scss" scoped>
.badge {
  font-size: rem-calc(12px);
  color: white;
  display: inline;

  padding: rem-calc(4px);
  border-radius: 2px;
  &--danger {
    background: var(--theme-danger-color);
  }

  &--success {
    background: var(--theme-success-color);
  }

  &--primary {
    background: var(--theme-primary-color);
  }

  &--warning {
    background: var(--theme-warning-color);
  }
}
</style>
