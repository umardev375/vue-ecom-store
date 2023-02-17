<template>
  <div :class="$style.el">
    <ProductTabsNavigation
      :tabs="tabs"
      :active-tab-index.sync="activeTabIndex"
      :class="$style.tabs"
    />
    <div v-for="(tab, tabIndex) in tabs" :key="tabIndex">
      <component
        :is="tab.component"
        v-bind="$props"
        v-if="activeTabIndex === tabIndex"
      />
    </div>
  </div>
</template>

<script>
import ProductTabDetails from '@/components/Product/tabs/content/ProductTabDetails'
/*
import ProductTabsNavDesign from '@/components/_design/Product/ProductTabsNavDesign'
import ProductDeliveryTabDesign from '@/components/_design/Product/tabs/ProductDeliveryTabDesign'
import ProductDescriptionTabDesign from '@/components/_design/Product/tabs/ProductDescriptionTabDesign'
import ProductFaqTabDesign from '@/components/_design/Product/tabs/ProductFaqTabDesign'
import ProductSpecsTabDesign from '@/components/_design/Product/tabs/ProductSpecsTabDesign' */

import ProductTabsNavigation from '@/components/Product/tabs/ProductTabsNavigation'
export default {
  name: 'ProductTabsDesign',
  components: {
    ProductTabsNavigation,
    ProductTabDetails
    /* ProductDeliveryTabDesign,
    ProductFaqTabDesign,
    ProductSpecsTabDesign,
    ProductDescriptionTabDesign,
    ProductTabsNavDesign */
  },
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      activeTabIndex: 0,
      tabs: [
        {
          title: 'Details',
          component: 'ProductTabDetails'
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
