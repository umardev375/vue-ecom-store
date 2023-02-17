<template>
  <div :class="[$style.el, { 'h-100 d-flex pb-0 bg-white': !image }]">
    <div v-if="image" class="imag__holder">
      <ImageObject :image="image" fill />
      <span
        :class="[$style.expand, 'shadow-lg']"
        @click="showLightBox(image.id)"
      >
        <ExpandArrowsIcon :class="$style.expandSvg" />
      </span>
      <client-only>
        <vue-easy-lightbox
          :class="$style.imageBox"
          esc-disabled
          move-disabled
          :visible="visible"
          :imgs="imagesList"
          :index="imageIndex"
          @hide="showLightBox"
        >
          <template #prev-btn="{ prev }">
            <button :class="$style.prevIcon" @click="prev">
              <ArrowIcon />
            </button>
          </template>
          <template #toolbar>
            <div :class="$style.galleryWrapper">
              <div :class="$style.gallery">
                <ProductGallery
                  v-if="image"
                  :thumbnails="thumbnails"
                  @select-thumbnail="selectThumbnail"
                />
              </div>
            </div>
          </template>
          <template #next-btn="{ next }">
            <button :class="$style.nextIcon" @click="next">
              <ArrowIcon />
            </button>
          </template>
        </vue-easy-lightbox>
      </client-only>
    </div>
    <div
      v-else
      class="d-flex justify-content-center align-items-center h-100 w-100"
    >
      <NoCameraIcon :class="$style.noimg" />
    </div>
  </div>
</template>

<script>
import ImageObject from '@/components/ImageObject'
import ExpandArrowsIcon from '@/icons/ExpandArrowsIcon'
import NoCameraIcon from '@/icons/NoCameraIcon'
import ArrowIcon from '@/icons/ArrowIcon'
import ProductGallery from '@/components/Product/Single/ProductGallery'

export default {
  name: 'ProductImage',
  components: {
    ArrowIcon,
    NoCameraIcon,
    ExpandArrowsIcon,
    ImageObject,
    ProductGallery
  },
  props: {
    image: {
      type: Object,
      default: () => {}
    },
    thumbnails: {
      type: [Array, Object],
      default: () => {}
    },
    images: {
      type: [Array, Object],
      default: () => {}
    }
  },
  data() {
    return {
      visible: false,
      index: 0, // default,
      imageIndex: 1
    }
  },
  computed: {
    lightboxImage() {
      return this.image?.originalUrl
    },
    imagesList() {
      return Object.keys(this.images).map((key) => {
        return this.images[key]?.originalUrl
      })
    }
  },
  methods: {
    showLightBox(id) {
      this.visible = !this.visible
      this.imageIndex = this.thumbnails.findIndex((thumbs) => thumbs.id === id)
    },
    selectThumbnail(thumbNailIndex) {
      this.activeThumbnailIndex = thumbNailIndex
      this.imageIndex = thumbNailIndex
    }
  }
}
</script>

<style lang="scss" module>
.el {
  background-color: $gray-100;
  padding-bottom: 100%;
  position: relative;

  &:hover {
    .expand {
      opacity: 1;
    }
  }
}

.expand {
  position: absolute;
  opacity: 0;
  right: rem-calc(22px);
  top: rem-calc(22px);
  transition: color 150ms ease-in-out, background-color 150ms ease-in-out,
    opacity 150ms ease-in-out;
  cursor: pointer;
  background: white;
  padding: 20px;
  border-radius: 100%;
  &:hover {
    color: white;
    background: #31d260;
  }

  &__svg {
    fill: currentColor;
    height: rem-calc(20px);
    width: rem-calc(20px);
  }
}
.noimg {
  height: rem-calc(80px);
  width: rem-calc(80px);
  fill: #dddddd;
}

.imageBox {
  & > div:first-child {
    background: white;
    margin: auto;
    border-radius: 10px;
    & > img {
      box-shadow: none !important;
      border-radius: 10px;
      margin: 60px !important;
      max-width: 70vh !important;
      max-height: 40vh !important;
    }
  }
}

.nextIcon {
  width: 40px;
  background: rgba(0, 0, 0, 0.1);
  padding: 10px;
  fill: white;
  box-shadow: none;
  outline: none;
  border: none;
  border-radius: 0;
  transform: rotate(90deg);
  position: absolute;
  right: 20%;
  top: 50%;
}

.prevIcon {
  width: 40px;
  background: rgba(0, 0, 0, 0.1);
  padding: 10px;
  fill: white;
  box-shadow: none;
  outline: none;
  border: none;
  border-radius: 0;
  transform: rotate(270deg);
  position: absolute;
  left: 20%;
  top: 50%;
}

.galleryWrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  top: 100px;
  background: transparent;
}

.gallery {
  width: wrap-calc(474px);
  position: absolute;
  bottom: 40px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  & div {
    & div {
      & div {
        background: white;
        padding: 10px;
        border-radius: 10px;
      }
    }
  }
  @include media-breakpoint-down(md) {
    margin-bottom: rem-calc(70px);
    width: 100%;
  }
}
</style>
