<template>
  <ul :class="$style.list">
    <template v-for="item in items">
      <li v-if="item.products_count" :key="item.id" :class="$style.item">
        <NuxtLink
          :to="
            localePath({
              name: 'collection-category',
              params: { category: item.slug }
            })
          "
          :class="$style.link"
        >
          {{ item.title }} ({{ item.products_count }})
        </NuxtLink>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'CategoryWidgetNav',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" module>
.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.item {
  margin-bottom: rem-calc(14px);

  &:last-child {
    margin-bottom: 0;
  }
}

.link {
  display: inline-block;
  color: $gray-600;
  font-size: rem-calc(12px);

  &:hover,
  &:global(is-active) {
    color: $body-color;
  }
}
</style>
