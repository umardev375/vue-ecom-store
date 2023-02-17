<template>
  <header :class="$style.header">
    <TheContainer class="d-flex align-items-center flex-nowrap" :lg="lg">
      <div v-if="$slots.icon" :class="$style.svg">
        <slot name="icon"></slot>
      </div>
      <slot>
        <component :is="titleTag" :class="$style.title">{{ title }} </component>
      </slot>
    </TheContainer>
  </header>
</template>

<script>
import TheContainer from '@/components/TheContainer'

export default {
  name: 'PageHeader',
  components: { TheContainer },
  props: {
    titleTag: {
      type: String,
      default: 'h1'
    },
    title: {
      type: String,
      default: ''
    },
    lg: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style lang="scss" module>
.header {
  background-color: $gray-100;
  border-bottom: 1px solid $gray-200;
  padding: rem-calc(22px 0);
}

.svg {
  fill: currentColor;
  height: rem-calc(40px);
  margin-right: rem-calc(20px);
  width: rem-calc(40px);
}

.title {
  @include font-size(40px);
  color: var(--theme-primary-color);
  line-height: 1.2;
  margin: 0;
}
</style>
