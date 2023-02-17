<template>
  <div
    class="background mainRow position-relative"
    :style="{ background: backgroundColor, color: textColor }"
  >
    <div class="containerWrap" :style="styles">
      <div
        v-if="hasWave"
        class="mainRow__wave position-absolute"
        :style="{ color: wave.color }"
      >
        <div v-html="wave.svg"></div>
      </div>
      <div
        v-if="rowTitle || rowSubtitle"
        :class="containerClass"
        class="content"
      >
        <div class="mb-1 row">
          <div class="col">
            <h1>{{ rowTitle }}</h1>
            <p>{{ rowSubtitle }}</p>
          </div>
        </div>
      </div>

      <div :class="widgetContainerClass">
        <div :class="rowClass">
          <template v-for="widget in row.widgets">
            <WidgetBase
              v-if="!emptyWidgetAdditions(widget)"
              :key="widget.id"
              :widget="widget"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WidgetBase from '@/components/Renderer/WidgetBase'
import waveMixin from '@/components/Renderer/mixins/waveMixin'
import isEmpty from 'lodash-es/isEmpty'
import mapValues from 'lodash-es/mapValues'
export default {
  name: 'BuilderRow',
  components: { WidgetBase },
  mixins: [waveMixin],
  props: {
    row: {
      type: Object,
      required: true
    }
  },

  computed: {
    hasTitle() {
      return this.rowTitle || this.rowSubtitle
    },

    mainContainerStyles() {
      return this.hasTitle ? null : this.styles
    },
    textContainerStyle() {
      return this.hasTitle ? this.styles : null
    },

    firstContainerClass() {
      return this.containerClass
    },

    containerClass() {
      return this.settings?.fullWidth?.value ? 'container-fluid' : 'container'
    },

    rowClass() {
      return ['row', { 'no-gutters': this.noGutters }]
    },
    widgetContainerClass() {
      // return

      const containerClass = this.settings?.fullWidth?.value
        ? 'container-fluid'
        : 'container'

      return [this.noGutters ? '' : this.containerClass]
    },

    styles() {
      const paddings = this.row.styles?.paddings || {}
      return {
        ...mapValues(paddings, (padding) => {
          return padding + 'px'
        })
      }
    },

    rowTitle() {
      return this.row?.settings?.title?.value
    },
    rowSubtitle() {
      return this.row?.settings?.description?.value
    },

    backgroundColor() {
      return this.row?.settings?.backgroundColor?.value
    },
    settings() {
      return this.row.settings
    },

    textColor() {
      return this.row?.settings?.textColor?.value
    },
    noGutters() {
      return this.settings?.noGutters?.value || false
    }
  },

  methods: {
    emptyWidgetAdditions(widget) {
      return isEmpty(widget.additions)
    }
  }
}
</script>

<style lang="scss" scoped>
.background {
  //padding: rem-calc(25px) 0;
}

.content {
  z-index: 20;
  position: relative;
}
.mainRow {
  z-index: 3;
  &__wave {
    bottom: 0;
    right: 0;
    width: 100%;
  }
}
</style>
