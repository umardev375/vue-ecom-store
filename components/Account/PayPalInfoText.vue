<template>
  <AccountContentBox title="PayPal">
    <div class="paypal p-2 d-flex justify-content-between align-items-center">
      <PaymentImage provider="paypal"></PaymentImage>
      <div v-if="hasPaypal && paypal.default">Standart Bezahlemethode</div>
      <div v-if="hasPaypal" class="buttons">
        <TheButton
          class="btn-sm"
          color="danger"
          @click="$emit('delete', paypal.id)"
          >Entfernen</TheButton
        >
        <TheButton
          v-if="!paypal.default"
          class="btn-sm"
          color="primary"
          @click="$emit('default', paypal.id)"
          >Als Standard setzten</TheButton
        >
      </div>
      <div v-else class="paypalinfo">
        <p>
          Bezahlung per PayPal - einfach, schnell und sicher. <br />
          Zahlung per Lastschrift oder Kreditkarte ist auch ohne PayPal-Konto
          möglich.
        </p>
        <strong
          >Um PayPal mit Ihrem Konto zu verknüpfen wählen Sie beim Bezahlvorang
          PayPal aus.</strong
        >
      </div>
    </div>
  </AccountContentBox>
</template>
<script>
import AccountContentBox from '@/components/Account/AccountContentBox'
import PaymentImage from '@/components/Payments/PaymentImage'
import TheButton from '@/components/Forms/TheButton'

export default {
  name: 'PayPalInfoText',
  components: { TheButton, PaymentImage, AccountContentBox },
  props: {
    paypal: {
      type: [Object],
      required: true,
      default: () => ({})
    }
  },
  computed: {
    hasPaypal() {
      return Object.keys(this.paypal).length > 0
    }
  }
}
</script>

<style lang="scss" scoped>
.paypal {
  background: #f6f7f9;
}
</style>
