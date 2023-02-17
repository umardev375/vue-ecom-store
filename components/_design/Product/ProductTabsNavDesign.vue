<template>
  <div ref="swiper" :class="['swiper-container', $style.swiper]">
    <div class="swiper-wrapper">
      <div
        v-for="(tab, tabIndex) in tabs"
        :key="tabIndex"
        :class="['swiper-slide', $style.slide]"
      >
        <div
          :class="[
            $style.tab,
            $style[`tab-${tabIndex + 1}`],
            { [$style.tabActive]: tabIndex === activeTabIndex }
          ]"
          @click="$emit('update:active-tab-index', tabIndex)"
        >
          {{ tab.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper } from 'swiper'

export default {
  name: 'ProductTabsNavDesign',
  props: {
    activeTabIndex: {
      type: Number,
      required: true
    },

    tabs: {
      type: Array,
      required: true
    }
  },

  mounted() {
    this.swiper = new Swiper(this.$refs.swiper, {
      slidesPerView: 'auto',
      freeMode: true,
      slideToClickedSlide: true
    })
  },

  beforeDestroy() {
    this.swiper.destroy()
    this.swiper = null
  }
}
</script>

<style lang="scss" module>
.swiper {
  padding-bottom: 2px;

  &::after {
    background: #ececec;
    bottom: 0;
    content: '';
    height: 2px;
    left: 0;
    position: absolute;
    width: 100%;
  }
}

.slide {
  width: auto;
  margin-right: rem-calc(20px);

  &:last-child {
    margin-right: 0;
  }
}

.tab {
  @include font-size(15px);
  border-bottom: 2px solid transparent;
  color: $gray-600;
  cursor: pointer;
  line-height: 1.2;
  margin-bottom: -2px;
  padding: rem-calc(0 14px 24px);
  user-select: none;

  &:hover {
    color: $black;
  }

  &--active {
    border-bottom-color: $black;
    color: $black;
  }
}
</style>
