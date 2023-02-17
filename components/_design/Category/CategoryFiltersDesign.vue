<template>
  <div :class="['row', $style.el]">
    <div class="col-3">
      <select class="form-control" name="">
        <option value="">Categories</option>
        <option value="">Category 1</option>
        <option value="">Category 2</option>
        <option value="">Category 3</option>
      </select>
    </div>
    <div class="col-3">
      <select class="form-control" name="">
        <option value="">Brands</option>
        <option value="">Brand 1</option>
        <option value="">Brand 2</option>
        <option value="">Brand 3</option>
      </select>
    </div>
    <div class="col-3">
      <select class="form-control" name="">
        <option value="">Price</option>
        <option value="">2$</option>
        <option value="">4$</option>
      </select>
    </div>
  </div>
</template>

<script>
// import CategorySelectFieldDesign from '@/components/_design/Category/CategorySelectFieldDesign'

export default {
  name: 'CategoryFiltersDesign',
  components: {
    // CategorySelectFieldDesign
  }
}
</script>

<style lang="scss" module>
.el {
  padding-bottom: 20px;
  padding-top: 20px;
}
</style>
