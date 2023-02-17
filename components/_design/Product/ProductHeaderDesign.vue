<template>
  <header :class="$style.header">
    <ProductHeaderAboveDesign />
    <h1 :class="$style.title">
      {{ title }}
    </h1>
    <p :class="$style.desc">
      {{ description }}
    </p>
  </header>
</template>

<script>
import ProductHeaderAboveDesign from '@/components/_design/Product/ProductHeaderAboveDesign'

export default {
  name: 'ProductHeaderDesign',
  components: { ProductHeaderAboveDesign },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" module>
.header {
  border-bottom: 2px solid rgba(#e3e3e3, 0.7);
  margin-bottom: rem-calc(16px);
  padding-bottom: rem-calc(10px);
}

.title {
  @include font-size(26px);
  line-height: 1.2;
  margin: rem-calc(0 0 8px);
}

.desc {
  @include font-size(15px);
  color: $gray-600;
  line-height: 1.2;
  margin: rem-calc(0 0 8px);
}
</style>
