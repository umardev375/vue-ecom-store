<template>
  <div class="container">
    <h2>Dev only</h2>
    <form class="form-inline">
      <input
        v-model="shopId"
        class="form-control mr-sm-2"
        type="text"
        placeholder="shopId"
      />

      <button type="button" class="btn btn-primary" @click="setShop">
        Set
      </button>
    </form>
    <div v-if="shopNotFound" class="invalid-feedback">Shop existiert nicht</div>
  </div>
</template>

<script>
export default {
  name: 'Develop',
  data() {
    return {
      shopNotFound: false,
      shopId:
        this.$storage.getUniversal('shopId') ||
        'ef2a02b0-1390-11eb-95ea-07dc478ee986'
    }
  },
  methods: {
    async setShop() {
      try {
        this.shopNotFound = false
        // const { shop: data } = await this.$axios.$get(`/shops/${this.shopId}`)
        await this.$axios.$get(`/shops/${this.shopId}`)

        this.$storage.setUniversal('shopId', this.shopId)
        document.location.href = '/'
      } catch (e) {
        console.log(e)
        this.shopNotFound = true
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
