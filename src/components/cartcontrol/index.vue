<template>
    <div class="cartcontrol">
        <span class="minus icon icon-minus" @click.stop="minus"></span>
        <span class="num">{{item.quantity}}</span>
        <span class="plus icon icon-add" @click.stop="add"></span>
    </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    add() {
      this.$emit('add')
    },
    minus() {
      this.$emit('minus')
    }
  }
}
</script>
<style lang="stylus" scoped>
    @import "../../common/stylus/variable.styl"
    .cartcontrol
        .minus,.plus,.num
            display inline-block
            vertical-align middle
        .num
            margin 0 15px
            color $black
</style>