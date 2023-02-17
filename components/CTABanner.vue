<template>
  <div v-if="!cookiesAccepted" class="banner">
    <img class="banner__cookie mb-5" :src="cookieBanner" />

    <p>
      Unsere Websites und Dashboards verwenden Cookies. Wenn Sie fortfahren,
      stimmen Sie deren Verwendung zu. Erfahren Sie mehr, einschließlich wie Sie
      Cookies kontrollieren können
    </p>
    <button type="button" class="btn btn-primary" @click="accept">
      Verstanden
    </button>
  </div>
</template>

<script>
import cookieBanner from '@/assets/images/cookieBanner.svg'
import VolvButton from '@/components/Forms/Button'

export default {
  name: 'CookieBanner',
  components: { VolvButton },
  data() {
    return {
      cookieBanner,
      cookiesAccepted: false,
      clickAccept: false
    }
  },

  computed: {},

  created() {
    this.cookiesAccepted = this.$storage.getUniversal('cookies')
  },

  methods: {
    accept() {
      this.cookiesAccepted = true
      this.$storage.setUniversal('cookies', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  background-color: #fff;
  border-radius: 0.25em;
  box-shadow: 0 0 100px 10px rgb(0 0 0 / 50%);
  left: 50%;
  margin-right: -50%;
  padding: 2.5em 7% 2em;
  position: fixed;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  z-index: 9999;

  p {
    font-size: 16px;
  }
  @include media-breakpoint-up(md) {
    width: 38%;
  }
}
</style>
