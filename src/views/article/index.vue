<template>
    <div class="article-wrapper">
        <p class="title">{{article.title}}</p>
        <p class="desc">{{article.publishedAt}}</p>
        <div v-html="article.content"></div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      article:{}
    }
  },
  mounted() {
    this.getArticle()
  },
  methods: {
    getArticle() {
      this.$axios.get('/news/details', {params: {id: this.$route.params.id}}).then(res => {
        if (res.status === 1) {
          this.article = res.data
        }
      })    
    }
  }
}
</script>
<style lang="stylus" scoped>
    .article-wrapper
        background #fff
        padding 9px 30px
        .title
            color #030303
            font-size 16px
            font-weight bold
            margin-bottom 5px
            line-height 22px
        .desc
            color #b2b2b2
            font-size 10px
            margin-bottom 15px
</style>