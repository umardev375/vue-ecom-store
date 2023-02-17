<template>
  <header class="header d-flex align-items-center">
    <nav class="nav container-fluid">
      <!-- HOLDS TOGGLER AND LOGO -->
      <div class="d-flex w-100 align-items-center">
        <div class="d-flex justify-content-between align-items-center">
          <button
            class="nav__toggler d-block d-md-none"
            @click="menuOpen = !menuOpen"
          >
            <MenuIcon class="w-15 h-15 mr-3" />
          </button>

          <NuxtLink
            class="nav__logo mr-md-3 mr-auto"
            :to="localePath({ name: 'index' })"
            >Demoshop</NuxtLink
          >
        </div>
        <!-- HOLD TOGGLER AND LOGO END -->
        <div
          class="nav__holder mr-auto"
          :class="{ 'nav__holder--open': menuOpen }"
        >
          <ul class="nav__list">
            <HeaderNavigationItem
              v-for="item in menuItems"
              :key="item.id"
              :active-child="activeMenu"
              :item="item"
              @close="menuOpen = false"
              @open:dropdown="setDropdown"
            />
          </ul>
          <div class="nav__divider"></div>
        </div>
        <div class="nav__iconbar ml-auto">
          <HeaderIconBar />
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import MenuIcon from '@/icons/MenuIcon'
import HeaderNavigationItem from '@/components/core/Header/HeaderNavigationItem'
import HeaderIconBar from '@/components/core/Header/HeaderIconBar'
export default {
  name: 'NavigationBase',
  components: { HeaderIconBar, MenuIcon, HeaderNavigationItem },
  data() {
    return {
      //  menuItems: [],
      dropdownOpen: false,
      menuOpen: false,
      activeMenu: ''
    }
  },
  async fetch() {
    /* const { data: menu } = await this.$axios.$get('shops/menus', {
      params: {
        load: ['children.value'],
        location: 'HEADERMENU',
        shopId: this.$shopId
      }
    }) */
    // this.menuItems = menu[0].children
  },
  computed: {
    menuItems() {
      return this.$store.state.menu.headerMenu.children
    }
  },
  methods: {
    setDropdown(dropdown) {
      this.activeMenu = dropdown
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: rgb(40, 57, 118);
  // padding: rem-calc(0 25px);
  height: rem-calc(70px);
}

.nav {
  &__toggler {
    background: none;
    // padding: 0;
    border: 0;
    color: white;
    svg {
      display: block;
      fill: currentColor;
      height: rem-calc(20px);
      width: rem-calc(20px);
    }
  }

  &__logo {
    font-size: rem-calc(20px);
    text-transform: uppercase;
    color: white;
    font-weight: 700;
  }

  &__list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    left: 0;

    @include media-breakpoint-up(md) {
      display: flex;
    }
  }

  &__divider {
    height: 0;
    margin: rem-calc(5px) 0;

    overflow: hidden;
    border-top: 1px solid rgba(#fff, 0.1);
    display: block;

    @include media-breakpoint-up(md) {
      display: none;
    }
  }
  &__holder {
    left: 0;
    height: 100%;
    background: rgb(40, 57, 118);
    position: fixed;
    width: rem-calc(270px);
    z-index: z('menu');
    top: 70px;
    padding: rem-calc(15px);

    transform: translateX(rem-calc(-270px));
    transition: transform ease-in 0.2s;
    &--open {
      transform: translateX(0);
    }
    @include media-breakpoint-up(md) {
      padding: 0;
      transform: translateX(0);
      height: inherit;
      position: static;
      width: 100%;
      background: none;
      margin-left: auto;
      display: flex;
    }
  }
  //Dropdown itself

  // Actual Dropdown
}
</style>
