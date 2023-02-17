<template>
  <div>
    <PageHeader title="Reset Passwort"></PageHeader>
    <Container>
      <ResetPasswordForm></ResetPasswordForm>
    </Container>
  </div>
</template>

<script>
import PageHeader from '@/components/Common/PageHeader'
import Container from '@/components/Common/Container'
import ResetPasswordForm from '@/components/Auth/ResetPasswordForm'
export default {
  name: 'ResetPasswordPage',
  components: { ResetPasswordForm, Container, PageHeader },
  middleware({ route, redirect, app }) {
    if (!route.query.token) return redirect(app.localePath({ name: 'login' }))
  }
}
</script>

<style lang="scss" scoped></style>
