<template>
  <ThemeProvider>
    <div class="shop">
      <CookieBanner id="acceptCookies"></CookieBanner>
      <div class="drawer-wrapper" :class="{ 'cart-open': isCartOpen }">
        <NavigationBase />

        <!-- <SiteHeader /> -->
        <NavPanel v-show="$store.getters['modal/is']('NavPanel')" />
        <main
          id="main"
          :class="{ 'drawer-open': isCartOpen }"
          @[closeEvent]="closeCart"
        >
          <Nuxt />
        </main>
        <SiteFooter />
      </div>
      <CartSidebar></CartSidebar>
      <ClientOnly>
        <ToastManager></ToastManager>
      </ClientOnly>
    </div>
  </ThemeProvider>
</template>
<script>
import CartSidebar from '@/components/Cart/CartDrawer'
import ToastManager from '@/components/Toasts/ToastManager'
import NavPanel from '@/components/modal/NavPanel'
import ThemeProvider from '@/components/ThemeProvider'
import SiteFooter from '@/components/core/Footer/SiteFooter'
import CookieBanner from '@/components/CTABanner'
import NavigationBase from '@/components/core/Header/HeaderNavigationBase'
export default {
  name: 'DefaultLayout',

  components: {
    NavigationBase,

    CookieBanner,
    SiteFooter,
    ThemeProvider,
    ToastManager,
    CartSidebar,

    NavPanel
  },
  beforeRouteLeave() {
    console.log('leave')
    this.$store.commit('cart/TOGGLE_CART', false)
  },

  head() {
    const seo = this.$nuxtI18nSeo()
    return {
      // ...this.$nuxtI18nSeo(),
      ...seo,
      htmlAttrs: {
        ...seo.htmlAttrs,
        class: this.isCartOpen ? 'drawer-open' : ''
      }
    }
  },
  computed: {
    closeEvent() {
      return this.isCartOpen ? 'click' : null
    },
    header() {
      return this.$store.state.shop.header
    },
    isCartOpen() {
      return this.$store.state.cart.open
    },
    footer() {
      return this.$store.state.shop.footer
    }
  },
  mounted() {},
  methods: {
    closeCart() {
      this.$store.commit('cart/TOGGLE_CART', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
#main {
  flex: 1 auto;
}
.drawer-wrapper {
  transition: transform ease-in 0.5s;
}
.drawer-wrapper.cart-open {
  // transform: translate3d(-$drawer-width, 0px, 0px);
  &::after {
  }
}

#main.drawer-open {
  z-index: z(drawer);
  cursor: pointer;
  &:after {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;

    z-index: z(drawer);
    width: 100%;
    animation: fadeIn 0.5s;
    // animation: overlay-on 0.5s forwards;
    background-color: rgba(0, 0, 0, 0.3);
    //opacity: 1;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
