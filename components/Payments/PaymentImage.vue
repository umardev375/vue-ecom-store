<template>
  <img
    v-if="provider === 'paypal'"
    height="22"
    :src="paypal"
    alt="Paypal"
    @click="imageClick"
  />
  <div v-else-if="provider === 'stripe'">
    <div v-if="!payment" class="d-flex">
      <VisaIcon height="20px" class="mr-2" />
      <MasterCardIcon height="20px" class="mr-2" />
      <AmexIcon height="20px" class="mr-2" />
    </div>

    <div v-else>
      <!-- Todo: wenn payment ist gesetzt versuche raus zu finden welche Karte -->
      -
    </div>
  </div>

  <div v-else>{{ provider }}</div>
</template>

<script>
import paypal from '@/assets/images/payment/paypal.svg'
import stripe from '@/assets/images/payment/stripe.svg'
import VisaIcon from '@/icons/VisaIcon'
import MasterCardIcon from '@/icons/MasterCardIcon'
import AmexIcon from '@/icons/AmexIcon'
export default {
  name: 'PaymentImage',
  components: { AmexIcon, MasterCardIcon, VisaIcon },
  props: {
    alt: {
      type: String,
      default: ''
    },
    provider: {
      type: String,
      required: true
    },
    payment: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    return {
      stripe,
      paypal
    }
  },
  methods: {
    getAssets(asset) {
      return this[asset]
    },
    imageClick() {
      this.$emit('image-click', this.provider)
    }
  }
}
</script>

<style lang="scss" scoped></style>
