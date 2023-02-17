<template>
  <div :class="$style.items">
    <div v-for="(item, index) in items" :key="index" :class="$style.item">
      <component :is="item.icon" :class="$style.icon" />
      {{ item.title }}
    </div>
  </div>
</template>

<script>
import ArrowsCircleIcon from '@/icons/ArrowsCircleIcon'
import CommentIcon from '@/icons/CommentIcon'
import HeartOutlineIcon from '@/icons/HeartOutlineIcon'
import ShareIcon from '@/icons/ShareIcon'

export default {
  name: 'ProductSocialSharingDesign',
  components: {
    CommentIcon,
    ArrowsCircleIcon,
    ShareIcon,
    HeartOutlineIcon
  },
  data() {
    return {
      items: [
        {
          icon: 'HeartOutlineIcon',
          title: 'Add to wishlist'
        },
        {
          icon: 'ShareIcon',
          title: 'Share'
        },
        {
          icon: 'ArrowsCircleIcon',
          title: 'Compare'
        },
        {
          icon: 'CommentIcon',
          title: 'Ask About'
        }
      ]
    }
  }
}
</script>

<style lang="scss" module>
.items {
  display: flex;
  flex-wrap: wrap;
  margin: rem-calc(0 -12px -12px);
}

.item {
  @include font-size(11px);
  align-items: center;
  display: flex;
  line-height: 1.2;
  margin: rem-calc(0 12px 12px);
  text-transform: uppercase;
}

.icon {
  fill: currentColor;
  height: rem-calc(20px);
  margin-right: rem-calc(6px);
  width: rem-calc(20px);
}
</style>
