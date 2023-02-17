<template>
  <div :class="['d-flex flex-wrap', $style.socials]">
    <a
      v-for="(item, index) in items"
      :key="index"
      :class="$style.social"
      :href="item.to"
      target="_blank"
    >
      <component :is="item.icon" :class="$style.svg" />
    </a>
  </div>
</template>

<script>
import FacebookIcon from '@/icons/FacebookIcon'
import RssIcon from '@/icons/RssIcon'
import TwitterIcon from '@/icons/TwitterIcon'

export default {
  name: 'FooterSocials',
  components: {
    TwitterIcon,
    RssIcon,
    FacebookIcon
  },
  data() {
    return {
      items: [
        {
          icon: 'FacebookIcon',
          to: '#'
        },
        {
          icon: 'TwitterIcon',
          to: '#'
        },
        {
          icon: 'RssIcon',
          to: '#'
        }
      ]
    }
  }
}
</script>

<style lang="scss" module>
.socials {
  margin: rem-calc(-5px -10px);
}

.social {
  background: $white;
  border-radius: 50%;
  color: var(--theme-primary-color);
  height: rem-calc(32px);
  line-height: rem-calc(32px);
  margin: rem-calc(5px 10px);
  text-align: center;
  transition: $transition-color;
  width: rem-calc(32px);

  &:hover {
    color: var(--theme-primary-color-shade);
  }
}

.svg {
  fill: currentColor;
  height: rem-calc(12px);
  width: rem-calc(13px);
}
</style>
