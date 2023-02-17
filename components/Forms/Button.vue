<template>
  <button
    class="btn"
    :class="[
      { 'btn-block': block },
      { 'btn-sm': compact || sm },

      { [$style.btn]: icon }
    ]"
    :type="type"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'VolvButton',

  props: {
    icon: {
      default: false,
      type: Boolean
    },
    permission: {
      type: String,
      default: ''
    },
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },

    button: {
      default: false,
      type: Boolean
    },

    compact: {
      default: false,
      type: Boolean
    },
    sm: {
      default: false,
      type: Boolean
    }
  },

  computed: {
    type() {
      if (this.button) {
        return 'button'
      }
      return 'submit'
    },

    hasPermission() {
      return !this.permission
    }
  }
}
</script>

<style lang="scss" module>
.btn {
  //color: #9d9dba;
  padding: 0;
}
</style>
