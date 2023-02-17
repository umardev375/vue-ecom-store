<template>
  <li v-if="show" class="navItem__dropdown">
    <a
      v-if="hasChildren"
      :class="{ 'navItem__dropdown-arrow': hasChildren }"
      class="navItem__link"
      href="#"
      @[dropdownEvent].prevent="openDropdown"
      >{{ item.label }}</a
    >

    <MenuLink
      v-else
      class="navItem__link"
      :link-type="item.type"
      :slug="item.value.slug"
      :label="item.label"
    />
    <ul
      v-if="hasChildren && !allChildNonPublic"
      v-show="isActive"
      class="navItem__dropdown-menu"
    >
      <template v-for="children in item.children">
        <li v-if="children.value.public" :key="children.id">
          <MenuLink
            class="navItem__link navItem__link-dropdown"
            :link-type="children.type"
            :slug="children.value.slug"
            :label="children.label"
          />
        </li>
      </template>
    </ul>
  </li>
</template>

<script>
import MenuLink from '@/components/Menu/MenuLink'
export default {
  name: 'NavigationItem',
  components: { MenuLink },
  props: {
    item: {
      type: Object,
      required: true
    },

    activeChild: {
      required: true,
      type: String
    }
  },
  computed: {
    isActive() {
      return this.item.id === this.activeChild
    },

    dropdownEvent() {
      return this.hasChildren ? 'click' : null
    },

    show() {
      if (this.item.type === 'CATEGORY') return true
      if (this.item.type === 'LABEL') {
        return !this.allChildNonPublic
      } else {
        return this.item.value.public
      }
    },

    allChildNonPublic() {
      return this.item.children.every((child) => {
        return child.value.public === 0
      })
    },

    hasChildren() {
      return this.item.children.length > 0
    }
  },
  watch: {
    $route() {
      this.$emit('open:dropdown', '')
      this.$emit('close')
    }
  },
  methods: {
    openDropdown() {
      if (this.isActive) {
        this.$emit('open:dropdown', '')
        return
      }

      this.$emit('open:dropdown', this.item.id)
    }
  }
}
</script>

<style lang="scss" scoped>
$arrowsize: 5px;
.navItem {
  &__dropdown {
    position: relative;
  }
  &__dropdown-arrow {
    &:after {
      display: inline-block;
      margin-left: 0.255em;
      vertical-align: 0.255em;
      content: '';
      border-top: $arrowsize solid;
      border-right: $arrowsize solid transparent;
      border-bottom: 0;
      border-left: $arrowsize solid transparent;
    }
  }
  &__dropdown-menu {
    padding: 0;
    border: 0;
    list-style-type: none;

    @include media-breakpoint-up(md) {
      position: absolute;
      //  top: 10px;
      top: 100%;
      margin: $account-dropdown-btn-my 0;

      right: 50%;
      transform: translateX(50%);
      min-width: 10rem;
      background: white;
      padding: 20px;
      box-shadow: rem-calc(0 0 38px 0) rgba(0, 0, 0, 0.1);
      border-radius: 5px;
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
  &__link {
    padding: rem-calc(10px 0);
    display: block;
    color: white;
    @include media-breakpoint-up(md) {
      margin-right: rem-calc(20px);
    }
  }

  &__link-dropdown {
    @include media-breakpoint-up(md) {
      color: black;
      padding: rem-calc(10px 0);
      // padding-bottom: rem-calc(10px);
    }
  }
}
</style>
