<template>
  <div class="search-bar">
    <label :for="fieldId" class="sr-only">Suchen</label>
    <input
      :id="fieldId"
      ref="search"
      v-model="internalValue"
      v-focus
      class="search-bar-input"
      :name="name"
      :placeholder="placeholder"
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
      @blur="blur"
      @input="updateValue"
      @keyup.enter="search"
    />
    <button type="submit" class="search-bar-button" @click="search">
      <SearchIcon2 />
    </button>
  </div>
</template>

<script>
import Vue from 'vue'
import SearchIcon2 from '@/icons/SearchIcon2'
import FormFieldMixin from '@/components/Forms/FormFieldMixin'
export default {
  name: 'SearchField',
  components: { SearchIcon2 },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
      update(el) {
        Vue.nextTick(function () {
          el.focus()
        })
      }
    }
  },
  mixins: [FormFieldMixin],
  props: {
    type: {
      type: String,
      default: 'text'
    }
  },

  watch: {
    $route() {
      this.$store.commit('search/TOGGLE_SEARCH', false)
    }
  },

  methods: {
    setFocus() {
      //  this.$refs.search.$el.focus()
    },

    search() {
      const params = {
        path: '/search',
        query: {
          query: this.internalValue
        }
      }
      this.$store.commit('search/TOGGLE_SEARCH', false)
      this.$router.push(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  width: 100%;
  display: inline-flex;
}
.search-bar-input {
  width: 100%;
  padding: 10px;
  outline: none;
  border: 1px solid;
  border-radius: 100px 0 0 100px;
  transition: background 0.25s, box-shadow 0.25s;
  border-right: 0;
}

.search-bar-input:focus {
  background: white;
}

.search-bar-button {
  width: 30px;
  background: white;
  outline: 0;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 100px 100px 0;
  cursor: pointer;
  user-select: none;
  border: 1px solid;
  border-left: 0;
}
</style>
