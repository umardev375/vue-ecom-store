<template>
  <div>
    <CategoryWidgetTabs>
      <CategoryWidgetTab title="Shop by Category">
        <CategoryWidgetNav :items="categories" />
      </CategoryWidgetTab>
      <CategoryWidgetTab title="Shop by Brand">
        <CategoryWidgetNav :items="brands" />
      </CategoryWidgetTab>
      <CategoryWidgetTab title="Shop by Price">
        <CategoryWidgetPriceDesign />
      </CategoryWidgetTab>
      <CategoryWidgetTab title="Shop by Size">
        <CategoryWidgetNav :items="sizes" />
      </CategoryWidgetTab>
    </CategoryWidgetTabs>
  </div>
</template>

<script>
import CategoryWidgetNav from '@/components/_design/Category/CategoryWidgetNav'
import CategoryWidgetPriceDesign from '@/components/_design/Category/CategoryWidgetPriceDesign'
import CategoryWidgetTab from '@/components/_design/Category/CategoryWidgetTab'
import CategoryWidgetTabs from '@/components/_design/Category/CategoryWidgetTabs'

export default {
  name: 'CategoryWidgetDesign',
  components: {
    CategoryWidgetPriceDesign,
    CategoryWidgetNav,
    CategoryWidgetTab,
    CategoryWidgetTabs
  },
  data() {
    return {
      categories: [
        {
          to: { name: 'product' },
          title: 'iOS Compatibile',
          total: '26'
        },
        {
          to: { name: 'product' },
          title: 'Android Compatibile',
          total: '140'
        },
        {
          to: { name: 'product' },
          title: 'Accessories',
          total: '248'
        }
      ],
      brands: [
        {
          to: { name: 'product' },
          title: 'Apple',
          total: '26'
        },
        {
          to: { name: 'product' },
          title: 'Samsung',
          total: '140'
        }
      ],
      sizes: [
        {
          to: { name: 'product' },
          title: '42mm',
          total: '26'
        },
        {
          to: { name: 'product' },
          title: '44mm',
          total: '140'
        }
      ]
    }
  }
}
</script>

<style lang="scss" module></style>
