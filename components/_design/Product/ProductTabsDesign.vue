<template>
  <div :class="$style.el">
    <ProductTabsNavDesign
      :tabs="tabs"
      :active-tab-index.sync="activeTabIndex"
      :class="$style.tabs"
    />
    <div v-for="(tab, tabIndex) in tabs" :key="tabIndex">
      <component :is="tab.component" v-if="activeTabIndex === tabIndex" />
    </div>
  </div>
</template>

<script>
import ProductTabsNavDesign from '@/components/_design/Product/ProductTabsNavDesign'
import ProductDeliveryTabDesign from '@/components/_design/Product/tabs/ProductDeliveryTabDesign'
import ProductDescriptionTabDesign from '@/components/_design/Product/tabs/ProductDescriptionTabDesign'
import ProductFaqTabDesign from '@/components/_design/Product/tabs/ProductFaqTabDesign'
import ProductSpecsTabDesign from '@/components/_design/Product/tabs/ProductSpecsTabDesign'

export default {
  name: 'ProductTabsDesign',
  components: {
    ProductDeliveryTabDesign,
    ProductFaqTabDesign,
    ProductSpecsTabDesign,
    ProductDescriptionTabDesign,
    ProductTabsNavDesign
  },
  data() {
    return {
      activeTabIndex: 0,
      tabs: [
        {
          title: 'Product Description',
          component: 'ProductDescriptionTabDesign'
        },
        {
          title: ' Specs & Features',
          component: 'ProductSpecsTabDesign'
        },
        {
          title: 'Faq',
          component: 'ProductFaqTabDesign'
        },
        {
          title: 'Delivery & Return',
          component: 'ProductDeliveryTabDesign'
        }
      ]
    }
  }
}
</script>

<style lang="scss" module>
.tabs {
  margin-bottom: rem-calc(34px);
}

.el {
  margin-top: rem-calc(54px);
  padding-bottom: rem-calc(68px);
}
</style>
