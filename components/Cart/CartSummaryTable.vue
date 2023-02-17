<template>
  <table :class="['table table-sm table-borderless', $style.table]">
    <tbody>
      <tr>
        <th>Summe</th>
        <td class="text-right">
          {{ total.total.formatted }}
        </td>
      </tr>

      <tr>
        <th>Versandkosten</th>
        <td class="text-right">{{ shippingPrice }}</td>
      </tr>

      <tr>
        <th>Gesamtsumme ohne MwSt.:</th>
        <td class="text-right">
          {{ total.net.formatted }}
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th>Total</th>
        <td class="text-right">
          {{ total.total.formatted }}
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  name: 'CartSummaryTable',
  computed: {
    total() {
      return this.$store.getters['cart/total']
    },
    shippingPrice() {
      return this.$store.state.cart.shipping?.grossPrice?.formatted || 0
    }
  }
}
</script>

<style lang="scss" module>
.table {
  color: inherit;
  font-size: rem-calc(13px);
  margin-bottom: 0;

  th {
    padding-left: 0;
    vertical-align: top;
  }

  td {
    padding-right: 0;
    vertical-align: top;
  }

  tbody th {
    font-weight: $font-weight-base;
  }

  tfoot {
    font-size: rem-calc(16px);
    font-weight: $font-weight-bold;

    th,
    td {
      padding-top: rem-calc(22px);
    }
  }
}
</style>
