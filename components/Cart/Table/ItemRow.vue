<template>
  <div v-frag>
    <tr>
      <td>
        <div :class="$style.el">
          <div :class="$style.thumb"></div>

          <TruncatText
            :class="$style.title"
            :text="product.title"
            tag="strong"
          />
        </div>
      </td>
      <td>
        <QuantityField :item="item" @input="updateQuantity" />
      </td>
      <td>{{ item.singleGrossPrice.formatted }}*</td>
      <td>
        <strong>{{ item.totalGrossPrice.formatted }}*</strong>
      </td>
      <td class="text-right">
        <TheButton :class="$style.btn" @click="deleteItem(item.id)">
          <TrashIcon />
        </TheButton>
      </td>
    </tr>
  </div>
</template>

<script>
import cartMixin from '@/components/Cart/cartMixin'
// import VolvButton from '@/components/Forms/Button'
import TrashIcon from '@/icons/TrashIcon'
import TruncatText from '@/components/Common/Truncat'
import frag from 'vue-frag'
import TheButton from '@/components/Forms/TheButton'
import QuantityField from '~/components/Cart/QuantityField'
export default {
  name: 'CartItemRow',
  components: {
    TheButton,
    TruncatText,
    QuantityField,
    // VolvButton,
    TrashIcon
  },
  directives: { frag },
  mixins: [cartMixin],

  computed: {
    itemId() {
      return this.item.id
    },

    product() {
      return this.item.product
    }
  }
}
</script>

<style lang="scss" module>
.el {
  align-items: center;
  display: flex;
}

.thumb {
  background-color: #f1f1ef;
  border-radius: rem-calc(4px);
  display: inline-block;
  flex-shrink: 0;
  height: rem-calc(38px);
  margin-right: rem-calc(22px);
  overflow: hidden;
  position: relative;
  width: rem-calc(38px);
}

.title {
  color: $black;
}

.btn {
  color: $body-color;
  padding: rem-calc(4px);

  svg {
    height: rem-calc(18px);
    width: rem-calc(18px);
  }

  &:global(.btn-outline-dark) {
    border-color: transparent;
  }
}
</style>
