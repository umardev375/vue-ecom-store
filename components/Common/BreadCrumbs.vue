<template>
  <ol
    id="breadcrumb"
    vocab="http://schema.org/"
    typeof="BreadcrumbList"
    class="container"
  >
    <li property="itemListElement" typeof="ListItem">
      <NLink property="item" typeof="WebPage" to="/">
        <span property="name"><HomeIcon class="small-icon" /></span>
      </NLink>
      <meta property="position" content="1" />
    </li>
    <li
      v-for="(crumb, index) in crumbs"
      :key="index"
      property="itemListElement"
      typeof="ListItem"
    >
      <NLink
        v-if="crumb.title !== ''"
        property="item"
        typeof="WebPage"
        :to="crumb.path"
        :event="checkRoute(crumb, index, crumbs) ? 'click' : ''"
        :disabled="checkRoute(crumb, index, crumbs)"
      >
        <span property="name">{{
          ($route.fullPath === crumb.path) === null ? '' : crumb.title
        }}</span>
      </NLink>
      <meta property="position" :content="index + 2" />
    </li>
  </ol>
</template>

<script>
import HomeIcon from '@/icons/HomeIcon'
export default {
  name: 'BreadCrumbs',
  components: { HomeIcon },
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath
      const params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/')
      const crumbs = []
      let path = ''
      params.forEach((param, index) => {
        path = `${path}/${param}`
        const match = this.$router.match(path)
        if (match.name !== null) {
          crumbs.push({
            title: param.replace(/-/g, ' '),
            ...match
          })
        }
      })
      return crumbs
    },
    isProduct() {
      return this.crumbs.some((crumb) => crumb.title === 'product')
    }
  },
  methods: {
    checkRoute(route, index, routes) {
      return routes.length === index + 1 ? '' : route.path
    }
  }
}
</script>

<style scoped lang="scss">
.small-icon {
  width: 20px;
  fill: white;
}

#breadcrumb {
  margin-top: 20px;
  list-style: none;
  height: 30px;
  li {
    float: left;
    & a {
      color: #fff;
      display: block;
      background: var(--theme-primary-color);
      text-decoration: none;
      position: relative;
      height: 30px;
      line-height: 30px;
      padding: 0 10px 0 5px;
      text-align: center;
      margin-right: 23px;

      &:before,
      &:after {
        content: '';
        position: absolute;
        top: 0;
        border: 0 solid var(--theme-primary-color);
        border-width: 15px 10px;
        width: 0;
        height: 0;
      }
      &:before {
        left: -20px;
        border-left-color: transparent;
      }
      &:after {
        left: 100%;
        border-color: transparent;
        border-left-color: var(--theme-primary-color);
      }
      &:hover {
        background-color: var(--theme-secondary-color);
        &:before {
          border-color: var(--theme-secondary-color);
          border-left-color: transparent;
        }
        &:after {
          border-left-color: var(--theme-secondary-color);
        }
      }
      &.nuxt-link-exact-active.nuxt-link-active {
        color: white !important;
        background: var(--theme-secondary-color) !important;
        &:before {
          border-color: var(--theme-secondary-color);
          border-left-color: transparent;
        }
        &:after {
          border-left-color: var(--theme-secondary-color);
        }
      }
    }
    &:nth-child(even) a {
      background-color: var(--theme-primary-color);
      &:before {
        border-color: var(--theme-primary-color);
        border-left-color: transparent;
      }
      &:after {
        border-left-color: var(--theme-primary-color);
      }
    }
    &:first-child a {
      padding-left: 15px;
      -moz-border-radius: 4px 0 0 4px;
      -webkit-border-radius: 4px;
      border-radius: 4px 0 0 4px;
      &:before {
        border: none;
      }
    }
    &:last-child a {
      padding-right: 15px;
      -moz-border-radius: 0 4px 4px 0;
      -webkit-border-radius: 0;
      //border-radius: 0 4px 4px 0;
      &:after {
        //border: none;
      }
    }
  }
}
</style>
