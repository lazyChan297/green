<template>
    <div>
      <view-list @select="selectItem" :list="list" v-if="list.length>0"></view-list>
      <div v-else>
        <img src="../../common/images/empty.png" alt="" width="176" class="bgimg">
        <p class="desc">暂无任何订单记录～</p>
      </div>
    </div>
</template>
<script>
import ViewList from '@/components/viewList/index'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    
  },
  mounted() {
    let status = this.$route.meta.type
    this.getlist(status)
  },
  methods: {
    // 查看订单详情
    selectItem(item) {
      this.$router.push(`/orderDetail/${item.orderNo}`)
    },
    // 获取订单列表
    getlist(status) {
      status = status === undefined ? 'all' : status
      let url = '/orders/' + status
      console.log(url)
      this.$axios.get(url).then(res => {
        if (res.status === 1) {
          this.list = res.data
        } 
      })
    }
  },
  watch: {
    $route() {
        let status = this.$route.meta.type
        console.log(this.$route.meta.type,'....')
        this.getlist(status)
    }
  },
  components: {
    ViewList
  }
}
</script>
<style lang="stylus" scoped>
  .bgimg
    display block
    margin 90px auto 0
  .desc
    color #b2b2b2
    font-size 12px
    text-align center
    margin-top 10px
</style>