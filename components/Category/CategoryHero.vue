<template>
  <section :class="[$style.section, { [$style.sectionRight]: right }]">
    <ImageObject v-if="image" :image="{ src: image }" fill />
    <div :class="$style.content">
      <h2 :class="$style.title">
        {{ title }}
      </h2>
      <p :class="$style.text">
        <slot></slot>
      </p>
      <NuxtLink
        v-if="categorySlug"
        :to="
          localePath({
            name: 'collection-category',
            params: {
              category: categorySlug
            }
          })
        "
        :class="['btn btn-dark', $style.btn]"
      >
        {{ title }} {{ $t('ansehen') }}
      </NuxtLink>
    </div>
  </section>
</template>

<script>
import ImageObject from '@/components/ImageObject'
// :url="{ name: 'collection', params: { category: randomCategory.slug } }"
export default {
  name: 'CategoryHero',
  components: { ImageObject },
  props: {
    categorySlug: {
      type: String,
      required: true
    },

    image: {
      type: String,
      default: null
    },
    title: {
      type: String,
      required: true
    },
    right: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" module>
.section {
  background-color: #e2e2e2;
  margin-bottom: $grid-gutter-width;
  padding: wrap-calc(90px);
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
}

.content {
  position: relative;

  .section--right & {
    text-align: right;
  }
}

.title {
  font-size: rem-calc(40px);
  line-height: 1.2;
  margin: rem-calc(0 0 12px);
}

.text {
  color: $gray-600;
  line-height: (24 / 16);
  margin-bottom: rem-calc(30px);
  max-width: rem-calc(330px);

  .section--right & {
    margin-left: auto;
  }
}

.btn {
  max-width: 100%;
  min-width: fit-content;
  width: rem-calc(265px);
}
</style>
