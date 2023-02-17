export default function stripe(context, inject) {
  // its injected on the whole page in nuxt.config.js

  const stripe = (options) => {
    return new window.Stripe(context.$config.stripeKey, options)
  }

  inject('stripe', stripe)
}
