<template>
  <div>
    <div :class="$style.holder">
      <ProductLink :slug="product.slug" :title="product.title">
        <ImageObject
          v-if="image"
          :class="$style.image"
          :image="{ src: image }"
          fill
        />
        <div v-else :class="$style.empty">
          <NoCameraIcon :class="$style.emptySvg" />
        </div>
      </ProductLink>

      <ProductBadge
        v-if="specialNetPriceValue"
        black
        :title="percentage"
        :class="$style.badge"
      />
    </div>
    <div :class="$style.body">
      <!--    -->
      <ProductLink :title="product.title" :slug="product.slug">
        <h2 :class="$style.title">
          {{ truncatedTitle }}
        </h2>
      </ProductLink>
      <p v-if="product.shortDesct" :class="$style.shortDesc">
        {{ product.shortDesc }}
      </p>
      <ProductListItemPrice :product="product" />
    </div>
  </div>
</template>

<script>
import NoCameraIcon from '@/icons/NoCameraIcon'
import ImageObject from '@/components/ImageObject'
import ProductBadge from '@/components/Product/ProductBadge'
import truncate from 'truncate'
import ProductListItemPrice from '@/components/Product/ProductPrice'
import ProductLink from '@/components/Product/ProductLink'
import { getPercentageChange } from '@/utils/helpers'

export default {
  name: 'ProductListItem',
  components: {
    ProductLink,
    ProductListItemPrice,
    ProductBadge,
    ImageObject,
    NoCameraIcon
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  computed: {
    image() {
      return this.product.media?.[0]?.originalUrl || null
    },
    truncatedTitle() {
      return truncate(this.product.title, 18)
    },
    // Brutto
    grossPriceValue() {
      return this.product.grossPrice.value
    },

    netPriceValue() {
      return this.product.netPrice.value
    },
    specialNetPriceValue() {
      return this.product.specialNetPrice?.value ?? 0
    },

    specialNetPrice() {
      return this.product.specialNetPrice?.formatted
    },
    percentage() {
      return getPercentageChange(this.netPriceValue, this.specialNetPriceValue)
    }
  }
}
</script>

<style lang="scss" module>
.holder {
  padding-bottom: 100%;
  position: relative;
}

.image {
  background-color: #eeeeee;
}

.empty {
  align-items: center;
  border: 1px solid #e3e3e3;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  &__svg {
    fill: #dddddd;
    height: rem-calc(36px);
    width: rem-calc(36px);
  }
}

.badge {
  left: rem-calc(18px);
  position: absolute;
  top: rem-calc(18px);
}

.body {
  padding: rem-calc(26px 0);
  text-align: center;
}

.title {
  font-size: rem-calc(16px);
  line-height: 1.2;
  margin-bottom: rem-calc(6px);
}

.shortDesc {
  color: #a5a5a5;
  font-size: rem-calc(11px);
  margin-bottom: rem-calc(15px);
  text-transform: uppercase;
}

.price {
  margin-bottom: rem-calc(14px);
}

.like {
  color: #dddddd;
  display: inline-block;
  margin-left: rem-calc(26px);
  position: absolute;
  top: rem-calc(18px);
  right: rem-calc(18px);

  &:hover {
    color: $black;
  }

  &__svg {
    display: block;
    fill: currentColor;
    height: rem-calc(16px);
    width: rem-calc(20px);
  }
}
</style>
