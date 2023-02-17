<template>
  <div :class="[$style.tab, { [$style.tabActive]: active }]" @click="toggle">
    <h3 :class="$style.title">
      {{ title }}
      <MinusIcon v-if="active" :class="$style.titleSvg" />
      <PlusIcon v-else :class="$style.titleSvg" />
    </h3>
    <template v-if="active">
      <div v-if="$slots.default" :class="$style.body">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script>
import MinusIcon from '@/icons/MinusIcon'
import PlusIcon from '@/icons/PlusIcon'

export default {
  name: 'CategoryWidgetTab',
  components: {
    MinusIcon,
    PlusIcon
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      active: false
    }
  },
  methods: {
    close() {
      this.active = false
    },
    open() {
      if (this.$parent.close) {
        this.$parent.close()
      }

      this.active = true
    },
    toggle() {
      if (this.active) {
        this.close()
      } else {
        this.open()
      }
    }
  }
}
</script>

<style lang="scss" module>
.title {
  $title-font-size: rem-calc(15px);
  $title-line-height: 1.2;
  border-bottom: 2px solid #e3e3e3;
  color: $gray-600;
  cursor: pointer;
  font-size: $title-font-size;
  line-height: $title-line-height;
  margin: 0;
  padding: rem-calc(24px 0);
  position: relative;
  user-select: none;

  .tab:first-child & {
    padding-top: 0;
  }

  .tab--active & {
    border-color: $body-color;
    color: $body-color;
  }

  &__svg {
    fill: currentColor;
    height: rem-calc(12px);
    margin-top: $title-font-size * $title-line-height / 2;
    position: absolute;
    right: 0;
    top: rem-calc(24px);
    transform: translateY(-50%);
    width: rem-calc(12px);

    .tab:first-child & {
      top: 0;
    }
  }
}

.body {
  border-bottom: 2px solid #e3e3e3;
  padding: rem-calc(28px 0 22px);
}
</style>
