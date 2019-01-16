<template>
    <div class="listView-wrapper">
        <div class="orderItem" @click="selectItem(item)" v-for="(item,index) in list">
            <div class="status">
                <span>状态</span>
                <span>{{getStatus(item.status)}}</span>
            </div>
            <div class="goods" v-for="(goods,gindex) in item.goods">
                <img :src="goods.img" alt="" width="60" height="60px">
                <div>
                    <p class="name">{{goods.name}}</p>
                    <p>
                        <span class="price">¥{{goods.price}}</span>
                        <span class="num">x{{goods.quantity}}</span>
                    </p>
                </div>
            </div>
            <div class="group" v-if="item.status === 3">
                <button class="gray">查看物流</button>
                <button class="green">确认收货</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    list: {
        type: Array
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    getStatus(s) {
      if(s == 1) {
        return '已完成'
      } else if(s== 2) {
        return '待发货'
      } else if (s == 3) {
        return '待收货'
      } else {
        return '待评价'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
    @import "../../common/stylus/variable.styl"
    .listView-wrapper
        background #f7f7f7
        padding-bottom 10px
      .orderItem
        background #fff
        margin 0 15px 10px
        border-radius 8px
        &:first-child
            margin-top 10px
        .status
            display flex
            justify-content space-between
            height 40px
            font-size 14px
            line-height 40px
            padding 0 10px
            span:last-child
                color $green
    .goods
        display flex
        padding 10px
        &>div
            flex 1
            margin-left 10px
            p
                display flex
                justify-content space-between
        .name
            color $black
            font-size 14px
            margin-bottom 20px
        .price,.num
            color #b2b2b2
            font-size 14px
    .group
        text-align right
        padding-bottom 6px
        padding-right 15px
        height 40px
        box-sizing border-box
        .green,.gray
            border-radius 20px
            background #fff
            font-size 14px
            margin 6px 0
        .green
            border 1px solid $green
            color $green
        .gray
            border 1px solid #b2b2b2
            color #b2b2b2
</style>