<template>
  <ul :class="$style.list">
    <li v-for="(item, index) in items" :key="index" :class="$style.item">
      <nuxt-link :to="localePath(item.to)" :class="$style.link">
        {{ item.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TheNavDesign',
  data() {
    return {
      items: [
        {
          title: 'Home Page',
          to: { name: 'index' }
        },
        {
          title: 'Menu Item',
          to: { name: 'index' }
        },
        {
          title: 'Menu Item',
          to: { name: 'index' }
        },
        {
          title: 'Menu Item',
          to: { name: 'index' }
        }
      ]
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

.link {
  display: block;
  font-size: rem-calc(13px);
  line-height: 1.2;
  white-space: nowrap;

  &:hover {
    color: #c9c9c9;
  }
}
</style>
