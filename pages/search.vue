<template>
  <PageWrapper :loading="$fetchState.pending" title="Suche">
    <TextField
      v-model="query"
      :name="'search'"
      class="mb-3"
      placeholder="Suchwort"
      :value="$route.query.query"
      @input="productSearch"
    />

    <div v-if="products.length && query">
      <h3 class="mb-3">
        <!-- i18n --->
        {{ productsMeta.total }}
        {{ products.length === 1 ? 'Resultat:' : 'Resultate:' }} für: "{{
          query
        }}"
      </h3>
      <ProductListBase :products="products" />
      <RoutePagination :meta="productsMeta" :query-param="query" />
    </div>

    <div v-else>
      <h3 v-if="!showLoader && query">Keine Resultate für: "{{ query }}"</h3>
      <h3 v-else>Bitte geben Sie ein Suchwort ein</h3>
      <!--  <TheButton class="mr-3" @click="$router.go(-1)">
				<ArrowIcon />
			</TheButton> -->
    </div>
    <Spinner v-if="showLoader && query" />
  </PageWrapper>
</template>

<script>
import PageWrapper from '@/components/core/PageWrapper'
import TextField from '@/components/Forms/TextField'
import ProductListBase from '@/components/Product/List/ProductListBase'
import RoutePagination from '@/components/Pagination/RoutePagination'

import Spinner from '@/components/Common/Spinner'
import debounce from 'lodash-es/debounce'

const load = [
  'variants.attributeValues',
  'attributes.values',
  // 'categories',
  'variants.attributes',
  'media'
  // 'stocks'
]

export default {
  name: 'SearchPage',
  components: {
    Spinner,

    PageWrapper,
    TextField,
    ProductListBase,
    RoutePagination
  },

  data() {
    return {
      query: this.$route.query.query || '',
      page: this.$route.query.page || 1
    }
  },

  fetch() {
    this.fetchProducts(this.query)
  },

  computed: {
    products() {
      return this.$store.state.products.all
    },
    productsMeta() {
      return this.$store.state.products.meta
    },
    showLoader() {
      return this.products.length === 0 && this.$store.state.products.loading
    }
  },
  watch: {
    '$route.query': '$fetch'
  },

  methods: {
    async fetchProducts(querystring) {
      if (querystring) {
        const params = {
          page: this.page || 1,
          query: querystring,
          load
        }
        await this.$store.dispatch('products/search', params)
      } else {
        await this.$store.dispatch('products/fetchAll', {
          load
        })
      }
    },
    productSearch: debounce(function () {
      history.replaceState(
        {},
        null,
        this.$route.path +
          '?query=' +
          encodeURIComponent(this.query) +
          '&page=1'
      )

      const productObj = []
      this.$store.commit('products/SET', productObj)
      this.fetchProducts(this.query)
    }, 1000)
  }
}
</script>

<style lang="scss" module>
.button {
  float: left;
  //background: white;
  border: 0;
  padding: $account-dropdown-btn-p;
  width: 35px;
  transform: rotate(-90deg);
  transition: color 0.2s ease-in-out;

  &:hover {
    color: $gray-400;
  }

  &__svg {
    height: rem-calc(10px);
    width: rem-calc(10px);
  }

  &:focus {
    outline: 0;
  }
}
</style>
