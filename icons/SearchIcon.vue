<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <title>{{ title }}</title>
    <path
      fill-rule="evenodd"
      fill="rgb(24, 35, 76)"
      d="M8.006,0.011 C3.589,0.011 0.009,3.591 0.009,8.009 C0.009,12.427 3.589,16.008 8.006,16.008 C12.422,16.008 16.002,12.427 16.002,8.009 C16.002,3.591 12.422,0.011 8.006,0.011 ZM8.006,14.008 C4.699,14.008 2.008,11.317 2.008,8.009 C2.008,4.701 4.699,2.010 8.006,2.010 C11.312,2.010 14.003,4.701 14.003,8.009 C14.003,11.317 11.312,14.008 8.006,14.008 ZM20.000,18.593 L18.587,20.007 L14.346,15.765 L15.760,14.351 L20.000,18.593 Z"
    />
  </svg>
</template>

<script>
export default {
  name: 'SearchIcon',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
