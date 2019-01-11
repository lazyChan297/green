<template>
    <div class="index-wrapper">
        <div class="index-container">
          <section>
            <p class="title">绿色资产</p>
            <router-link class="green-asstes" :to="{path:`/goods/${assets.id}`}">
              <img :src="assets.img" alt="" width="100" height="100">
              <div>
                <p class="title">{{assets.name}}</p>
                <div class="sold">
                  <span class="price">¥{{assets.price}}</span>
                  <span class="icon icon-redcart"></span>
                </div>
              </div>
            </router-link>
          </section>
          <section>
              <p class="title">一县一品</p>
              <ul class="greenGoods">
                <router-link class="goods" :to="{path:`/goods/${item.id}`}" v-for="(item,index) in goods" :key="index">
                  <img :src="item.img" alt="">
                  <div>
                    <p class="title">{{item.name}}</p>
                    <div class="sold">
                        <span class="price">¥{{item.price}}</span>
                        <span class="icon icon-redcart"></span>
                      </div>
                  </div>
                </router-link>
              </ul>
          </section>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>
<script>
import FooterNav from '@/components/FooterNav/index'
export default {
  data() {
    return {
      assets: {},
      goods: []
    }
  },
  mounted() {
      this.getIndex()
  },
  methods: {
    getIndex() {
      this.$axios.get('/index').then((res) => {
        if (res.status === 1) {
          let goods = res.data.goods, ret = []
          goods.forEach((item, index) => {
            if (item.type == 1) {
              this.assets = item
            } else {
              ret.push(item)
            }
          })
          this.goods = ret
          console.log(this.goods)
          console.log(this.assets)
        }
      })
    }
  },
  components: {
    FooterNav
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/variable.styl"
  .index-wrapper
    background $bgcolor
    .index-container
      padding-bottom 50px
      .title
        color $black
        font-weight bold
        font-size 14px
        line-height 40px
      section
        padding 0 15px
      .green-asstes
        display flex
        background #fff
        border-radius 8px

        &>img
          border-top-left-radius 8px
          border-bottom-left-radius 8px
        &>div
          padding-top 10px
          margin-left 10px
          padding-right 10px
          flex 1
          .title
            min-height 58px
            line-height 16px
      .greenGoods
        overflow hidden
       .goods
        float left
        width 48%
        background #fff
        padding-bottom 5px
        border-radius 8px
        margin-bottom 10px
        &:nth-child(odd)
          margin-right 10px
        &>img
          width 100%
          border-top-right-radius 8px
          border-top-left-radius 8px
        .title
          line-height 20px
          margin 5px 0 10px
        &>div
          padding 0 5px
      .price
        color $green
        font-size 16px
        font-weight bold
      .sold
        display flex
        justify-content space-between
</style>