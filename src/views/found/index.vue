<template>
    <div class="found-wrapper">
        <div class="found-container">
          <section>
            <p class="title-container">
              <span class="title">视频</span>
              <router-link class="more" to="/videos" tag="span">查看更多</router-link></p>
            <div>
              <div class="video" v-for="(item, index) in videos" :key="index" :data-src="playVideo(item)" v-if="index<2 && item.video">
                <!-- <img :src="item.cover" alt="" v-if="!playerOptions.sources[0].src"> -->
                <video-player
                  class="vjs-custom-skin"
                  ref="videoPlayer"
                  :options="playerOptions">
                </video-player>
                <p class="desc">{{item.title}}</p>
              </div>             
            </div>
          </section>
          <section>
            <p class="title">文章</p>
            <ul>
              <router-link tag="li" class="article" v-for="(item,index) in articles" :key="index" :to="{path: `/article/${item.id}`}">
                <div>
                  <p class="articleTitle">{{item.title}}</p>
                  <p class="date">2019年 01月09日 12:00</p>
                </div>
                <img :src="item.cover" alt="" width="80">
              </router-link>
            </ul>
          </section>
        </div>

        <footer-nav></footer-nav>
    </div>
</template>
<script>
import FooterNav from '@/components/FooterNav/index'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import '@/common/css/video-skin.css'
export default {
  data() {
    return {
      videos: [],
      articles: [],
      isPlay: false,
      playerOptions: {
        // videojs options
        muted: false,
        x5VideoPlayerFullscreen: true,
        language: 'en',
        playbackRates: [1.0, 2.0],
        width: '1080',
        height: '720',
        usingNativeControls: false,
        nativeControlsForTouch: false,
        preload: 'auto',
        aspectRatio:"16:9",
        sources: [{
          type: "video/mp4",
          src: null
        }],
        poster: null,
      }
    }
  },
  mounted() {
    this.getVideo()
    this.getArticles()
  },
  computed: {
    player() {
      console.log(this.$refs.videoPlayer.player)
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    getVideo() {
      this.$axios.get('/discovery/videos').then((res) => {
        if (res.status === 1) {
          this.videos = res.data.videos
        }
      })
    },
    getArticles() {
      this.$axios.get('/discovery/news').then((res) => {
        if (res.status === 1) {
          this.articles = res.data.news
        }
      })
    },
    // 播放视频
    playVideo(item) {
      this.playerOptions.sources[0].src = item.video
      this.playerOptions.poster = item.cover
    }
  },
  components: {
    FooterNav,
    videoPlayer
  }
}
</script>
<style lang="stylus" scoped>
  @import "../../common/stylus/variable.styl"
  .video-container
    position fixed
    width 100%
    z-index 1
    .video-player
      top 50%
      position absolute
      left 0
      width 100%
      transform translateY(-100%)
  section
    padding 0 15px
    &>div
      display flex
      .video
        flex 1
        border-radius 8px
        color #4a4a4a
        font-size 12px
        &:first-child
          margin-right 10px
        .desc
          margin-top 5px
      img
        width 100%
        border-radius 8px
    .article
      display flex
      background #fff
      height 80px
      border-radius 8px
      margin-bottom 10px
      img
        border-top-right-radius 8px
        border-bottom-right-radius 8px
      &>div
        flex 1
        color #4a4a4a
        padding 10px
      .articleTitle
        font-size 14px
        display -webkit-box
        -webkit-line-clamp 2
        overflow hidden
        white-space normal
        -webkit-box-orient vertical
        line-height 17px
        height 34px
        margin-bottom 12px
      .date
        font-size 10px
  .title-container
    display flex
    justify-content space-between
    align-items center
  .title
    color $black
    font-weight bold
    font-size 15px
    line-height 40px
  .more
    color #b2b2b2
    font-size 12px
</style>