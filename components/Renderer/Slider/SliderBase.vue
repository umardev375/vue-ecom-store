<template>
  <div ref="slider" class="swiper-container slider" :style="sliderStyle">
    <div class="swiper-wrapper">
      <SliderSlide
        v-for="slide in data.slides.value"
        :key="slide.id"
        class="swiper-slide"
        :slide="slide"
      />
    </div>
    <div class="swiper-button-prev slider__arrow"></div>
    <div class="swiper-button-next slider__arrow"></div>
  </div>
</template>

<script>
import widgetMixin from '@/components/Renderer/widgetMixin'
import 'swiper/swiper-bundle.css'
import Swiper from 'swiper/bundle'
import SliderSlide from '@/components/Renderer/Slider/SliderSlide'
export default {
  name: 'SliderBase',
  components: { SliderSlide },
  mixins: [widgetMixin],

  data() {
    return {
      swipper: null
    }
  },

  computed: {
    sliderStyle() {
      const height = this.settings?.height?.value ?? 400
      const heightUnit = this.settings?.heightUnit?.value ?? 'px'

      return {
        height: height + heightUnit
      }
    }
  },
  mounted() {
    if (this.swipper) return

    this.swipper = new Swiper(this.$refs.slider, {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      effect: 'cube'
    })
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy()
      this.swiper = null
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  &__arrow {
    color: $blue;
  }
}
</style>
