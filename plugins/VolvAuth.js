import LocalScheme from '@nuxtjs/auth/lib/schemes/local'

export default class VolvAuth extends LocalScheme {
  async fetchUser(endpoint) {
    console.log('Volv callee')
    // Token is required but not available
    if (this.options.tokenRequired && !this.$auth.getToken(this.name)) {
      return
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }

    // Try to fetch user
    const user = await this.$auth.requestWith(
      this.name,
      endpoint,
      this.options.endpoints.user
    )
    try {
      const { data: customer } = await this.$auth.ctx.$axios.$get(
        'shops/customers/user',
        {
          params: { load: ['addresses'] }
        }
      )

      // Transform the user object

      const isGhost = !!user.roles.find((role) => 'ghost')

      const customUser = {
        ...user,
        fullName: user.name + ' ' + user.lastname,
        roles: user.roles.map((role) => {
          return role.name
        }),
        isGhost,
        rolesOrig: user.roles,
        customer
      }
      this.$auth.setUser(customUser)
    } catch (e) {
      console.log('Failed to load customer', e.response)
    }
  }
}
