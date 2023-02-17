export default function ({
  $auth,
  redirect,
  app: { localePath, getRouteBaseName }
}) {
  if ($auth.hasScope('ghost')) redirect(localePath({ name: 'index' }))
}
