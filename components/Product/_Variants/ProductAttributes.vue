<template>
  <div>
    <h4 :class="$style.title">{{ attribute.title }}</h4>
    <slot></slot>

    <div :class="$style.items">
      <template v-for="attrVal in attribute.values">
        <div
          v-if="possibleAttributes.includes(attrVal.id)"
          :id="attrVal.id"
          :key="attrVal.id"
          :title="attrVal.id"
          :class="[
            $style.item,
            {
              [$style.itemDisabled]: disabledValues.includes(attrVal.id)
            },
            { [$style.itemActive]: value.valueId === attrVal.id }
          ]"
          @click="setAttribute(attrVal)"
        >
          <div :class="$style.itemInner">
            {{ attrVal.title }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// Todo: Get and default variant when its possible whe not try to parese the current url
// Pass the ignored values in the childs and dont ignore its own possible values

export default {
  name: 'ProductAttributes',

  props: {
    selectedAttributesIds: {
      required: true,
      type: Array
    },
    attribute: {
      required: true,
      type: Object
    },
    possibleAttributes: {
      required: true,
      type: Array
    },

    value: {
      required: true,
      type: Object,
      default: () => ({})
    },
    allAttributes: {
      required: true,
      type: Array
    },
    variants: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      disabledValues: []
    }
  },
  computed: {
    allAttributeIds() {
      return this.allAttributes
        .map((attr) => {
          return attr.values.map((attrVal) => attrVal.id)
        })
        .flat(1)
    },

    variantPairs() {
      return this.variants
        .map((variant) => {
          return variant.attributeValues.map((attr) => {
            return attr.id
          })
        })
        .sort()
    }
  },

  methods: {
    setAttribute(attrValue) {
      const variantPairs = this.variantPairs

      const selectedVariant = attrValue.id
      this.disabledValues = []

      const possiblePairs = []
      for (const pair of variantPairs) {
        const possiblePair = pair.find((pPair) => {
          return pPair.includes(selectedVariant)
        })

        if (possiblePair) {
          //   console.log(pair)
          possiblePairs.push(pair)
        }
      }

      for (const attr of this.possibleAttributes) {
        if (possiblePairs.flat(2).includes(attr)) {
          console.log('includes')
        } else {
          console.log(attr)
          this.disabledValues.push(attr)
        }
      }

      this.$emit('input', {
        attribute: this.attribute.id, // Todo: not sure we need it
        valueId: attrValue.id
      })
    }
  }
}
</script>

<style lang="scss" module>
.items {
  display: flex;
  flex-wrap: wrap;
  margin: rem-calc(0 -4px);
}

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
    opacity: 0.1;
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
