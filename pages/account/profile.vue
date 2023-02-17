<template>
  <div>
    <TwoColHeader :title="$t('Profil bearbeiten')">
      Hier können Sie Ihre Profildaten ändern.</TwoColHeader
    >
    <div class="row mb-4">
      <div class="col-12">
        <AccountContentBox :title="$t('Persönliche Daten')"></AccountContentBox>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <AccountContentBox :title="$t('Passwort ändern')">
          <ChangePasswordForm />
        </AccountContentBox>
      </div>
      <div class="col-md-6">
        <AccountContentBox :title="$t('E-Mail Adresse')">
          <template #intro>
            <strong class="d-block">
              {{ $t('Aktuelle E-Mail Adresse') }}
            </strong>

            {{ $auth.user.email }}
          </template>

          <ChangeEmailForm />
        </AccountContentBox>
      </div>
    </div>
  </div>
</template>

<script>
import AccountContentBox from '@/components/Account/AccountContentBox'
import ChangeEmailForm from '@/components/Account/ChangeEmailForm'
import TwoColHeader from '@/components/TwoColHeader'
import ChangePasswordForm from '@/components/Account/ChangePasswordForm'

export default {
  name: 'ProfilePage',
  components: {
    ChangePasswordForm,
    ChangeEmailForm,
    AccountContentBox,
    TwoColHeader
  }
}
</script>

<style lang="scss" scoped></style>
