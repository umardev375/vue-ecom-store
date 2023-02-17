<template>
  <button
    :id="value.id"
    type="button"
    tabindex="0"
    :title="value.id"
    :class="[
      $style.item,
      {
        [$style.itemDisabled]: isDisabled
      },
      { [$style.itemActive]: isSelected },
      { loading: variantLoading && isSelected }
    ]"
    @click="setAttribute(value)"
  >
    {{ value.title }}
  </button>
</template>

<script>
export default {
  name: 'ProductAttributeValue',

  props: {
    value: {
      type: Object,
      required: true
    },

    attributeIndex: {
      required: true,
      type: Number
    },

    variantLoading: {
      required: true,
      type: Boolean
    },

    title: {
      required: true,
      type: String
    },

    row: {
      type: Array,
      required: true
    },

    attributeValue: {
      type: Object,
      required: true
    },

    selected: {
      type: Object,
      default: () => ({})
    },

    disabled: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    /**
     * Dont disable Values which passed by this.row
     */
    isSelected() {
      return this.selected[this.title] === this.value.id
    },

    isDisabled() {
      return this.disabled.includes(this.value.id)
    }
  },
  mounted() {
    // his.$emit('click', this.value.id)
  },
  methods: {
    setAttribute(value) {
      if (this.isDisabled || this.isSelected) return

      this.$emit('click', {
        title: this.title,
        id: value.id,
        attrIndex: this.attributeIndex,
        row: this.row
      })
    }
  }
}
</script>

<style lang="scss" module>
.item {
  @include font-size(12px);
  border-radius: rem-calc(4px);
  font-weight: 700;
  color: var(--theme-primary-color);
  line-height: 1.2;
  margin: rem-calc(0 4px);
  overflow: hidden;
  position: relative;
  padding: rem-calc(9px 16px);

  background: white;
  border: 1px solid var(--theme-primary-color);
  &__inner {
    border-radius: rem-calc(4px);
    border: 1px solid var(--theme-primary-color);
    height: 100%;
    padding: rem-calc(9px 16px);
    width: 100%;
  }

  &--disabled {
    pointer-events: none;
    opacity: 0.3;
  }
  &:focus {
    outline: none;
    background: whitesmoke;
  }
  &::after {
    border-radius: rem-calc(4px);
    border: 2px solid var(--theme-primary-color);
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: scale(1.3);
    transition: transform 200ms ease-out;
    width: 100%;
  }
  &--active::after {
    transform: scale(1);
  }
}
</style>
