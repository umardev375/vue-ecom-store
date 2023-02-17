<template>
  <div>
    <div :class="$style.holder">
      <ImageObject
        v-if="item.image"
        :class="$style.image"
        :image="{ src: item.image }"
        fill
      />
      <div v-else :class="$style.empty">
        <NoCameraIcon :class="$style.emptySvg" />
      </div>
      <ProductBadgeDesign :class="$style.badge" title="-20%" black />
      <span :class="$style.like">
        <HeartIcon :class="$style.likeSvg" />
      </span>
    </div>
    <div :class="$style.body">
      <h2 :class="$style.title">
        {{ item.title }}
      </h2>
      <p v-if="item.shortDesc" :class="$style.shortDesc">
        {{ item.shortDesc }}
      </p>
      <ProductListItemPriceDesign
        :class="$style.price"
        :price="item.price"
        :sale-price="item.salePrice"
      />
      <ProductRatingsDesign />
    </div>
  </div>
</template>

<script>
import ProductBadgeDesign from '@/components/_design/Product/ProductBadgeDesign'
import ProductRatingsDesign from '@/components/_design/Product/ProductRatingsDesign'
import ProductListItemPriceDesign from '@/components/_design/Product/ProductListItemPriceDesign'
import ImageObject from '@/components/ImageObject'
import HeartIcon from '@/icons/HeartIcon'
import NoCameraIcon from '@/icons/NoCameraIcon'

export default {
  name: 'ProductListItemDesign',
  components: {
    ProductBadgeDesign,
    NoCameraIcon,
    HeartIcon,
    ProductRatingsDesign,
    ProductListItemPriceDesign,
    ImageObject
  },
  props: {
    item: {
      type: Object,
      required: true
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
