<template>
  <PageWrapper :title="$t('Account erstellen')">
    <RegisterForm></RegisterForm>
  </PageWrapper>
</template>

<script>
import RegisterForm from '@/components/Auth/RegisterForm'
import PageWrapper from '@/components/core/PageWrapper'

export default {
  name: 'RegisterPage',

  components: { PageWrapper, RegisterForm }
}
</script>
