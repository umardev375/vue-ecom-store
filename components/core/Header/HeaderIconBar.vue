<template>
  <div :class="$style.buttons">
    <AccountDropdown
      v-if="$auth.loggedIn && !$auth.hasScope('ghost')"
      class="mr-3"
    />

    <TheButton
      v-else
      class="mr-3"
      title="Login"
      :class="$style.button"
      type="button"
      tag="NuxtLink"
      tabindex="0"
      :to="localePath({ name: 'login' })"
    >
      <!-- Todo: other login icon -->
      <UserIcon :class="$style.buttonSvg" />
    </TheButton>

    <TheButton
      class="mr-3"
      :class="$style.button"
      type="button"
      @click="toggleSearch"
    >
      <SearchIcon2 v-if="!searchIsOpen" :class="$style.buttonSvg" />
      <CloseIcon2 v-if="searchIsOpen" :class="$style.buttonSvg" />
    </TheButton>

    <CartBag :class="$style.button" />

    <TheButton
      v-if="$config.isDev && $auth.loggedIn"
      class="ml-3"
      title="Logout"
      :class="$style.button"
      type="button"
      tabindex="0"
      @click="logout"
    >
      <PowerOffIcon :class="$style.buttonSvg" :style="{ color: 'red' }" />
    </TheButton>
  </div>
</template>

<script>
import CartBag from '@/components/Cart/CartBag'
import TheButton from '@/components/Forms/TheButton'
import PowerOffIcon from '@/icons/PowerOffIcon'
import AccountDropdown from '@/components/core/Header/AccountDropdown'
import SearchIcon2 from '@/icons/SearchIcon2'
import CloseIcon2 from '@/icons/CloseIcon2'
import UserIcon from '@/icons/UserIcon'
export default {
  name: 'HeaderIconBar',
  components: {
    UserIcon,
    CloseIcon2,
    CartBag,
    TheButton,
    PowerOffIcon,
    AccountDropdown,
    SearchIcon2
  },
  computed: {
    searchIsOpen() {
      return this.$store.state.search.open
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
    toggleSearch() {
      const toggle = !this.searchIsOpen
      this.$store.commit('search/TOGGLE_SEARCH', toggle)
    }
  }
}
</script>

<style lang="scss" module>
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
    fill: white;
    height: rem-calc(20px);
    width: rem-calc(20px);
  }

  &:focus {
    outline: 0;
  }
}
</style>
