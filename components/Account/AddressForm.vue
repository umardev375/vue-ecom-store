<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit="handleSubmit(createOrUpdate)"></form>
  </ValidationObserver>
</template>

<script>
import FormMixin from '@/components/Forms/FormMixin'
import { ValidationObserver } from 'vee-validate'
export default {
  name: 'AddressForm',

  components: {
    ValidationObserver
  },

  mixins: [FormMixin],
  created() {
    if (this.item) {
      this.setFormData(this.item)
    }
  },
  methods: {
    createOrUpdate() {
      if (this.item) {
        // Update
      } else {
        // Create
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
