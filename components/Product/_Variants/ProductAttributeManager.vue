<template>
  <div>
    <ProductAttributeFieldValues
      v-for="attr in attributes"
      :key="attr.id"
      v-model="selectedAttributes[attr.title]"
      :title="attr.title"
      :attribute-id="attr.id"
      :attributes="attributes"
      :variants="variants"
      :values="attr.values"
      :current-selected="selectedAttributes"
      :disabled-fields="disabledFields"
      @input="checkVariants"
    />
  </div>
</template>

<script>
import ProductAttributeFieldValues from '@/components/Product/_Variants/ProductAttributeFieldValues'
export default {
  name: 'ProductAttributeManager',
  components: { ProductAttributeFieldValues },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      disabledFields: [],
      selectedAttributes: {}
    }
  },

  computed: {
    variants() {
      return this.product.variants
    },
    variantPairs() {
      return this.variants.map((variant) => {
        return variant.attributeValues.map((attr) => {
          return attr.id
        })
      })
    },
    attributes() {
      return this.product.attributes
    }
  },

  methods: {
    /**
     *
     * Here i want to make a list with values which cant be selected
     * the problem is when i mark M on the Multiple Variables product it also will disable L because "L and M" is not a valid attribute pair
     * maybe it need also a check in ProductAttributeFieldValues
     * Cases:
     * 1. Select Blue disable M
     * 2. If m is already selected and you select blue deselect m and disable it
     * */
    checkVariants(attrValueId) {
      const selectedAttributes = Object.values(this.selectedAttributes) // Maybe i can use this and check something i have no idea...
      const attributesLength = this.attributes.length

      const allAttributesFilled = selectedAttributes.length === attributesLength

      console.log(allAttributesFilled)

      for (const pair of this.variantPairs) {
        if (pair.includes(attrValueId)) {
          console.log('Possible Pair found', pair)
        } else {
          console.log('Not possible combination', pair)
        }
      }

      /* this.disabledFields = []
      const selectedValue = attrValueId

      const possiblePairs = []

      for (const pair of this.variantPairs) {
        const possiblePair = pair.find((pPair) => {
          return pPair.includes(selectedValue)
        })
        if (possiblePair) {
          possiblePairs.push(pair)
        }
      }

      const flattenPairs = possiblePairs.flat(2)

      for (const attr of this.possibleAttributes) {
        if (!flattenPairs.includes(attr)) {
          this.disabledFields.push(attr)
        }
      } */

      // Here i want to emit and event so i can fetch the variable product
    }
  }
}
</script>

<style lang="scss" scoped></style>
