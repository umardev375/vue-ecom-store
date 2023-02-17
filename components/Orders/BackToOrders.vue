<template>
  <div class="div">
    <NuxtLink
      v-if="$auth.loggedIn"
      :to="localePath({ name: 'account-orders' })"
    >
      Zurück zu meinen Bestellungen</NuxtLink
    >
  </div>
</template>

<script>
export default {
  name: 'BackToOrders'
}
</script>

<style lang="scss" scoped></style>
