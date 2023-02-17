<template>
  <div class="mb-4">
    <img class="img-fluid image" :src="data.image.value.originalUrl" />
  </div>
</template>

<script>
import widgetMixin from '@/components/Renderer/widgetMixin'

export default {
  name: 'Herobase',
  mixins: [widgetMixin]
}
</script>

<style scoped lang="scss">
.image {
  box-shadow: rgba(#283976, 0.4) 5px 5px, rgba(#283976, 0.3) 10px 10px,
    rgba(#283976, 0.2) 15px 15px, rgba(#283976, 0.1) 20px 20px,
    rgba(#283976, 0.05) 25px 25px;
}
</style>
