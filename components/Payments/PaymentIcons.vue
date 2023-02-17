<template>
  <div v-if="brand">
    <VisaIcon v-if="brand === 'visa'" height="20px" class="mr-2" />
    <AmexIcon v-else-if="brand === 'amex'" height="20px" class="mr-2" />
    <MasterCardIcon v-else-if="brand === 'master'" height="20px" class="mr-2" />
  </div>
  <div v-else>
    <VisaIcon height="20px" class="mr-2" />
    <AmexIcon height="20px" class="mr-2" />
    <MasterCardIcon height="20px" class="mr-2" />
  </div>
</template>

<script>
import VisaIcon from '@/icons/VisaIcon'
import AmexIcon from '@/icons/AmexIcon'
import MasterCardIcon from '@/icons/MasterCardIcon'
export default {
  name: 'PaymentIcons',
  components: { MasterCardIcon, AmexIcon, VisaIcon },
  props: {
    brand: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
