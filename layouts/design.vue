<template>
  <div>
    <TheHeaderDesign />
    <Nuxt />
    <ModalBackdrop />
    <NavPanel v-show="$store.getters['modal/is']('NavPanel')" />
  </div>
</template>

<script>
import TheHeaderDesign from '@/components/_design/Header/TheHeaderDesign'
import ModalBackdrop from '@/components/modal/ModalBackdrop'
import NavPanel from '@/components/modal/NavPanel'

export default {
  components: { NavPanel, ModalBackdrop, TheHeaderDesign }
}
</script>

<style lang="scss" module></style>
