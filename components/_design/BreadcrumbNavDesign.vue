<template>
  <nav :class="$style.nav">
    <TheContainer>
      <div class="row justify-content-between mb-n1">
        <div class="col-auto mb-1">
          <BreadcrumbDesign />
        </div>
        <div class="col-auto mb-1">
          <nuxt-link :to="localePath({ name: 'index' })" :class="$style.back">
            Back to watches
            <LevelUpIcon :class="$style.backSvg" />
          </nuxt-link>
        </div>
      </div>
    </TheContainer>
  </nav>
</template>

<script>
import BreadcrumbDesign from '@/components/_design/BreadcrumbDesign'
import TheContainer from '@/components/TheContainer'
import LevelUpIcon from '@/icons/LevelUpIcon'

export default {
  name: 'BreadcrumbNavDesign',
  components: {
    LevelUpIcon,
    BreadcrumbDesign,
    TheContainer
  }
}
</script>

<style lang="scss" module>
.nav {
  border-bottom: 1px solid rgba(#dedede, 0.63);
  padding: rem-calc(11px 0);
}

.back {
  @include font-size(11px);
  display: inline-flex;
  align-items: center;
  line-height: 1.2;

  &__svg {
    fill: $gray-400;
    height: rem-calc(14px);
    margin-left: rem-calc(16px);
    width: rem-calc(16px);
  }
}
</style>
