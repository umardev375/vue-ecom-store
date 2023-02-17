<template>
  <div :class="[$style.item, { [$style.itemSummary]: summary }]">
    <!-- <div v-if="!$fetchState.pending" :class="$style.holder">
      <ImageObject
        :image="{ src: 'https://via.placeholder.com/70/70' }"
        :alt="title"
        fill
      />
    </div>-->
    <div :class="$style.body">
      <div v-if="!$fetchState.pending" :class="$style.title">
        <ProductLink :slug="slug" :title="title">
          <span class="font-weight-light"> {{ item.quantity }}x </span>

          <TruncatText tag="span" :text="title" />
        </ProductLink>
      </div>
      <span :class="$style.price"
        >{{ item.totalGrossPrice.formatted }} inkl. Mwst.</span
      >

      <VolvButton
        v-if="!summary"
        :class="$style.remove"
        icon
        @click.native="deleteItem(item.id)"
      >
        <CloseMiniIcon :class="$style.removeSvg"></CloseMiniIcon>
      </VolvButton>
      <div :class="$style.variants">
        <div :class="$style.variantsList">
          <VariantBadget
            v-for="variant in variants"
            :key="variant"
            :light="!!summary"
            :class="$style.variantsItem"
            :variant="variant"
            >{{ variant }}</VariantBadget
          >
        </div>
        <QuantityField
          v-if="!summary"
          sm
          :item="item"
          @input="updateQuantity"
        />
      </div>
    </div>
  </div>
</template>

<script>
import cartMixin from '@/components/Cart/cartMixin'
import ImageObject from '@/components/ImageObject'
import ProductLink from '@/components/Product/ProductLink'
import CloseMiniIcon from '@/icons/CloseMiniIcon'
import VolvButton from '@/components/Forms/Button'
import TruncatText from '@/components/Common/Truncat'
import VariantBadget from '@/components/Cart/VariantBadget'
import QuantityField from '~/components/Cart/QuantityField'

export default {
  name: 'MiniCartItem',

  components: {
    VariantBadget,
    TruncatText,
    ImageObject,
    QuantityField,
    VolvButton,
    CloseMiniIcon,
    ProductLink
  },

  mixins: [cartMixin],

  props: {
    item: {
      type: Object,
      required: true
    },
    summary: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      variantProduct: {}
    }
  },
  async fetch() {
    //   console.log(this.item.product.id)

    const isVariant = this.item.product.isVariant

    if (isVariant) {
      try {
        const { data: variantProduct } = await this.$axios.$get(
          `/products/variants/${this.item.product.id}`,
          {
            params: { load: ['attributeValues', 'parent'] }
          }
        )
        this.variantProduct = variantProduct
      } catch (e) {}
    }
  },
  computed: {
    attributeValues() {
      return this.variantProduct.attributeValues || []
    },

    title() {
      return this.isVariant
        ? this.variantProduct.parent.title
        : this.item.product.title
    },

    slug() {
      return this.isVariant
        ? this.variantProduct.parent.slug
        : this.item.product.slug
    },
    isVariant() {
      return this.item.product.isVariant
    },
    variants() {
      return this.attributeValues.map((attr) => attr.title)
    }
  }
}
</script>

<style lang="scss" module>
.item {
  border-bottom: 1px solid #dedede;
  display: flex;
  padding-bottom: rem-calc(26px);
  padding-top: rem-calc(26px);

  &--summary {
    border-color: rgba(#dedede, 0.5);
    color: white;
  }
}

.holder {
  background-color: $gray-200;
  height: rem-calc(70px);
  margin-right: rem-calc(20px);
  position: relative;
  width: rem-calc(70px);
}

.body {
  flex-grow: 1;
  position: relative;
}

.title {
  font-size: rem-calc(12px);
  font-weight: $font-weight-bold;
  margin-bottom: rem-calc(3px);

  a {
    color: $body-color;
    transition: opacity 150ms ease-in-out;

    &:hover {
      color: currentColor;
      opacity: 0.8;
    }
  }

  .item--summary & a {
    color: white;
  }
}

.price {
  color: #525252;
  display: block;
  font-size: rem-calc(12px);
  margin-bottom: rem-calc(14px);

  .item--summary & {
    color: rgba(white, 0.7);
  }
}

.remove {
  border-radius: 0;
  border: 0;
  color: $body-color;
  line-height: 1;
  padding: rem-calc(6px);
  position: absolute;
  right: 0;
  top: rem-calc(-2px);
  transition: color 150ms ease-in-out;

  &:hover {
    color: $gray-600;
  }

  &__svg {
    color: currentColor;
    display: block;
    height: rem-calc(7px);
    width: rem-calc(7px);
  }
}

.variants {
  align-items: center;
  display: flex;
  justify-content: space-between;
  &__list {
    display: flex;
  }
}
</style>
