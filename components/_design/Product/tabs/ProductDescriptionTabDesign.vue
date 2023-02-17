<template>
  <div :class="$style.el">
    <p>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
      fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
      sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
      amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
      incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad
      minima veniam, quis nostrum exercitationem ullam corporis suscipit
      laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
      iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae
      consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur
    </p>
    <img :src="require('@/assets/images/product-desc.jpg')" alt="" />
  </div>
</template>

<script>
export default {
  name: 'ProductDescriptionTabDesign'
}
</script>

<style lang="scss" module>
.el {
  p {
    @include font-size(13px);
    line-height: (25 / 13);
    color: $gray-700;
    margin-bottom: rem-calc(24px);

    &:last-child {
      margin-bottom: 0;
    }
  }

  img {
    display: block;
    margin-bottom: rem-calc(24px);
    width: 100%;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
