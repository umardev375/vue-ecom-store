<template>
  <div :class="$style.dropdown">
    <button
      id="account-dropdown"
      :class="$style.button"
      type="button"
      tabindex="0"
      aria-haspopup="true"
    >
      <UserIcon :class="$style.buttonSvg" />
    </button>
    <div :class="$style.menu" aria-labelledby="account-dropdown">
      <ul :class="$style.menuList">
        <li v-for="(item, index) in items" :key="index" :class="$style.item">
          <nuxt-link :to="localePath(item.to)" :class="$style.link" exact>
            <component :is="item.icon" :class="$style.linkSvg" />
            {{ item.title }}
          </nuxt-link>
        </li>
        <li :class="$style.item">
          <button :class="$style.link" type="button" tabindex="0">
            <PowerOffIcon :class="$style.linkSvg" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BellIcon from '@/icons/BellIcon'
import CommentIcon from '@/icons/CommentIcon'
import HeartOutlineIcon from '@/icons/HeartOutlineIcon'
import MoneyBillIcon from '@/icons/MoneyBillIcon'
import PowerOffIcon from '@/icons/PowerOffIcon'
import ShoppingCartIcon from '@/icons/ShoppingCartIcon'
import SlidersVIcon from '@/icons/SlidersVIcon'
import UserIcon from '@/icons/UserIcon'

export default {
  name: 'AccountDropdownDesign',
  components: {
    PowerOffIcon,
    MoneyBillIcon,
    SlidersVIcon,
    CommentIcon,
    BellIcon,
    ShoppingCartIcon,
    HeartOutlineIcon,
    UserIcon
  },
  data() {
    return {
      items: [
        {
          to: { name: 'index' },
          icon: 'UserIcon',
          title: 'My account'
        },
        {
          to: { name: 'index' },
          icon: 'HeartOutlineIcon',
          title: 'My Wishlist'
        },
        {
          to: { name: 'index' },
          icon: 'ShoppingCartIcon',
          title: 'My Orders'
        },
        {
          to: { name: 'index' },
          icon: 'BellIcon',
          title: 'Notifications'
        },
        {
          to: { name: 'index' },
          icon: 'CommentIcon',
          title: 'Messages'
        },
        {
          to: { name: 'index' },
          icon: 'SlidersVIcon',
          title: 'Settings'
        },
        {
          to: { name: 'index' },
          icon: 'MoneyBillIcon',
          title: 'Payments'
        }
      ]
    }
  }
}
</script>

<style lang="scss" module>
.dropdown {
  display: flex;
  margin: $account-dropdown-btn-my 0;
  position: relative;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: $gray-400;
  }
}

.button {
  background: transparent;
  border: 0;
  color: inherit;
  padding: $account-dropdown-btn-p;

  &__svg {
    fill: currentColor;
    height: rem-calc(20px);
    width: rem-calc(20px);
  }

  &:focus {
    outline: 0;
  }
}

.menu {
  display: none;
  position: absolute;
  right: 50%;
  top: 100%;
  transform: translateX(50%);
  padding: $account-dropdown-btn-my 0 0;

  .dropdown:hover & {
    display: block;
  }

  &__list {
    background: #fff;
    border-radius: $border-radius;
    box-shadow: rem-calc(0 0 38px 0) rgba(0, 0, 0, 0.1);
    list-style: none;
    margin: 0;
    min-width: rem-calc(230px);
    padding: rem-calc(34px 26px);
    position: relative;

    &::before {
      border-color: transparent transparent #fff transparent;
      border-style: solid;
      border-width: rem-calc(0 10px 11px 10px);
      content: '';
      height: 0;
      left: 50%;
      position: absolute;
      top: 0;
      transform: translate(-50%, -100%);
      width: 0;
    }
  }
}

.item {
  margin-bottom: rem-calc(20px);

  &:last-child {
    margin-bottom: 0;
  }
}

.link {
  align-items: center;
  background: transparent;
  border: 0;
  display: inline-flex;
  font-size: rem-calc(11px);
  font-weight: $font-weight-base;
  padding: 0;
  text-transform: uppercase;
  transition: color 0.2s ease-in-out;

  &__svg {
    fill: currentColor;
    flex-shrink: 0;
    height: rem-calc(20px);
    margin-right: rem-calc(24px);
    width: rem-calc(20px);
  }

  &:global(.is-active),
  &:hover {
    color: $gray-400;
  }
}
</style>
