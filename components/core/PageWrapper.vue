<template>
  <div class="shop-wrapper">
    <slot v-if="$slots.head" name="head" />
    <template v-else>
      <PageHeader v-if="title" :title="title" />
    </template>
    <BreadCrumbs />
    <TheContainer :class="$style.content">
      <div :class="['row', { 'flex-row-reverse': reverse }]">
        <div v-if="$slots.aside" :class="[$style.sidebar, 'col-lg-auto col']">
          <slot name="aside"></slot>
        </div>
        <div :class="!$slots.aside ? 'col-md-12' : 'col-md-8'">
          <slot v-if="!loading"></slot>
          <Spinner v-else />
        </div>
      </div>
    </TheContainer>
  </div>
</template>

<script>
import TheContainer from '@/components/TheContainer'
import PageHeader from '@/components/Common/PageHeader'
import Spinner from '@/components/Common/Spinner'
import BreadCrumbs from '@/components/Common/BreadCrumbs'

export default {
  name: 'PageWrapper',

  components: {
    BreadCrumbs,
    Spinner,
    PageHeader,
    TheContainer
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    reverse: {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" module>
.content {
  padding-bottom: rem-calc(66px);
  padding-top: rem-calc(66px);
}

.sidebar {
  width: rem-calc(248px) !important;

  @include media-breakpoint-down(md) {
    margin-bottom: $grid-gutter-width;
  }
}

.col {
  @include media-breakpoint-down(xxs) {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
