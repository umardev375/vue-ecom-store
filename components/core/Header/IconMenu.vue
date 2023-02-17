<template>
  <ul
    class="nav navbar-nav ml-auto w-100 justify-content-end align-items-center"
  >
    <!--  <li class="nav-item">
      <a class="nav-link" href="#">Icon</a>
    </li> -->

    <NuxtLink
      v-for="item in items"
      :key="item.title"
      v-slot="{ href, navigate, isActive, isExactActive }"
      :to="item.to"
    >
      <li
        class="nav-item"
        :class="[isActive && 'active', isExactActive && 'active']"
      >
        <a :href="href" class="nav-link" @click="navigate">
          <component
            :is="item.icon"
            :title="item.title"
            :class="$style.icon"
          ></component>
        </a>
      </li>
    </NuxtLink>
    <li class="nav-item">
      <CartBag />
    </li>
    <li class="nav-item">
      <button
        v-if="$auth.loggedIn"
        class="btn btn-sm btn-danger"
        @click="logout"
      >
        Logout
      </button>
    </li>
  </ul>
</template>

<script>
import SearchIcon from '@/icons/SearchIcon'
import CartIcon from '@/icons/CartIcon'
import CartBag from '@/components/Cart/CartBag'

export default {
  name: 'IconMenu',
  components: { CartBag, CartIcon, SearchIcon },
  data() {
    return {
      items: [
        {
          to: '/search',
          icon: 'SearchIcon',
          title: 'Search'
        }
      ]
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" module>
.icon {
  fill: white;
  color: white;
  height: rem-calc(20px);
  width: rem-calc(20px);
}
</style>
