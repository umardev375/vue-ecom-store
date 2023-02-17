<template>
  <div :class="$style.attribute">
    <h4 :class="$style.title">{{ title }}</h4>
    <div :class="$style.items">
      <!--   <ProductAttributeValue
        v-for="val in values"
        :key="val.id"
        v-model="value"
        :disabled-fields="disabledFields"
        :own-values="values"
        :val="val"
        @input="setAttribute(val)"
      ></ProductAttributeValue> -->

      <template v-for="val in values">
        <div
          v-if="possibleAttributes.includes(val.id)"
          :id="val.id"
          :key="val.id"
          :title="val.id"
          :class="[
            $style.item,
            {
              [$style.itemDisabled]: false
            },
            { [$style.itemActive]: value === val.id }
          ]"
          @click="setAttribute(val)"
        >
          <div :class="$style.itemInner">
            {{ val.title }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductAttributeFieldValues',

  props: {
    values: {
      type: Array,
      required: true
    },

    attributes: {
      required: true,
      type: Array
    },

    attributeId: {
      required: true,
      type: String
    },

    title: {
      required: true,
      type: String
    },

    variants: {
      required: true,
      type: Array
    },

    currentSelected: {
      required: true,
      type: Object
    },

    // Later on i need to create another computed which excludes the ids from the current attribute values
    disabledFields: {
      type: Array,
      required: true
    },

    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    /**
     * Filter attributes out which are not present right now
     * @returns {*[]}
     */
    possibleAttributes() {
      return (
        this.variants
          .map((prodVar) => {
            return prodVar.attributeValues
          })
          .flat(1)
          .map((attr) => {
            return attr.id
          })
          // Remove duplicates
          .filter(function (item, pos, self) {
            return self.indexOf(item) === pos
          })
      )
    }
  },

  methods: {
    setAttribute(attrValue) {
      this.$emit('input', attrValue.id)
    }
  }
}
</script>

<style lang="scss" module>
.attribute {
  margin-bottom: rem-calc(25px);
}

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
