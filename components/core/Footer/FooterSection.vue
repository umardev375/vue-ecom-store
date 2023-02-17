<template>
  <div class="section">
    <!--  {{ children.label }} -->

    <h4 class="section__title">
      <template v-if="isLabel">
        {{ children.label }}
      </template>

      <template v-else>
        <NuxtLink :to="labelTo">
          {{ children.label }}
        </NuxtLink>
      </template>
    </h4>

    <ul class="section__nav">
      <li v-for="child in children.children" :key="child.id">
        <MenuLink
          :link-type="child.type"
          :slug="child.value.slug"
          :label="child.label"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import menuMixin from '@/components/Menu/menuMixin'
import MenuLink from '@/components/Menu/MenuLink'

export default {
  name: 'FooterSection',
  components: { MenuLink },
  mixins: [menuMixin],
  props: {
    children: {
      type: Object,
      required: true
    }
  },
  computed: {
    labelTo() {
      return this.isLabel
        ? null
        : this.localePath({
            name: 'index'
          })
    },

    isLabel() {
      return this.children.type === 'LABEL'
    },

    titleComponent() {
      return this.isLabel ? 'h4' : 'NuxtLink'
    }
  },
  methods: {
    slug(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  &__title {
    margin-bottom: 2rem;
  }
  &__title > * {
    color: white;
  }

  &__nav {
    margin: 0;
    list-style-type: none;

    padding: 0;

    li {
      margin-bottom: 2rem;
      a {
        font-size: 0.95rem;
        color: white;
      }
    }
  }
}
</style>
