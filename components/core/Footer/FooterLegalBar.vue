<template>
  <div class="container">
    <div class="row align-items-center justify-content-between">
      <div class="col-auto">
        <p :class="$style.copyright">
          powered by
          <a href="#" @click.prevent>VOLV </a>
        </p>
      </div>
      <div class="col-auto">
        <VolvButton :class="['btn-outline-primary', $style.btn]" icon>
          <ArrowIcon :class="$style.btnSvg" />
        </VolvButton>
      </div>
    </div>
  </div>
</template>

<script>
import VolvButton from '@/components/Forms/Button'
import ArrowIcon from '@/icons/ArrowIcon'

export default {
  name: 'FooterLegalBar',
  components: {
    ArrowIcon,
    VolvButton
  }
}
</script>

<style lang="scss" module>
.copyright {
  font-size: rem-calc(11px);
  line-height: 1.2;
  margin-bottom: 0;
  padding: rem-calc(14px 0);

  a:hover {
    color: inherit;
  }
}

.btn {
  border-color: rgba(#d8d8d8, 0.27);
  border-width: 1px;
  height: rem-calc(32px);
  width: rem-calc(32px);
}

.btnSvg {
  fill: currentColor;
  height: rem-calc(13px);
  width: rem-calc(13px);
}
</style>
