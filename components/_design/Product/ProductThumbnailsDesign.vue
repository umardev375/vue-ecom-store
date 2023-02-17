<template>
  <div ref="swiper" :class="['swiper-container', $style.swiper]">
    <div class="swiper-wrapper">
      <div
        v-for="(thumbnail, thumbnailIndex) in thumbnails"
        :key="thumbnailIndex"
        :class="['swiper-slide', $style.slide]"
      >
        <div
          :class="[
            $style.thumbnail,
            { [$style.thumbnailActive]: activeThumbnail === thumbnailIndex }
          ]"
          @click="activeThumbnail = thumbnailIndex"
        >
          <div :class="$style.thumbnailImg">
            <ImageObject :image="{ src: thumbnail.image }" fill center />
            <div v-if="thumbnail.video" :class="$style.play">
              <PlayCircleIcon :class="$style.playSvg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayCircleIcon from '@/icons/PlayCircleIcon'
import { Swiper } from 'swiper'
import ImageObject from '@/components/ImageObject'

export default {
  name: 'ProductThumbnailsDesign',
  components: {
    PlayCircleIcon,
    ImageObject
  },
  data() {
    return {
      activeThumbnail: -1,
      thumbnails: [
        {
          image: require('@/assets/images/product.png')
        },
        {
          image: require('@/assets/images/product.png')
        },
        {
          image: require('@/assets/images/product.png')
        },
        {
          image: require('@/assets/images/product.png'),
          video: true
        }
      ]
    }
  },
  mounted() {
    this.swiper = new Swiper(this.$refs.swiper, {
      slidesPerView: 'auto'
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

<style lang="scss" module>
.swiper {
  margin: rem-calc(30px 0);
}

.slide {
  margin-right: rem-calc(30px);
  width: auto;

  &:last-child {
    margin-right: 0;
  }
}

.thumbnail {
  background-color: $white;
  height: rem-calc(96px);
  width: rem-calc(96px);
  position: relative;

  &::after {
    border: 2px solid $black;
    content: '';
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity 150ms ease-out, visibility 150ms ease-out;
    visibility: hidden;
    width: 100%;
  }

  &--active::after {
    opacity: 1;
    visibility: visible;
  }

  &__img {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: transform 150ms ease-out;
    width: 100%;
    height: 100%;

    .thumbnail--active & {
      transform: translate(-50%, -50%) scale(0.9);
    }
  }
}

.play {
  $svg-height: rem-calc(30px);
  $svg-width: rem-calc(30px);
  left: 50%;
  margin-left: -$svg-width / 2;
  margin-top: -$svg-height / 2;
  position: absolute;
  top: 50%;
  transition: transform 150ms ease-in-out;

  &__svg {
    fill: currentColor;
    height: $svg-height;
    width: $svg-width;
  }

  .thumbnail:hover & {
    transform: scale(1.1);
  }
}
</style>
