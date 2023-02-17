<template>
  <div :class="$style.el">
    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <div v-if="showRedirct" class="reset mb-2">
        <p class="mb-2">Keine Email erhalten?</p>
        <TheButton color="secondary" sm @click="resetVerification"
          >Erneut Senden</TheButton
        >
      </div>

      <form @submit.prevent="handleSubmit(login)">
        <TextField
          v-model="formData.email"
          :rules="{ required: true }"
          label="Email"
          type="email"
          name="email"
        />
        <TextField
          v-model="formData.password"
          :rules="{ required: true }"
          label="Password"
          type="password"
          name="password"
        />

        <div class="row align-items-center justify-content-between">
          <div class="col-auto">
            <div class="flex">
              <TheButton type="submit" :class="{ 'is-loading': loading }">
                {{ $t('Login') }}
              </TheButton>
              <span class="mx-2"> {{ $t('oder') }}</span>

              <NuxtLink :to="localePath({ name: 'register' })"
                >Registrieren</NuxtLink
              >
            </div>
          </div>
          <div class="col-auto">
            <NuxtLink
              class="btn-link"
              :to="localePath({ name: 'forgot-password' })"
              >Password vergessen?
            </NuxtLink>
          </div>
        </div>
      </form>
    </ValidationObserver>
    <div v-if="loading" :class="$style.overlay">
      <Spinner />
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import TextField from '@/components/Forms/TextField'
import FormMixin from '@/components/Forms/FormMixin'
import Spinner from '@/components/Common/Spinner'
import TheButton from '@/components/Forms/TheButton'

const formDataDefaults = {
  email: '',
  password: ''
}

export default {
  name: 'LoginForm',
  components: {
    TheButton,
    Spinner,
    TextField,
    ValidationObserver
  },

  mixins: [FormMixin],
  props: {
    redirect: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      formDataDefaults,
      showRedirct: !!this.$route.query.email,
      resending: false
    }
  },
  methods: {
    async resetVerification() {
      if (this.resending) return
      try {
        this.resending = true
        await this.$axios.post('/user/email/verify/resend', {
          email: this.$route.query.email
        })
      } catch (e) {
        this.$toast.error('Email konnte nicht gesendet werden.')
      } finally {
        this.resending = false
      }
    },

    async login() {
      this.loading = true
      try {
        await this.$auth.loginWith('volvStrategy', {
          data: { ...this.formData, attribute: this.$shopId }
        })

        this.$emit('logged-in', true)

        if (this.redirect) {
          await this.$router.push(
            this.localePath({
              name: this.redirect
            })
          )
        }
      } catch (e) {
        this.catchLaravelErrors(e)
        this.$emit('logged-in', false)
      } finally {
        this.loading = false
      }

      // return Promise.resolve()
    }
  }
}
</script>

<style lang="scss" module>
.el {
  position: relative;
}

.overlay {
  align-items: center;
  background: rgba(white, 0.6);
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
}
</style>
