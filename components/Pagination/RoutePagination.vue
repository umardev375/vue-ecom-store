<template>
  <nav v-if="pages > 1" :class="$style.pagination">
    <ul :class="$style.paginationList">
      <li v-if="previous">
        <NuxtLink
          :class="$style.paginationPrev"
          :to="{
            path: this.$route.path,
            query: { query: queryParam, page: current - 1 }
          }"
          :title="$t('Previous Page')"
          exact-active-class
          active-class
        >
          &lt;
        </NuxtLink>
      </li>
      <li v-for="number in numbers" :key="number">
        <NuxtLink
          v-if="number"
          :class="[
            $style.paginationLink,
            { [$style.paginationLinkActive]: number === current }
          ]"
          :to="to(number, queryParam)"
          exact-active-class
          active-class
        >
          {{ number }}
        </NuxtLink>
        <span v-else :class="$style.paginationEllipsis">&hellip; </span>
      </li>
      <li v-if="next">
        <NuxtLink
          :to="{
            path: this.$route.path,
            query: { query: queryParam, page: current + 1 }
          }"
          :class="$style.paginationNext"
          :title="$t('Next Page')"
          exact-active-class
          active-class
        >
          &gt;
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
import deepmerge from 'deepmerge'
import { paginationNumbers } from './paginationNumbers'

export default {
  props: {
    meta: {
      type: Object,
      default: () => ({}),
      required: true
    },

    display: {
      type: Number,
      default: 3
    },

    route: {
      type: Object,
      default: () => ({})
    },

    queryParam: {
      type: String,
      default: ''
    }
  },

  computed: {
    current() {
      return this.meta.page
    },

    pages() {
      return this.meta.pages
    },

    previous() {
      return this.to(this.current - 1)
    },

    next() {
      return this.to(this.current + 1)
    },

    numbers() {
      return paginationNumbers(this.current, this.pages, this.display)
    }
  },

  methods: {
    to(page, queryParam) {
      if (page < 1 || page > this.pages) {
        return
      }

      const { name, params, query } = this.$route

      return deepmerge.all([
        {},
        {
          name,
          params,
          query
        },
        this.route,
        { query: { page, query: queryParam } }
      ])
    }
  }
}
</script>

<style lang="scss" module>
.pagination {
  &__list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__prev,
  &__next,
  &__ellipsis,
  &__link {
    border-radius: 7px;
    color: $primary;
    align-items: center;
    display: flex;
    height: rem-calc(30px);
    font-size: 12px;
    justify-content: center;
    min-width: rem-calc(30px);
    padding: rem-calc(6px);
    position: relative;
    vertical-align: top;

    &:hover {
      color: inherit;
      //text-decoration: none;
    }
  }

  &__link {
    cursor: pointer;
    user-select: none;

    &--active {
      background-color: $table-border-color;
    }
  }
}
</style>
