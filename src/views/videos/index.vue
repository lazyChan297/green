<template>
    <div class="videos-wrapper">
        <div class="video-container" v-for="(item, index) in videos" :key="index" :data-src="playVideo(item)" v-if="item.video">
            <video-player
                class="vjs-custom-skin"
                ref="videoPlayer"
                :options="playerOptions">
            </video-player>
            <p class="">
                <span class="desc">{{item.title}}</span>
                <div class="icon"></div>
            </p>
        </div>
    </div>
</template>
<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import '@/common/css/video-skin.css'
export default {
  data() {
    return {
      videos: [],
      playerOptions: {
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
        poster: null
      }
    }
  },
  mounted() {
    this.getVideos()
  },
  components: {
    videoPlayer
  },
  methods: {
    getVideos() {
      this.$axios.get('/discovery/videos').then(res => {
        if (res.status === 1) {
          this.videos = res.data.videos
        }
      })
    },
    playVideo(item) {
      this.playerOptions.sources[0].src = item.video
      this.playerOptions.poster = item.cover
    }
  }
}
</script>
<style lang="stylus" scoped>
    .video-container
        margin-bottom 10px
        background #fff
    .desc
        color #4a4a4a
        font-size 12px
        line-height 30px
        padding 0 15px
</style>