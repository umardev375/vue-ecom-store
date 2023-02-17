<template>
  <div class="child-page-wrapper">
    <slot v-if="!loading"></slot>
    <Spinner v-else></Spinner>
  </div>
</template>

<script>
import Spinner from '@/components/Common/Spinner'
export default {
  name: 'LoadingWrapper',
  components: { Spinner },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
