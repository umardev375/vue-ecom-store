<template>
  <div>
    <PageHeader :title="title">
      <slot slot="icon" name="headerIcon"></slot>
    </PageHeader>

    <TheContainer :class="$style.container">
      <div :class="$style.content">
        <template v-if="!emptyCart">
          <slot></slot>
          <slot name="afterContent"></slot>
        </template>
        <template v-else>
          <p :class="$style.help">{{ emptyCartText }}</p>
          <NuxtLink class="btn btn-dark" :to="localePath({ name: 'shop' })"
            >{{ $t('Zurück zum Shop') }}
          </NuxtLink>
        </template>
      </div>
      <div v-if="!emptyCart" :class="$style.aside">
        <slot name="right"></slot>
      </div>
    </TheContainer>
  </div>
</template>

<script>
import TheContainer from '@/components/TheContainer'
import PageHeader from '~/components/Common/PageHeader'

export default {
  name: 'CheckoutWrapper',
  components: {
    TheContainer,
    PageHeader
  },
  props: {
    title: {
      type: String,
      required: true
    },
    showProductsInTotal: {
      type: Boolean,
      default: false
    },
    processToCheckout: {
      type: Boolean,
      default: false
    },

    emptyCartText: {
      required: false,
      type: String,
      default: ''
    }
  },
  computed: {
    emptyCart() {
      return !this.$store.getters['cart/items'].length > 0
    }
  }
}
</script>

<style lang="scss" module>
.container {
  display: flex;

  @include media-breakpoint-down(md) {
    flex-wrap: wrap;
  }
}
.content {
  flex-grow: 1;
  flex-shrink: 1;
  padding: rem-calc(68px 0);

  @include media-breakpoint-down(md) {
    width: 100%;
  }
}

.aside {
  flex-shrink: 0;
  margin: rem-calc(68px 0 68px 56px);
  width: rem-calc(360px);

  @include media-breakpoint-down(md) {
    order: -1;
    margin: rem-calc(68px 0 0);
    width: 100%;
  }
}

.help {
  font-size: rem-calc(15px);
  font-weight: 700;
  line-height: (23 / 15);
  margin-bottom: rem-calc(36px);
}
</style>
