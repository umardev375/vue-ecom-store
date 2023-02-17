export default function theme({ store }, inject) {
  const defaultTheme = {
    bgPrimary: 'black',
    textPrimary: 'white',
    bgInverse: 'white',
    textInverse: 'black'
  }
  inject('theme', defaultTheme)
}
