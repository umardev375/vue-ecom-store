<template>
  <div :class="`col-md-${widget.span} mb-4 mb-md-0`">
    <div
      v-if="widget.type !== 'PLACEHOLDER' && isEnabled(widget.type)"
      class="widget"
    >
      <WidgetHeader v-if="globalSettings" :global-settings="globalSettings" />

      <component
        :is="widget.type"
        :settings="widgetSettings"
        :data="widget.additions"
      />
    </div>
  </div>
</template>

<script>
import WidgetHeader from '@/components/Renderer/WidgetHeader'

const enabledTypes = [
  'RICH_TEXT',
  'PRODUCT_FEED',
  'SLIDER',
  'BUTTON',
  'HERO',
  'TESTIMONIAL'
]
export default {
  name: 'WidgetBase',
  components: {
    WidgetHeader,
    RICH_TEXT: () => import('./RichText/RichTextBase'),
    PRODUCT_FEED: () => import('./ProductFeed/ProductFeedBase'),
    SLIDER: () => import('./Slider/SliderBase'),
    BUTTON: () => import('./Button/ButtonBase'),
    HERO: () => import('./Hero/HeroBase'),
    TESTIMONIAL: () => import('./Testimonial/TestimonialBase')
  },
  props: {
    widget: {
      type: Object,
      required: true
    }
  },

  computed: {
    globalSettings() {
      return this.widget?.settings?.globalSettings
    },
    widgetSettings() {
      return this.widget?.settings?.widgetSettings
    }
  },
  methods: {
    isEnabled(type) {
      return enabledTypes.includes(type)
    }
  }
}
</script>

<style lang="scss" scoped></style>
