<template>
  <div class="form-group">
    <div v-if="!$auth.loggedIn" class="form-check form-check-inline">
      <input
        id="checkout-guest"
        v-model="internalValue"
        class="form-check-input"
        type="radio"
        name="inlineRadioOptions"
        value="guest"
        @change="$emit('input', internalValue)"
      />
      <label class="form-check-label" for="checkout-guest"
        >Checkout as Guest</label
      >
    </div>
    <div
      class="form-check form-check-inline"
      :class="{ 'ml-4': !$auth.loggedIn }"
    >
      <input
        id="checkout-account"
        v-model="internalValue"
        class="form-check-input"
        type="radio"
        :disabled="$auth.loggedIn"
        value="user"
        name="inlineRadioOptions"
        @change="$emit('input', internalValue)"
      />
      <label class="form-check-label" for="checkout-account"
        >Checkout with Account</label
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuestOrAccount',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      internalValue: this.value
    }
  }
}
</script>

<style lang="scss" scoped></style>
