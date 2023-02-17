<template>
  <div class="main">
    <PageHeader v-if="page.showName" :title="page.name"></PageHeader>
    <BreadCrumbs />
    <BuilderRendererBase :rows="page.content.rows" />
  </div>
</template>

<script>
import BuilderRendererBase from '@/components/Renderer/BuilderRendererBase'
import PageHeader from '@/components/Common/PageHeader'
import BreadCrumbs from '@/components/Common/BreadCrumbs'
export default {
  name: 'SinglePage',
  components: { BreadCrumbs, PageHeader, BuilderRendererBase },
  async asyncData(ctx) {
    const { data: pages } = await ctx.$axios
      .$get('pages', {
        params: {
          slug: ctx.params.slug,
          shopId: ctx.$shopId,
          limit: 1,
          load: ['sections.rows.widgets']
        }
      })
      .catch((e) => {
        console.log(e)
      })

    return { page: pages[0] }
  },

  data() {
    return {
      page: {
        showName: false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
