<template>
  <div>
    <PageHeaderDesign title="Smartwatches" />
    <BreadcrumbNavDesign />
    <TheContainer :class="$style.content">
      <div class="row">
        <div :class="['col col-lg-auto', $style.aside]">
          <CategoryWidgetDesign />
        </div>
        <div class="col-12 col-lg">
          <CategoryHeroDesign
            title="Men Watches"
            :image="require('@/assets/images/mens-watches.jpg')"
          >
            We have 148 smartwatches in our offer: from elegant to modern style.
            Check, read and buy now
          </CategoryHeroDesign>
          <div class="row">
            <div
              v-for="(item, index) in items"
              :key="index"
              :class="['col-6 col-sm-4', $style.col]"
            >
              <ProductListItemDesign :item="item" />
            </div>
          </div>
          <CategoryHeroDesign
            title="Women Watches"
            :image="require('@/assets/images/women-watches.jpg')"
            right
          >
            We have 148 smartwatches in our offer: from elegant to modern style.
            Check, read and buy now
          </CategoryHeroDesign>
        </div>
      </div>
    </TheContainer>
    <PageServicesDesign />
  </div>
</template>

<script>
import BreadcrumbNavDesign from '@/components/_design/BreadcrumbNavDesign'
import CategoryHeroDesign from '@/components/_design/Category/CategoryHeroDesign'
import CategoryWidgetDesign from '@/components/_design/Category/CategoryWidgetDesign'
import PageServicesDesign from '@/components/_design/PageServicesDesign'
import ProductListItemDesign from '@/components/_design/Product/ProductListItemDesign'
import TheContainer from '@/components/TheContainer'
import PageHeaderDesign from '~/components/_design/PageHeaderDesign'

export default {
  components: {
    CategoryHeroDesign,
    ProductListItemDesign,
    CategoryWidgetDesign,
    TheContainer,
    PageServicesDesign,
    BreadcrumbNavDesign,
    PageHeaderDesign
  },
  data() {
    return {
      items: [
        {
          title: 'Smart Charging Apple Hub',
          shortDesc: 'Versa watch FB507RGPK',
          price: 189,
          salePrice: 140
        },
        {
          image: require('@/assets/images/product.png'),
          title: 'Smart Charging Apple Hub',
          shortDesc: 'Versa watch FB507RGPK',
          price: 189,
          salePrice: 140
        },
        {
          image: require('@/assets/images/product.png'),
          title: 'Smart Charging Apple Hub',
          shortDesc: 'Versa watch FB507RGPK',
          price: 189
        },
        {
          image: require('@/assets/images/product.png'),
          title: 'Smart Charging Apple Hub',
          shortDesc: 'Versa watch FB507RGPK',
          price: 189,
          salePrice: 140
        },
        {
          image: require('@/assets/images/product.png'),
          title: 'Smart Charging Apple Hub',
          shortDesc: 'Versa watch FB507RGPK',
          price: 189
        },
        {
          image: require('@/assets/images/product.png'),
          title: 'Smart Charging Apple Hub',
          shortDesc: 'Versa watch FB507RGPK',
          price: 189,
          salePrice: 140
        }
      ]
    }
  }
}
</script>

<style lang="scss" module>
.content {
  padding-bottom: rem-calc(66px);
  padding-top: rem-calc(66px);
}

.aside {
  width: rem-calc(248px);

  @include media-breakpoint-down(md) {
    margin-bottom: $grid-gutter-width;
  }
}

.col {
  @include media-breakpoint-down(xxs) {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
