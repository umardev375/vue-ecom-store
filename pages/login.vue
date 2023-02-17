<template>
  <PageWrapper title="Login">
    <LoginForm redirect="shop" />
  </PageWrapper>
</template>

<script>
import LoginForm from '@/components/Auth/LoginForm'

import PageWrapper from '@/components/core/PageWrapper'
export default {
  name: 'LoginPage',

  components: { PageWrapper, LoginForm },
  auth: 'guest'
}
</script>

<style lang="scss" scoped></style>
