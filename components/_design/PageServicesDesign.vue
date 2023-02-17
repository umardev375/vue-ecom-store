<template>
  <div :class="$style.el">
    <TheContainer>
      <div class="row mb-n3">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="col-12 col-sm-6 col-md-3 mb-3"
        >
          <div :class="$style.item">
            <component :is="item.icon" :class="$style.itemSvg" />
            {{ item.text }}
          </div>
        </div>
      </div>
    </TheContainer>
  </div>
</template>

<script>
import TheContainer from '@/components/TheContainer'
import CreditCardIcon from '@/icons/CreditCardIcon'
import FreeReturnIcon from '@/icons/FreeReturnIcon'
import GlobePlaneIcon from '@/icons/GlobePlaneIcon'
import ShieldIcon from '@/icons/ShieldIcon'

export default {
  name: 'PageServicesDesign',
  components: {
    TheContainer,
    CreditCardIcon,
    ShieldIcon,
    FreeReturnIcon,
    GlobePlaneIcon
  },
  data() {
    return {
      items: [
        {
          icon: 'GlobePlaneIcon',
          text: 'Free shipping worldwide for purchases over $500'
        },
        {
          icon: 'FreeReturnIcon',
          text: 'Free returns worldwide 30 days after purchase'
        },
        {
          icon: 'ShieldIcon',
          text: '24 month warranty on all our products'
        },
        {
          icon: 'CreditCardIcon',
          text: '100% safe and secure checkout'
        }
      ]
    }
  }
}
</script>

<style lang="scss" module>
.el {
  background-color: $gray-100;
  border-bottom: 1px solid $gray-200;
  padding: rem-calc(30px 0);
}

/*
.items {
  display: flex;
  flex-wrap: wrap;
  margin: rem-calc(0 -20px);
}
*/

.item {
  @include font-size(11px);
  align-items: center;
  color: $gray-600;
  display: flex;
  line-height: (17 / 11);
  /*padding: rem-calc(0 20px);*/
  text-transform: uppercase;
  /*width: 25%;*/

  &__svg {
    fill: #818181;
    flex-shrink: 0;
    height: rem-calc(30px);
    margin-right: rem-calc(24px);
    width: rem-calc(30px);
  }
}
</style>
