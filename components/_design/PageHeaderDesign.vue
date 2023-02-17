<template>
  <header :class="$style.header">
    <TheContainer>
      <slot>
        <component :is="titleTag" :class="$style.title">{{ title }} </component>
      </slot>
    </TheContainer>
  </header>
</template>

<script>
import TheContainer from '@/components/TheContainer'

export default {
  name: 'PageHeaderDesign',
  components: { TheContainer },
  props: {
    titleTag: {
      type: String,
      default: 'h1'
    },
    title: {
      type: String,
      default: ''
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

.title {
  @include font-size(40px);
  line-height: 1.2;
  margin: 0;
}
</style>
