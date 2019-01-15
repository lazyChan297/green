<template lang="html">
        <div class="delivery-wrapper">
          <div class="cell">
            <div>
              快递公司
            </div>
            <div>
              {{express.company}}
            </div>
          </div>
          <div class="cell">
            <div>
              物流单号
            </div>
            <div>
              {{express.no}}
            </div>
          </div>
          <div class="progress mt10">
            <ul class="list">
              <li class="item" :class="{'current':index===0}" v-for="(item,index) in express.details" :key="index">
                <div class="icon" :class="index===0?'icon-express':'icon-node'"></div>
                <div class="txt">
                  <p class="location">{{item.context}}</p>
                  <p class="time">{{item.time}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </template>
      
      <script>
      export default {
        data() {
          return {
            express: null
          }
        },
        mounted() {
          if (!this.$route.params.no) {
            return
          }
          this.getExpress()
        },
        methods: {
          getExpress() {
            this.$axios.get('/orders/express', {params: {
              no: this.$route.params.no
            }}).then(res => {
              if (res.status === 1) {
                this.express = res.data.express
              }
            })
          }
        }
      }
      </script>
      
      <style lang="stylus">
        @import "../../common/stylus/variable"
        .delivery-wrapper
          padding-top 10px
          .layout-tow-columns
            border:none
            font-size:16px
            .column-right
              color: pink
          .cell
            display flex
            justify-content space-between
            padding 0 10px
            margin 0 15px 
            font-size 14px
            background #fff
            line-height 45px
            &:first-child
              border-top-left-radius 8px
              border-top-right-radius 8px
            &:nth-child(2)
              border-bottom-left-radius 8px
              border-bottom-right-radius 8px
            div
              &:first-child
                color #4a4a4a
              &:last-child
                color $green
          .list
            padding: 10px 15px
            background:#fff
            margin 10px 15px 0
            border-radius 8px
            .item
              position relative
              display flex
              align-items center
              text-align left
              font-size 14px
              padding-top 10px
              &.current
                .location
                  color $green
              &:first-child
                &:after
                  content ''
                  display block
                  position absolute
                  width 1px
                  left 13px
                  top 39px
                  height 31px
                  background #e8e8e8
              &:after
                  content ''
                  display block
                  position absolute
                  width 1px
                  left 13px
                  top 31px
                  height 31px
                  background #e8e8e8
              &:last-child
                &:after
                  content ''
                  display none
              .txt
                width 224px
              .time
                color: #b2b2b2
                margin-top:5px
                font-size:12px
              .location
                font-size 14px
                display -webkit-box
                -webkit-box-orient vertical
                overflow hidden
                text-overflow ellipsis
                white-space normal
                width 70%
                -webkit-line-clamp 1
                height 14px
      </style>
      