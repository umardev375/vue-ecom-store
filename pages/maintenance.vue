<template>
  <div class="d-flex justify-content-center align-items-center my-auto">
    <div class="wrapper">
      <h1>{{ $t('Wartungsmodus') }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaintenancePage',

  layout: 'maintenance'
}
</script>

<style lang="scss" module>
.btn-position {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
