<template>
  <div
    ref="testimonial"
    class="swiper-container testimonial"
    :style="sliderStyle"
  >
    <div class="swiper-wrapper">
      <TestimonialSlide
        v-for="testimonial in data.testimonial.value"
        :key="testimonial.id"
        class="swiper-slide"
        :testimonial="testimonial"
      />
    </div>
    <div class="swiper-button-prev testimonial__arrow"></div>
    <div class="swiper-button-next testimonial__arrow"></div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import widgetMixin from '@/components/Renderer/widgetMixin'
import 'swiper/swiper-bundle.css'
import Swiper from 'swiper/bundle'
import TestimonialSlide from '@/components/Renderer/Testimonial/TestimonialSlide'
export default {
  name: 'TestimonialBase',
  components: { TestimonialSlide },
  mixins: [widgetMixin],

  data() {
    return {
      swipper: null
    }
  },

  computed: {
    sliderStyle() {
      const height = this.settings?.height?.value ?? 600
      const heightUnit = this.settings?.heightUnit?.value ?? 'px'

      return {
        height: height + heightUnit
      }
    }
  },
  mounted() {
    if (this.swipper) return

    this.swipper = new Swiper(this.$refs.testimonial, {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      effect: 'slide',
      slidesPerView: 1,
      hashNavigation: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      }
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
.testimonial {
  &__arrow {
    color: $white;
    background: var(--theme-success-color);
    padding: 25px;
    border-radius: 50%;
    &::after {
      font-size: 1.5em;
    }
  }
}
</style>
