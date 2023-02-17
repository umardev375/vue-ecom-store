<template>
  <div :class="$style.el">
    <ProductQtyDesign :class="$style.qty" />
    <button :class="['btn btn-dark', $style.btn]" type="button">
      Add to cart
    </button>
  </div>
</template>

<script>
import ProductQtyDesign from '@/components/_design/Product/ProductQtyDesign'

export default {
  name: 'ProductQtyFieldDesign',
  components: { ProductQtyDesign }
}
</script>

<style lang="scss" module>
.el {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: rem-calc(0 -13px -26px);
}

.qty {
  margin: rem-calc(0 13px 26px);
  flex-shrink: 0;
}

.btn {
  flex-grow: 1;
  flex-shrink: 1;
  margin: rem-calc(0 13px 26px);
  max-width: rem-calc(264px);
  min-width: fit-content;
}
</style>
