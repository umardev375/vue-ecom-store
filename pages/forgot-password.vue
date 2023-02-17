<template>
  <BaseLayout :title="$t('Password Wiederherstellen')">
    <ForgotPasswordForm />
  </BaseLayout>
</template>

<script>
import ForgotPasswordForm from '@/components/Auth/ForgotPassword'
import BaseLayout from '@/components/core/PageWrapper'
export default {
  name: 'ForgotPasswordPage',
  components: {
    BaseLayout,
    ForgotPasswordForm
  }
}
</script>
