<template>
  <PageWrapper :title="$t('Account Übersicht')">
    <template #aside>
      <ul class="sidenav">
        <li v-for="(menu, index) in menus" :key="index">
          <NuxtLink :to="localePath({ name: menu.route.name })">{{
            menu.label
          }}</NuxtLink>
        </li>
      </ul>
    </template>

    <NuxtChild />
  </PageWrapper>
</template>

<script>
import PageWrapper from '@/components/core/PageWrapper'
export default {
  name: 'AccountPage',
  components: { PageWrapper },
  middleware: ['auth'],
  data() {
    return {
      menus: [
        {
          route: {
            name: 'account'
          },
          label: 'Übersicht'
        },

        {
          route: {
            name: 'account-profile'
          },
          label: 'Persönliche Einstellugen'
        },
        {
          route: {
            name: 'account-addresses'
          },
          label: 'Adressen'
        },
        {
          route: {
            name: 'account-payment'
          },
          label: 'Zahlungsarten'
        },
        {
          route: {
            name: 'account-orders'
          },
          label: 'Bestellungen'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.sidenav {
  width: 100%;
  list-style: none;
  font-size: 14px;
  padding: 0;
  margin: 0;
  li {
    min-height: 24px;
    border-radius: 5px;
    cursor: pointer;
    & a {
      background: #f6f6f6;
      display: inline-block;
      min-height: 24px !important;
      padding: 10px 15px;
      margin: 5px 0px;
      border-radius: 5px;
      color: var(--theme-primary-color);
      width: 100% !important;
      &:hover {
        color: white !important;
      }
    }
    &:hover {
      & a {
        color: white !important;
        background: var(--theme-primary-color);
      }
    }
  }
}
.nuxt-link-exact-active {
  background: var(--theme-primary-color) !important;
  color: white !important;
}
</style>
