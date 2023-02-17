<template>
  <div class="table-holder">
    <table :class="['table', 'table-responsive', $style.productTable]">
      <thead>
        <tr>
          <th />
          <th>Width</th>
          <th>Height</th>
          <th>Length</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><b>Size</b></td>
          <td>{{ width }}</td>
          <td>{{ height }}</td>
          <td>{{ length }}</td>
        </tr>
      </tbody>
    </table>
    <table :class="['table', 'table-responsive', $style.productTable]">
      <tbody>
        <tr>
          <td><b>Weight</b></td>
          <td>{{ weight }}</td>
          <td />
          <td />
        </tr>
      </tbody>
    </table>
    <table :class="['table', 'table-responsive', $style.productTable]">
      <thead>
        <tr>
          <th />
          <th>EAN</th>
          <th>ASIN</th>
          <th>SKU</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><b>Unique</b></td>
          <td>{{ ean }}</td>
          <td>{{ asin }}</td>
          <td>{{ sku }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ProductTabDetails',
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    width() {
      return this.product?.dimensionWidth?.formatted || ''
    },
    height() {
      return this.product?.dimensionHeight?.formatted || ''
    },
    length() {
      return this.product?.dimensionLength?.formatted || ''
    },
    weight() {
      return this.product?.weight?.formatted || ''
    },
    ean() {
      return this.product?.ean || ''
    },
    asin() {
      return this.product?.asin || ''
    },
    sku() {
      return this.product?.sku || ''
    }
  }
}
</script>

<style lang="scss" module>
.productTable {
  td {
    width: 150px;
    &:first-child {
      width: 100px;
    }
  }
}
</style>
