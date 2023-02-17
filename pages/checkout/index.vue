<template>
  <!-- Todo: Split in separated components -->
  <ValidationObserver v-slot="{ handleSubmit, invalid }" slim>
    <CheckoutWrapper
      :empty-cart-text="$t('checkout.infos.emptyCart')"
      :title="$t('checkout.titles.checkout')"
    >
      <template #headerIcon>
        <CartIcon />
      </template>
      <template #default>
        <!--    <GuestOrAccount v-model="checkoutMode" /> -->

        <div v-if="!$auth.loggedIn" :class="$style.header">
          <RadioInline
            v-model="checkoutMode"
            :group="false"
            inline
            name="goestor"
            :options="checkoutOptions"
          ></RadioInline>
        </div>

        <CheckoutGroup
          v-if="checkoutMode !== 'guest' && !$auth.loggedIn"
          :title="$t('common.login')"
        >
          <LoginForm />
        </CheckoutGroup>

        <CheckoutGroup :title="$t('checkout.titles.deliveryAddress')">
          <PresistAddressForm
            ref="addressForm"
            :addresses="addresses"
            :create-new-address.sync="createAddress"
            :path="addressPath"
          ></PresistAddressForm>
        </CheckoutGroup>

        <CheckoutGroup v-if="checkoutMode === 'guest'">
          <GhostForm
            ref="ghost"
            :ghost-exists.sync="ghostExists"
            :address="deliveryAddress"
          ></GhostForm>
          <!-- Todo: ADD Warning when email already exists as customer -->
          <AlertBanner v-show="false"> Already </AlertBanner>
        </CheckoutGroup>
      </template>

      <template #afterContent>
        <CheckoutFooter>
          <CheckoutBackBtn :to="localePath({ name: 'checkout-cart' })">
            {{ $t('checkout.buttons.backToCart') }}
          </CheckoutBackBtn>
          <template #right>
            <!-- Todo: Disable when invalid -->
            <button
              :disabled="invalid"
              class="btn btn-primary"
              :class="{ 'is-loading': loading }"
              @click="handleSubmit(goToPayment)"
            >
              {{ $t('checkout.buttons.goToPayment') }}
            </button>
          </template>
        </CheckoutFooter>
      </template>

      <template #right>
        <CartTotal />
      </template>
    </CheckoutWrapper>
  </ValidationObserver>
</template>

<script>
import PresistAddressForm from '@/components/Checkout/PresistAddressForm'
import LoginForm from '@/components/Auth/LoginForm'
import CheckoutBackBtn from '@/components/Checkout/CheckoutBackBtn'
import CheckoutFooter from '@/components/Checkout/CheckoutFooter'
import CheckoutWrapper from '@/components/Checkout/CheckoutWrapper'
import CartIcon from '@/icons/CartIcon'
import { ValidationObserver } from 'vee-validate'
import CartTotal from '@/components/Checkout/Total'
import CheckoutGroup from '@/components/Checkout/CheckoutGroup'
import RadioInline from '@/components/Forms/RadioInline'
import GhostForm from '@/components/Auth/GhostForm'
import AlertBanner from '@/components/Alert'

export default {
  name: 'Checkout',
  components: {
    AlertBanner,
    GhostForm,
    CheckoutFooter,
    CheckoutBackBtn,
    CartIcon,
    RadioInline,
    CheckoutGroup,
    CartTotal,
    CheckoutWrapper,
    LoginForm,
    PresistAddressForm,
    ValidationObserver
  },

  data() {
    return {
      deliverySelected: false,
      createAddress: false,
      alreadyRegistered: false,
      ghostExists: false,
      addressPath: 'deliveryAddress',
      loading: false,
      checkoutMode:
        !this.$auth.hasScope('ghost') && this.$auth.loggedIn ? 'user' : 'guest'
      // Todo: remove this when its finished
    }
  },

  async fetch() {
    await this.fetchAddresses()
  },

  head() {
    return { title: 'Checkout' }
  },
  computed: {
    showLogin() {
      return !this.$auth.hasScope('ghost') && !this.$auth.loggedIn
    },

    addresses() {
      return this.$store.getters['account/address/delivery']
    },

    deliveryAddress() {
      return this.$store.state.checkout.deliveryAddress
    },

    emptyCart() {
      return !this.$store.state.cart.cart.items > 0
    },

    checkoutOptions() {
      return [
        {
          title: 'Als Gast',
          id: 'guest'
        },
        {
          title: 'Ich besitze einen Account',
          id: 'user'
        }
      ]
    }
  },

  watch: {
    '$auth.loggedIn'(newVal) {
      if (!newVal) return
      this.fetchAddresses()
    }
  },
  // Todo: Clean the mess up
  methods: {
    createAddressAndSet() {
      return this.$store.dispatch('checkout/createAddressAndSet', {
        path: this.addressPath,
        address: this.deliveryAddress
      })
    },

    async goToPayment() {
      this.alreadyRegistered = false
      this.loading = true
      if (this.$auth.loggedIn && !this.$auth.hasScope('ghost')) {
        // Handle Normal user
        if (this.createAddress) {
          await this.createAddressAndSet()
        }
        await this.$router.push(this.localePath({ name: 'checkout-payment' }))
      } else {
        // Handle Ghost
        try {
          const { data: token } = await this.$refs.ghost.create()
          // await this.$refs.ghost.login()

          await this.$auth.setUserToken(token.access_token)

          await this.createAddressAndSet()
          await this.$router.push(this.localePath({ name: 'checkout-payment' }))
        } catch (e) {
          if (e.response.status === 409) {
            this.alreadyRegistered = true
          }
        }
      }
      this.loading = false
    },

    async fetchAddresses() {
      try {
        if (this.$auth.loggedIn && !this.$auth.hasScope('ghost')) {
          await this.$store.dispatch('account/address/fetch')
        }
      } catch (e) {
        console.log(e.response)
      }
    }
  }
}
</script>

<style lang="scss" module>
.header {
  margin-bottom: rem-calc(34px);
  padding-bottom: rem-calc(18px);
  border-bottom: 3px solid #7f7f7f;
}
</style>
