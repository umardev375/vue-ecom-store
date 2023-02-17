<template>
  <div class="wrapper">
    <div :class="$style.el">
      <slot v-if="Object.keys(address).length" :address="address">
        <p v-if="address.company">
          <strong>{{ address.company }}</strong>
        </p>
        <p>{{ address.firstname }} {{ address.lastname }}</p>
        <p>{{ address.addressLine1 }}</p>
        <p v-if="address.addressLine2">
          Adresszusatz: {{ address.addressLine2 }}
        </p>
        <p>{{ address.zip }} {{ address.city }}</p>
        <p>{{ country.name }}</p>
      </slot>
      <div v-else>
        <slot name="empty"></slot>
      </div>
    </div>

    <slot name="footer" :address="address"> </slot>
  </div>
</template>

<script>
export default {
  name: 'AddressDisplay',
  props: {
    address: {
      type: Object,
      required: true
    }
  },
  computed: {
    country() {
      return this.$store.state.shop.countries.find((country) => {
        return country.id === this.address.country
      })
    }
  }
}
</script>

<style lang="scss" module>
.el {
  font-size: rem-calc(12px);
  line-height: (18 / 12);
  margin-top: rem-calc(14px);

  &:first-child {
    margin-top: 0;
  }

  p {
    margin-bottom: rem-calc(6px);

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
