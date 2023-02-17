<template>
  <div
    :style="imageStyle"
    :class="[
      'object',
      { 'object--fill': fill },
      { 'object--fixed': fixed },
      { 'object--center': center }
    ]"
  >
    <img v-if="src" ref="image" v-bind="imageAttrs" alt="" />
  </div>
</template>

<script>
import 'lazysizes'
import 'lazysizes/plugins/object-fit/ls.object-fit'

export default {
  name: 'ImageObject',
  props: {
    image: {
      type: null,
      required: true
    },

    fill: {
      type: Boolean,
      default: false
    },

    contain: {
      type: Boolean,
      default: false
    },

    lazyload: {
      type: Boolean,
      default: true
    },

    opacity: {
      type: Number,
      default: null
    },

    cssFilter: {
      type: String,
      default: null
    },

    color: {
      type: String,
      default: null
    },

    pos: {
      type: String,
      default: ''
    },

    notrans: {
      type: Boolean,
      default: false
    },

    fixed: {
      type: Boolean,
      default: false
    },

    center: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    imageObj() {
      return this.image || {}
    },

    src() {
      return this.imageObj.base64Svg
        ? this.imageObj.base64Svg
        : this.imageObj.src || this.imageObj.url || this.imageObj.originalUrl
    },

    srcset() {
      return this.imageObj.responsiveImages &&
        this.imageObj.responsiveImages.length
        ? this.imageObj.responsiveImages
            .map((image) => `${image.url} ${image.width}w`)
            .join(', ')
        : null
    },

    imageStyle() {
      const style = {}

      if (!this.fill) {
        style.paddingBottom = `${
          (this.imageObj.height / this.imageObj.width) * 100
        }%`
      }

      if (this.color) {
        style.backgroundColor = `${this.color}`
      }
      return Object.keys(style).length === 0 ? '' : style
    },

    imageAttrs() {
      return {
        src:
          this.notrans || !this.lazyload
            ? this.src
            : 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        style: {
          opacity: this.opacity,
          filter: this.cssFilter,
          objectPosition: this.pos
        },
        class: [
          'object__fit',
          this.contain ? 'object__fit--contain' : 'object__fit--cover',
          {
            [this.$style.transition]: !this.notrans,
            lazyload: this.lazyload
          }
        ],
        ...(this.lazyload
          ? {
              'data-src': this.src,
              'data-srcset': this.srcset,
              'data-sizes': this.srcset ? 'auto' : null
            }
          : null)
      }
    }
  },

  watch: {
    src() {
      const image = this.$refs.image

      if (!image || !this.lazyload) {
        return
      }

      // image.removeAttribute('src');
      // image.removeAttribute('srcset');
      // image.removeAttribute('sizes');
      image.classList.remove('lazyloaded', 'ls-is-cached')
      image.classList.add('lazyload')
    }
  }
}
</script>

<style lang="scss" module>
.transition:not(:global(.ls-is-cached)) {
  &:global(.lazyload),
  &:global(.lazyloading) {
    opacity: 0;
  }

  &:global(.lazyloaded) {
    opacity: 1;
    transition: opacity 300ms;
  }
}
</style>

<style lang="scss">
.object {
  display: block;
  position: relative;

  &--fill {
    overflow: hidden;
  }

  &--fill,
  &__fit {
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &--center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &--fixed {
    position: fixed;
  }

  &__fit {
    &--cover {
      object-fit: cover;
      font-family: 'object-fit: cover';
    }

    &--contain {
      object-fit: contain;
      font-family: 'object-fit: contain';
    }
  }
}
</style>
