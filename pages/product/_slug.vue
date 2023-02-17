<template>
  <PageWrapper :loading="$fetchState.pending">
    <ValidationObserver v-slot="{ valid }" slim>
      <div :class="$style.cols">
        <div :class="$style.col1">
          <ProductImage
            :image="image"
            :thumbnails="thumbnails"
            :images="media"
          />
          <ProductGallery
            v-if="image"
            :thumbnails="thumbnails"
            @select-thumbnail="selectThumbnail"
          />
        </div>

        <div :class="$style.col2">
          <ProductHeader :title="displayTitle">
            <template #headerAbove>
              <ProductHeaderAbove :sale-percentage="percentage" />
            </template>
          </ProductHeader>

          <ProductPriceSingle
            :product="product"
            :variant-showing="variantIsShowing"
          />
          <ProductCodes />
          <div v-if="parentProduct.useVariants" :class="$style.attributes">
            <ProductVariantsList
              :selected-variant-id="selectedVariantId"
              :variant-loading="variantLoading"
              :attributes="parentProduct.attributes"
              :variants="parentProduct.variants"
              @change-product="loadVariant"
            />
          </div>
          <BAlert :show="outOfStock">
            Dieses Produkt ist derzeit nicht auf Lager
          </BAlert>
          <ProductQtyField
            :disable="variantLoading || !valid"
            :class="$style.price"
            :product="product"
          />
        </div>
      </div>
      <div :class="$style.desc" v-html="product.description"></div>
    </ValidationObserver>
    <ProductTabsBase :product="product" />
  </PageWrapper>
</template>

<script>
import ProductImage from '@/components/Product/Single/ProductImage'
import ProductGallery from '@/components/Product/Single/ProductGallery'
import ProductHeader from '@/components/Product/Single/ProductHeader'
import ProductHeaderAbove from '@/components/Product/Single/ProductHeaderAbove'
import { getPercentageChange } from '@/utils/helpers'
import ProductPriceSingle from '@/components/Product/ProductPriceSingle'
import ProductVariantsList from '@/components/Product/Variants2/ProductVariantsList'
import { ValidationObserver } from 'vee-validate'
import PageWrapper from '@/components/core/PageWrapper'
import ProductCodes from '@/components/Product/ProductCodes'
import ProductTabsBase from '@/components/Product/tabs/ProductTabsBase'
import ProductQtyField from '@/components/Product/AddToCart/ProductQtyField'
import { BAlert } from 'bootstrap-vue'

const load = [
  'variants.attributeValues',
  'attributes.values',
  'categories',
  'variants.attributes',
  'media',
  'stocks'
]
export default {
  name: 'SingleProduct',
  components: {
    ProductTabsBase,
    ProductCodes,
    PageWrapper,
    ProductVariantsList,
    ProductPriceSingle,
    ProductQtyField,
    ProductHeader,
    ProductGallery,
    ProductHeaderAbove,
    ProductImage,
    ValidationObserver,
    BAlert
  },
  data() {
    return {
      parentProduct: {},
      product: {},
      quantity: 1,
      selectedVariantId: '',
      activeThumbnailIndex: 0,
      loading: false,
      //  selectedAttributeValues: {},
      variantIsShowing: false,
      variantLoading: false,
      media: [],
      disableCartButton: false,
      replaceTitleWithVariantTitle: false
    }
  },
  async fetch() {
    // products?shopId=xxxx&slug=xxxx&limit=1
    // Todo: Better 404 error repsonse

    const { data: products } = await this.$axios.$get('products', {
      params: {
        limit: 1,
        shopId: this.$shopId,
        slug: this.$route.params.slug,
        load
      }
    })
    // Todo: later we need to redirect when a slug is outdated
    if (products.length === 0) {
      this.$nuxt.error({
        statusCode: 404,
        message: 'Produkt konnte nicht gefunden werden'
      })
    }
    // Todo: set an variable product as default when its possible relation to VariableProducts
    const product = products[0]
    this.parentProduct = product
    this.media = product.media
    if (!product.useVariants) {
      this.product = product
    } else {
      const firstVariant = product.variants[0].id
      this.selectedVariantId = firstVariant

      await this.loadVariant(firstVariant)
    }
  },

  head() {
    return {
      title: this.displayTitle
    }
  },

  // Todo: create a mixin to keep everything as the same for everywhere we show a product
  computed: {
    allowAddToCart() {
      return (
        this.attributes.length ===
        Object.keys(this.selectedAttributeValues).length
      )
    },

    outOfStock() {
      return this.product.stocks[0]
        ? this.product.stocks[0].availableAmount <= 0
        : 0
    },

    displayTitle() {
      if (this.variantIsShowing && this.replaceTitleWithVariantTitle) {
        return this.product.title
      } else {
        return this.parentProduct.title
      }
    },

    netPriceValue() {
      return this.product.netPrice.value
    },

    specialNetPriceValue() {
      return this.product?.specialNetPrice?.value ?? 0
    },

    specialNetPrice() {
      return this.product.specialNetPrice?.formatted
    },

    percentage() {
      if (!this.specialNetPrice) return 0
      return getPercentageChange(this.netPriceValue, this.specialNetPriceValue)
    },
    image() {
      return this.media?.[this.activeThumbnailIndex]
    },
    thumbnails() {
      return this.media?.map((item) => {
        item.image = item.originalUrl
        item.video = !!item.videoUrl
        return item
      })
    }
  },
  methods: {
    getPercentageChange,
    async loadVariant(id) {
      try {
        this.variantLoading = true

        const {
          data: variantProduct
        } = await this.$axios.$get(`products/${id}`, { params: { load } })
        this.variantIsShowing = true
        this.product = variantProduct
      } finally {
        this.variantLoading = false
      }
    }, // Todo: Move to fetch
    selectThumbnail(thumbNailIndex) {
      this.activeThumbnailIndex = thumbNailIndex
    }
  }
}
</script>

<style lang="scss" module>
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
  margin-top: rem-calc(35px);
}

.qtyField {
  margin-top: rem-calc(62px);
}

.socialSharing {
  margin-top: rem-calc(76px);
}

.desc {
  p {
    color: $gray-700;
    font-size: rem-calc(13px);
    line-height: (25 / 13);
    margin-bottom: rem-calc(24px);

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
