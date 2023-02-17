<template>
  <ul :class="$style.list">
    <li :class="$style.item">
      <nuxt-link :to="localePath({ name: 'index' })" :class="$style.link"
        >Home Page
      </nuxt-link>
      <ChevronRightIcon :class="$style.itemSvg" />
    </li>
    <li :class="$style.item">
      <nuxt-link :to="localePath({ name: 'index' })" :class="$style.link"
        >Watches</nuxt-link
      >
      <ChevronRightIcon :class="$style.itemSvg" />
    </li>
    <li :class="$style.item">
      <nuxt-link :to="localePath({ name: 'index' })" :class="$style.link"
        >Smartwatches</nuxt-link
      >
      <ChevronRightIcon :class="$style.itemSvg" />
    </li>
  </ul>
</template>

<script>
import ChevronRightIcon from '@/icons/ChevronRightIcon'

export default {
  name: 'BreadcrumbDesign',
  components: { ChevronRightIcon }
}
</script>

<style lang="scss" module>
.list {
  list-style: none;
  margin: rem-calc(0 -14px);
  padding: 0;
}

.item {
  display: inline-block;
  line-height: 1;
  padding: rem-calc(0 14px);
  position: relative;

  &__svg {
    fill: $gray-400;
    height: rem-calc(10px);
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
    width: rem-calc(6px);

    .item:last-child & {
      display: none;
    }
  }
}

.link {
  @include font-size(11px);
  display: inline-block;
  line-height: 1.2;
}
</style>
