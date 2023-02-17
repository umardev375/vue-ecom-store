<template>
  <component :is="tag" :class="editClass" @[clickEvent]="blockClick">
    <span
      v-if="$isInFrame"
      :class="['widget__index', { 'widget__index--active': selectedWidget }]"
    >
      <template v-if="typeof index === 'string' || index instanceof String">
        {{ index }}
      </template>

      <template v-else>
        {{ index + 1 }}
      </template>
    </span>
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'BuilderBlock',

  props: {
    tag: {
      type: String,
      default: 'div'
    },
    index: {
      required: true,
      type: [Number, String]
    },

    section: {
      type: String,
      required: true
    },

    widgetId: {
      required: true,
      type: String
    }
  },

  data() {
    // is determined in the Editor.client.js plugin
    return {
      clickEvent: this.$isInFrame ? 'click' : null // We add this event only  when the page is loaded  in an iframe
    }
  },

  computed: {
    selectedWidget() {
      return this.widgetId === this.$store.state.editor.currentWidget
    },

    editClass() {
      if (!this.$isInFrame) return {}

      return [
        'widget',
        'widget--editMode',

        {
          'widget--active': this.selectedWidget
        }
      ]
    }
  },

  methods: {
    blockClick() {
      const payload = {
        widget: this.widgetId,
        section: this.section
      }

      this.$sendToParent({
        action: 'WIDGET_FOCUS',
        payload
      })

      this.$store.commit('editor/WIDGET_FOCUS', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
.widget {
  &--editMode {
    position: relative;
    border: 2px solid transparent;

    &:hover {
      border: 2px solid #31d260;
    }
  }

  &__index {
    background: #c9c8d8;
    color: white;
    position: absolute;

    ///  padding: 3px 4px;
    font-size: 12px;
    min-width: 30px;
    margin-left: -15px;
    z-index: 99;
    border-radius: 3px;
    display: flex;
    align-content: center;
    justify-content: center;
    top: 50%;
    transform: translateY(-50%);

    &--active {
      background: #31d260;
    }
  }

  &--active {
    border: 2px solid #31d260;
  }
}
</style>
