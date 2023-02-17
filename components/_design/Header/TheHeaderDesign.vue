<template>
  <header :class="$style.header">
    <TheContainer>
      <div class="row justify-content-between flex-nowrap">
        <div class="col-auto">
          <nuxt-link :class="$style.logo" :to="localePath({ name: 'index' })">
            Your Logo
          </nuxt-link>
        </div>
        <div class="col-auto d-none d-md-block">
          <TheNavDesign :class="$style.nav" />
        </div>
        <div class="col-auto d-flex">
          <div :class="$style.buttons">
            <AccountDropdownDesign />
            <button :class="$style.button" type="button">
              <SearchIcon2 :class="$style.buttonSvg" />
            </button>
            <button :class="$style.button" type="button">
              <ShoppingCartIcon :class="$style.buttonSvg" />
            </button>
          </div>
          <button
            :class="$style.toggleBtn"
            type="button"
            @click="$store.dispatch('modal/open', 'NavPanel')"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </TheContainer>
  </header>
</template>

<script>
import AccountDropdownDesign from '@/components/_design/AccountDropdownDesign'
import TheNavDesign from '@/components/_design/Nav/TheNavDesign'
import TheContainer from '@/components/TheContainer'
import MenuIcon from '@/icons/MenuIcon'
import SearchIcon2 from '@/icons/SearchIcon2'
import ShoppingCartIcon from '@/icons/ShoppingCartIcon'

export default {
  name: 'TheHeaderDesign',
  components: {
    AccountDropdownDesign,
    MenuIcon,
    TheNavDesign,
    ShoppingCartIcon,
    SearchIcon2,
    TheContainer
  }
}
</script>

<style lang="scss" module>
.header {
  position: relative;
  z-index: z('header');
}

.logo {
  display: inline-block;
  font-size: rem-calc(18px);
  font-weight: 700;
  line-height: 1.2;
  margin: rem-calc(28px 0);
}

.nav {
  display: flex;
  margin: rem-calc(0 -18px);
  padding: rem-calc(31px 0);

  li {
    margin: rem-calc(0 18px);
  }
}

.buttons {
  display: flex;
}

.button {
  background: transparent;
  border: 0;
  margin: $account-dropdown-btn-my 0;
  padding: $account-dropdown-btn-p;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: $gray-400;
  }

  &__svg {
    fill: currentColor;
    height: rem-calc(20px);
    width: rem-calc(20px);
  }

  &:focus {
    outline: 0;
  }
}

.toggleBtn {
  background: transparent;
  border: 0;
  display: none;
  padding: rem-calc(9px);
  margin: rem-calc(19px 0);
  position: relative;

  &:focus {
    outline: 0;
  }

  @include media-breakpoint-down(sm) {
    display: block;
  }

  svg {
    display: block;
    fill: currentColor;
    height: rem-calc(20px);
    width: rem-calc(20px);
  }
}
</style>
