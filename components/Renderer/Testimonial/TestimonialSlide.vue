<template>
  <div class="testimonial">
    <div
      v-if="testimonial.description || testimonial.fullName"
      class="testimonial__content testimonial__content--center testimonial__content--backdrop"
    >
      <img
        class="testimonial__content--image"
        :src="testimonial.image.originalUrl"
        alt="image"
      />
      <h1 v-if="testimonial.fullName" class="testimonial__content--name">
        {{ testimonial.fullName }}
      </h1>
      <h2 v-if="testimonial.title" class="testimonial__content--title">
        {{ testimonial.title }}
      </h2>
      <p
        v-if="testimonial.description"
        class="testimonial__content--description mb-8"
      >
        {{ testimonial.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestimonialSlide',
  props: {
    testimonial: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.testimonial {
  padding: rem-calc(20px);
  color: $black;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-content: center;
  &__content {
    &--center {
      z-index: 20;
      text-align: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: rem-calc(60px);
      right: rem-calc(60px);
    }
    &--backdrop {
      padding: rem-calc(20px);
    }
    &--image {
      width: 150px;
      border-radius: 50%;
    }
    &--name {
      margin-top: 10px;
    }
    &--title {
      color: var(--theme-success-color);
    }
    &--description {
      font-size: 1.2em;
      font-style: italic;
      line-height: 2em;
      @media all and (max-width: 990px) {
        font-size: 1em;
        line-height: 1.5em;
      }
      @media all and (max-width: 680px) {
        font-size: 1em;
        line-height: 1.5em;
      }
    }
  }
}
</style>
