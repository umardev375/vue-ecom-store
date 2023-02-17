<template>
  <div
    :id="val.id"
    :title="val.id"
    :class="[
      $style.item,
      {
        [$style.itemDisabled]: isDisabled.includes(val.id)
      },
      { [$style.itemActive]: value === val.id }
    ]"
    @click="setAttribute(val.id)"
  >
    <div :class="$style.itemInner">
      {{ val.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductAttributeValue',
  props: {
    ownValues: {
      type: Array,
      required: true
    },
    disabledFields: {
      type: Array,
      default: () => []
    },
    val: {
      type: Object,
      required: true
    },

    value: {
      type: String,
      required: true
    }
  },

  computed: {
    ownIds() {
      return this.ownValues.map((val) => val.id)
    },
    isDisabled() {
      //   if (this.ownIds.includes(this.val.id)) return false
      // if(this.ownIds.includes)
      const realDisabled = []
      for (const disabledField of this.disabledFields) {
        const isOwn =
          this.ownIds.includes(this.value) && this.ownIds.includes(this.val.id)
        if (!isOwn) {
          realDisabled.push(disabledField)
        }
      }
      return realDisabled

      /* return this.ownIds.filter((ownId) => {
        return this.disabledFields.includes(ownId)
      }) */
    }
  },
  methods: {
    setAttribute(attr) {
      this.$emit('input', attr.id)
    }
  }
}
</script>

<style lang="scss" module>
.item {
  @include font-size(12px);
  border-radius: rem-calc(4px);
  font-weight: 700;
  color: $gray-600;
  line-height: 1.2;
  margin: rem-calc(0 4px);
  overflow: hidden;
  position: relative;

  &__inner {
    border-radius: rem-calc(4px);
    border: 1px solid #e3e3e3;
    height: 100%;
    padding: rem-calc(9px 16px);
    width: 100%;
  }

  &--disabled {
    pointer-events: none;
    opacity: 0.3;
  }

  &::after {
    border-radius: rem-calc(4px);
    border: 2px solid $black;
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
