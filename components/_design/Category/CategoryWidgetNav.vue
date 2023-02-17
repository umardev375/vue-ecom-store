<template>
  <ul :class="$style.list">
    <li v-for="(item, index) in items" :key="index" :class="$style.item">
      <nuxt-link :to="item.to" :class="$style.link">
        {{ item.title }} ({{ item.total }})
      </nuxt-link>
    </li>
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
