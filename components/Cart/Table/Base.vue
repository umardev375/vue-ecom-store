<template>
  <div class="table-holder">
    <div class="table-responsive mb-2">
      <table :class="['table']">
        <thead>
          <tr>
            <th>Artikel</th>
            <th>Anzahl</th>
            <th>Stückpreis</th>
            <th>Summe</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <CartItemRow
            v-for="item in items"
            :key="item.id"
            :item="item"
          ></CartItemRow>
        </tbody>
      </table>
    </div>
    <!-- Todo: depends on global Settings -->
    <div class="d-flex justify-content-between align-items-center">
      <div class="help-feedback">
        * Alle Preise inkl. gesetzl. Mehrwertsteuer
      </div>

      <VolvButton class="btn-danger mb-2" sm button @click.native="clearCart">
        Warenkorb löschen
      </VolvButton>
    </div>
  </div>
</template>

<script>
import CartItemRow from '@/components/Cart/Table/ItemRow'
import VolvButton from '@/components/Forms/Button'

export default {
  name: 'CartTable',
  components: { VolvButton, CartItemRow },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    async clearCart() {
      await this.$store.dispatch('cart/cleanCart')
      await this.$store.dispatch('cart/getShipping')
    }
  }
}
</script>

<style lang="scss" module></style>
