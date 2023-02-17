<template>
  <div v-if="!$fetchState.pending" class="main">
    <PageHeader v-if="page.showName" :title="page.name"></PageHeader>
    <BreadCrumbs />
    <BuilderRenderer :rows="page.content.rows" />
  </div>
  <Spinner v-else></Spinner>
</template>

<script>
import BuilderRenderer from '@/components/Renderer/BuilderRendererBase'
import Spinner from '@/components/Common/Spinner'
import PageHeader from '@/components/Common/PageHeader'
import BreadCrumbs from '@/components/Common/BreadCrumbs'
export default {
  name: 'IndexPage',
  components: { BreadCrumbs, PageHeader, Spinner, BuilderRenderer },
  data() {
    return {
      page: { content: { widgets: [] } }
    }
  },

  async fetch() {
    const { data: pages } = await this.$axios
      .$get('pages', {
        params: {
          location: 'HOME',
          shopId: this.$shopId,
          limit: 1,
          load: ['sections.rows.widgets']
        }
      })
      .catch((e) => {
        console.log(e)
      })

    if (pages[0] && pages[0].content) {
      this.page = pages[0]
    }
  },
  head() {
    return { title: 'Home' }
  }
}
</script>
