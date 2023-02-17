if (process.client && window && !window.crypto) {
  window.crypto = window.msCrypto
}
