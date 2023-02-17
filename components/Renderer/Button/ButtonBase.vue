<template>
  <div>
    <MenuLink
      :style="button.style"
      class="slide__link d-inline-block"
      :link-type="button.type"
      :slug="button.slug"
      :label="button.label"
    />
  </div>
</template>

<script>
import widgetMixin from '@/components/Renderer/widgetMixin'
import MenuLink from '@/components/Menu/MenuLink'
export default {
  components: {
    MenuLink
  },
  mixins: [widgetMixin],
  computed: {
    button() {
      console.log(this.data.button)
      return this.data.button.value
    }
  }
}
</script>

<style scoped></style>
