<template>
  <div>
    <PageHeaderDesign title-tag="h2" title="Smartwatches" />
    <BreadcrumbNavDesign />
    <div :class="$style.content">
      <TheContainer>
        <div :class="$style.cols">
          <div :class="$style.col1">
            <ProductImageDesign />
            <ProductThumbnailsDesign />
          </div>
          <div :class="$style.col2">
            <ProductHeaderDesign
              title="Apple Smartwatch"
              description="Series 5, Aluminum Case"
            />
            <ProductPriceDesign :class="$style.price" />
            <div :class="$style.attributes">
              <ProductAttributeColorsDesign
                :colors="product.colors"
                :class="$style.attribute"
              />
              <ProductAttributeSizesDesign
                :sizes="product.sizes"
                :class="$style.attribute"
              />
            </div>
            <ProductQtyFieldDesign :class="$style.qtyField" />
            <ProductSocialSharingDesign :class="$style.socialSharing" />
          </div>
        </div>
        <ProductTabsDesign />
      </TheContainer>
    </div>
    <PageServicesDesign />
  </div>
</template>

<script>
import BreadcrumbNavDesign from '@/components/_design/BreadcrumbNavDesign'
import PageHeaderDesign from '@/components/_design/PageHeaderDesign'
import PageServicesDesign from '@/components/_design/PageServicesDesign'
import ProductAttributeColorsDesign from '@/components/_design/Product/ProductAttributeColorsDesign'
import ProductAttributeSizesDesign from '@/components/_design/Product/ProductAttributeSizesDesign'
import ProductHeaderDesign from '@/components/_design/Product/ProductHeaderDesign'
import ProductImageDesign from '@/components/_design/Product/ProductImageDesign'
import ProductPriceDesign from '@/components/_design/Product/ProductPriceDesign'
import ProductQtyFieldDesign from '@/components/_design/Product/ProductQtyFieldDesign'
import ProductSocialSharingDesign from '@/components/_design/Product/ProductSocialSharingDesign'
import ProductTabsDesign from '@/components/_design/Product/ProductTabsDesign'
import ProductThumbnailsDesign from '@/components/_design/Product/ProductThumbnailsDesign'
import TheContainer from '@/components/TheContainer'

export default {
  components: {
    ProductTabsDesign,
    ProductSocialSharingDesign,
    ProductQtyFieldDesign,
    ProductAttributeSizesDesign,
    ProductAttributeColorsDesign,
    ProductPriceDesign,
    ProductHeaderDesign,
    ProductThumbnailsDesign,
    TheContainer,
    ProductImageDesign,
    PageServicesDesign,
    BreadcrumbNavDesign,
    PageHeaderDesign
  },
  data() {
    return {
      product: {
        colors: ['#fff', '#cc1d00', '#8f5ba6', '#724d30', '#828282', '#000'],
        sizes: ['42mm', '44mm']
      }
    }
  }
}
</script>

<style lang="scss" module>
.content {
  padding: rem-calc(68px 0 0);
}

.cols {
  display: flex;
  flex-wrap: wrap;
}

.col1 {
  margin-right: wrap-calc(70px);
  width: wrap-calc(474px);

  @include media-breakpoint-down(md) {
    margin-bottom: rem-calc(70px);
    margin-right: 0;
    width: 100%;
  }
}

.col2 {
  width: wrap-calc(426px);

  @include media-breakpoint-down(md) {
    width: 100%;
  }
}

.price {
  margin-bottom: rem-calc(55px);
}

.attributes {
  margin-top: rem-calc(55px);
}

.attribute {
  margin-bottom: rem-calc(25px);
}

.attribute {
  margin-bottom: rem-calc(25px);
}

.qtyField {
  margin-top: rem-calc(62px);
}

.socialSharing {
  margin-top: rem-calc(76px);
}
</style>
