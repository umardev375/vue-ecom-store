<template>
  <component :is="tag" :class="sectionClass">
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div'
    },

    section: {
      required: true,
      type: String,
      validator: (section) => {
        const sections = ['header', 'footer', 'content']
        return sections.includes(section)
      }
    }
  },

  computed: {
    sectionClass() {
      if (!this.$isInFrame) return ''

      return ['section', { 'section--active': this.isActive }]
    },
    isActive() {
      return this.$store.state.editor.currentSection === this.section
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  &--active {
    //border: 1px solid red;
  }
}
</style>
