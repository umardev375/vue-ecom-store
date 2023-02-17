<template>
  <ChildPageWrapper>
    <TwoColHeader :title="$t('Addresse ändern')"></TwoColHeader>
    <AddressForm :item="address"></AddressForm>
  </ChildPageWrapper>
</template>

<script>
import AddressForm from '@/components/Address/AddressForm'
import TwoColHeader from '@/components/TwoColHeader'
import ChildPageWrapper from '@/components/core/LoadingWrapper'
export default {
  name: 'AdressEditPageId',
  components: {
    ChildPageWrapper,
    TwoColHeader,
    AddressForm
  },
  async asyncData(ctx) {
    const addressId = ctx.params.address
    const { data: address } = await ctx.$axios.$get(
      `/shops/customers/addresses/${addressId}`
    )

    return {
      address: {
        countryId: address.country,
        ...address
      }
    }
  },
  data() {
    return {
      address: {}
    }
  }
}
</script>

<style lang="scss" scoped></style>
