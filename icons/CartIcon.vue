<template>
  <svg
    viewBox="0 0 20.03 19"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <title v-if="title">{{ title }}</title>
    <path
      d="M16.994,6.981 L12.971,0.025 L11.240,1.014 L14.685,6.981 L5.306,6.981 L8.752,1.026 L7.020,0.013 L2.997,6.981 C1.953,6.981 1.057,6.981 -0.002,6.981 L-0.002,8.985 L1.331,8.985 L2.997,19.002 L16.994,19.002 L18.660,8.985 L19.993,8.985 L19.993,6.981 C18.934,6.981 18.037,6.981 16.994,6.981 ZM15.300,16.999 L4.691,16.999 L3.358,8.985 C6.325,8.985 13.661,8.985 16.814,8.985 L15.300,16.999 Z"
    />
  </svg>
</template>

<script>
export default {
  name: 'CartIcon',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
