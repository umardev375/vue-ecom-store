<template>
  <div>
    <TwoColHeader :title="$t('Neue Addresse hinzufügen')"></TwoColHeader>
    <AddressForm></AddressForm>
  </div>
</template>

<script>
import AddressForm from '@/components/Address/AddressForm'
import TwoColHeader from '@/components/TwoColHeader'
export default {
  name: 'AddressCreatePage',
  components: { TwoColHeader, AddressForm }
}
</script>

<style lang="scss" scoped></style>
