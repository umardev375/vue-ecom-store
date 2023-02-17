<template>
  <div
    class="slide"
    :style="{
      backgroundImage: `url(${slide.image.originalUrl})`
    }"
  >
    <div
      v-if="slide.description || slide.heading"
      class="slide__content slide__content--center slide__content--backdrop"
    >
      <h2 v-if="slide.heading" class="slide__title">{{ slide.heading }}</h2>
      <p v-if="slide.description" class="slide__text mb-8">
        {{ slide.description }}
      </p>
      <MenuLink
        v-if="Object.keys(linkStyle).length > 0"
        :style="linkStyle"
        class="slide__link d-inline-block mt-8"
        :link-type="slide.button.type"
        :slug="slide.button.slug"
        :label="slide.button.label"
      />
    </div>
  </div>
</template>

<script>
import MenuLink from '@/components/Menu/MenuLink'
export default {
  name: 'SliderSlide',
  components: { MenuLink },
  props: {
    slide: {
      type: Object,
      required: true
    }
  },
  computed: {
    linkStyle() {
      const style = this.slide?.button?.style || {}

      if (Object.keys(style).length > 0) {
        return style
      } else {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slide {
  padding: rem-calc(20px);
  color: white;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-content: center;
  &__content {
    &--center {
      z-index: 20;
      text-align: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: rem-calc(60px);
      right: rem-calc(60px);
    }
    &--backdrop {
      background: rgba(#0000, 0.4);
      padding: rem-calc(20px);
    }
  }
  &__link {
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    padding: 8px 16px;
    transition: background-color ease-in, 0.3s;
    border: 2px solid white;
    &:hover {
      background: $blue;
    }
  }
}
</style>
