<template>
  <div class="box py-3 h-100 d-flex flex-column">
    <h2 class="box__title">{{ title }}</h2>

    <div v-if="$slots.intro" class="box__intro mb-3">
      <slot name="intro"></slot>
    </div>
    <div class="box__content mb-3">
      <slot v-if="!loading"></slot>
      <Spinner v-else />
    </div>
    <div v-if="$slots.footer" class="box__footer mt-auto">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Common/Spinner'
export default {
  name: 'AccountContentBox',
  components: { Spinner },
  props: {
    loading: {
      type: Boolean,
      default: false
    },

    title: {
      required: true,
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  // border: 1px solid #e3e3e3;

  &__title {
    color: var(--theme-primary-color);
  }
}
</style>
