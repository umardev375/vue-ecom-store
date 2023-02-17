<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="container">
        <div class="row">
          <FooterSection
            v-for="children in menu"
            :key="children.id"
            :children="children"
            class="col-12 col-xs-6 col-sm-4 mb-5"
          >
          </FooterSection>
        </div>
      </div>
    </div>
    <FooterLegalBar />
  </footer>
</template>

<script>
import FooterLegalBar from '@/components/core/Footer/FooterLegalBar'
import FooterSocials from '@/components/core/Footer/FooterSocials'
import FooterSection from '@/components/core/Footer/FooterSection'

export default {
  name: 'SiteFooter',
  components: {
    FooterSection,

    //  Menu,
    FooterLegalBar,
    FooterSocials
  },

  data() {
    return {
      menu: []
    }
  },

  // about-us, imprint, terms & policy
  async fetch() {
    const { data: menu } = await this.$axios.$get('shops/menus', {
      params: {
        location: 'FOOTERMENU',
        load: ['children.value'],
        shopId: this.$shopId
      }
    })

    this.menu = menu[0].children
  }
}
</script>

<style lang="scss" scoped>
.footer {
  &__inner {
    color: $white;
    padding: rem-calc(68px 0 74px);
    padding: rem-calc(68px 0 74px);
    background: #283976;
  }
}

.details {
  // background: var(--theme-primary-color);
}
/*
.row {
  display: flex;

  @include media-breakpoint-down(md) {
    flex-wrap: wrap;
  }
}

.col1 {
  border-right: 3px solid rgba($white, 0.12);
  flex-shrink: 0;
  min-width: rem-calc(200px);
  padding: rem-calc(8px) wrap-calc(70px) rem-calc(16px 0);
  width: rem-calc(260px);

  @include media-breakpoint-down(md) {
    border-bottom: 3px solid rgba($white, 0.12);
    border-right: 0;
    margin-bottom: rem-calc(68px);
    padding-bottom: rem-calc(68px);
    padding-right: 0;
    width: 100%;
  }
}
*/
/*
.col2 {
  flex-grow: 1;
  flex-shrink: 1;
  padding: rem-calc(14px 0 14px) wrap-calc(90px, $footer-wrapper-inner-width);

  @include media-breakpoint-down(md) {
    padding-left: 0;
    width: 100%;
  }
}
*/
.logo {
  @include font-size(35px);
  display: inline-block;
  color: inherit;
  font-weight: $font-weight-bold;
  line-height: 1.2;
  margin-bottom: rem-calc(44px);

  &:hover {
    color: inherit;
  }
}

.address {
  color: #666;
  font-size: rem-calc(14px);
  line-height: (19 / 14);
  letter-spacing: 0.02em;
  margin-bottom: rem-calc(25px);
  max-width: rem-calc(200px);

  a {
    color: $white;
    display: inline-block;
    font-weight: $font-weight-bold;
    margin-bottom: rem-calc(14px);
  }
}
</style>
