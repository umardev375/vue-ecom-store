<template>
  <div :class="$style.el">
    <div :class="$style.stars">
      <StarIcon :class="$style.star" />
      <StarIcon :class="$style.star" />
      <StarIcon :class="$style.star" />
      <StarIcon :class="$style.star" />
      <StarIcon :class="$style.star" />
    </div>
    <span v-if="reviews" :class="$style.reviews"> {{ reviews }} Reviews </span>
  </div>
</template>

<script>
import StarIcon from '@/icons/StarIcon'

export default {
  name: 'ProductRatings',
  components: { StarIcon },
  props: {
    reviews: {
      type: Number,
      default: null
    }
  }
}
</script>

<style lang="scss" module>
.el {
  @include font-size(11px);
  line-height: 1.2;
  text-transform: uppercase;
}

.stars {
  align-items: center;
  display: inline-flex;
  margin: 0 -2px;
}

.star {
  fill: #bfbfbf;
  height: 10px;
  margin: 0 2px;
  transition: fill 150ms ease-out;
  width: 10px;

  &:hover {
    fill: #575757;
  }
}

.reviews {
  padding-left: rem-calc(26px);
}
</style>
