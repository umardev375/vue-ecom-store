<template>
  <div class="productvariants">
    <div
      v-for="(attribute, index) in attributes"
      :key="attribute.id"
      :class="$style.attribute"
    >
      <h4 :class="$style.title">{{ attribute.title }}</h4>
      <div :class="$style.items">
        <div v-for="value in attribute.values" :key="value.id">
          <ProductAttributeValue
            v-if="possibleAttributeValues.includes(value.id)"
            :key="value.id"
            :selected="selected"
            :attribute-index="index"
            :variant-loading="variantLoading"
            :title="attribute.title"
            :disabled="disabled"
            :row="attributeTransformer(attribute.values)"
            :attribute-value="value"
            :value="value"
            @click="clickedValue"
          ></ProductAttributeValue>
        </div>
      </div>
    </div>
    <ValidationProvider
      ref="validator"
      :rules="{ required: true, min_value: attributes.length }"
    >
      <input v-model="minSelectValues" type="hidden" />
    </ValidationProvider>
  </div>
</template>

<script>
import ProductAttributeValue from '@/components/Product/Variants2/ProductAttributeValue'

import { ValidationProvider } from 'vee-validate'

import _xor from 'lodash-es/xor'
// import _difference from 'lodash-es/difference'
// import _isEqual from 'lodash-es/isEqual'
// import _pull from 'lodash-es/pull'

// Todo: presect first variant when its possible
export default {
  name: 'ProductVariantsList',

  components: { ProductAttributeValue, ValidationProvider },

  props: {
    attributes: {
      type: Array,
      required: true
    },

    variants: {
      required: true,
      type: Array
    },

    selectedVariantId: {
      type: String,
      required: false,
      default: null
    },
    variantLoading: {
      type: Boolean,
      required: true
    },
    loadFirstVariant: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      selected: {},
      disabled: [],
      skippAble: [],
      selectedRowsIndex: [],
      minSelected: 0
    }
  },

  computed: {
    allValuesSelected() {
      return this.selectedValues.length === this.attributes.length
    },

    selectedValues() {
      return Object.values(this.selected)
    },

    minSelectValues() {
      return this.selectedValues.length
    },

    possibleVariantsPairs() {
      return this.variants.map((variant) => {
        return variant.attributeValues.map((val) => val.id)
      })
    },

    possibleAttributeValues() {
      const uniqueAttributes = new Set(this.possibleVariantsPairs.flat(2))
      return [...uniqueAttributes] // Make array
    },

    variantsMap() {
      return this.variants.map((variant, index) => {
        return {
          // attributeTitle: this.attributes[index].title,
          id: variant.id,
          title: variant.title,
          attributesValues: variant.attributeValues.map((attribute) => {
            return attribute.id
          })
        }
      })
    }
  },
  created() {
    //   if (!this.loadFirstVariant) return

    if (this.selectedVariantId) {
      const selectedVariantObj = this.variants.find(
        (vari) => vari.id === this.selectedVariantId
      )

      const selectedAttributes = selectedVariantObj.attributeValues

      // Todo: find out which attribute is the first
      for (const selectedAttribute of selectedAttributes) {
        for (const attribute of this.attributes) {
          if (selectedAttribute.attribute === attribute.id) {
            this.$set(this.selected, attribute.title, selectedAttribute.id)
          }
        }
      }
    }
  },
  methods: {
    attributeTransformer(attributeValues) {
      return attributeValues.map((value) => {
        return value.id
      })
    },

    async clickedValue({ title, id, row, attrIndex }) {
      await this.$refs.validator.validate()

      this.$set(this.selected, title, id)
      if (this.allValuesSelected) {
        for (const variant of this.variantsMap) {
          const xor = _xor(this.selectedValues, variant.attributesValues)

          if (xor.length === 0) {
            this.$emit('change-product', variant.id)
            return
          }
        }
      } else {
        //* console.log(this.selected)*/
        // this.selected[title] = id
      }
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
.title {
  @include font-size(12px);
  line-height: (23 / 12);
  margin-bottom: rem-calc(10px);
}
</style>
