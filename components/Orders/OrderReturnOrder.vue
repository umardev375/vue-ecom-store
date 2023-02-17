<template>
  <div v-if="returnOrder.status === 'OPEN'" class="return mb-3">
    <div class="form-group">
      <label for="product" class="form-label"
        >Bitte wählen Sie ein Produkt für Ihre Rücksendung aus:</label
      >
      <select
        id="product"
        v-model="selectedProduct"
        class="custom-select"
        @change="setAmount"
      >
        <option disabled value="select">
          Bitte wählen Sie ein Produkt aus
        </option>
        <option
          v-for="orderProduct in orderProducts"
          :key="orderProduct.id"
          :value="orderProduct.id"
        >
          {{ orderProduct.product.title }}
        </option>
      </select>
    </div>
    <div v-if="selectedProductDetails" class="return__product">
      <div class="form-inline">
        <label for="amount" class="mr-2">Anzahl</label>
        <select id="amount" v-model="returnAmount" class="custom-select mr-2">
          <option v-for="i in selectedProductDetails.amount" :key="i">
            {{ i }}
          </option>
        </select>

        <TheButton @click="addToReturnOrder"
          >Für Rücksendung bereit Stellen</TheButton
        >
      </div>
    </div>
  </div>
  <div v-else-if="returnOrder.status === 'CANCELLED'">
    {{ returnOrder.status }}
  </div>
</template>

<script>
import TheButton from '@/components/Forms/TheButton'
export default {
  name: 'OrderReturnOrder',
  components: { TheButton },
  props: {
    returnOrder: {
      type: Object,
      required: true
    },
    orderProducts: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      selectedProduct: 'select',
      returnProduct: [],
      returnAmount: 0
    }
  },

  computed: {
    /* selectedProductDetails() {
      return this.orderProducts.find((prod) => prod.id === this.selectedProduct)
    }, */

    selectedProductDetails() {
      return this.orderProducts.find((prod) => prod.id === this.selectedProduct)
    },

    returnOrderProducs() {
      return this.returnOrder.orderProducs
    },
    isOpen() {
      return this.returnOrder.editableStatus === 'OPEN'
    }
  },
  methods: {
    setAmount() {
      this.returnAmount = this.selectedProductDetails.amount
    },
    async addToReturnOrder() {
      const { data: result } = await this.$axios.$post(
        'orders/returns/products',
        {
          returnOrderId: this.returnOrder.id,
          productId: this.selectedProductDetails.product.id,
          amount: this.returnAmount
        }
      )

      console.log(result)
    }
  }
}
</script>

<style lang="scss" scoped></style>
