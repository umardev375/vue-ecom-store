<template>
  <PageWrapper :title="error.message">
    <!-- Todo: Style just open the url localhost:3008/xxxx -->

    <NuxtLink class="btn btn-dark" :to="localePath({ name: 'shop' })"
      >Zurück zum Shop</NuxtLink
    >
  </PageWrapper>
</template>

<script>
import PageWrapper from '@/components/core/PageWrapper'
export default {
  name: 'NuxtError',
  components: { PageWrapper },
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
