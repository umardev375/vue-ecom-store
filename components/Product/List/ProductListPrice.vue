<template>
  <div :class="$style.el">
    <component
      :is="salePrice ? 'strong' : 'span'"
      :class="{ 'sale-price': salePrice }"
    >
      {{ salePrice || price }}
    </component>
    <sup>
      <del v-if="salePrice">{{ price }}</del>
    </sup>
  </div>
</template>

<script>
export default {
  name: 'ProductPrice',
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    price() {
      return this.item.netPrice ? this.item.netPrice.formatted : null
    },

    salePrice() {
      return this.item.specialNetPrice
        ? this.item.specialNetPrice.formatted
        : null
    }
  }
}
</script>

<style lang="scss" module>
.el {
  font-weight: 600;
  line-height: 1.2;

  del {
    color: #939393;
    font-size: 0.8em;
    //font-size: 0.458em;
    font-weight: 400;
  }
}
</style>
