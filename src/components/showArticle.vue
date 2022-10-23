<template>
  <div>
    <!-- 观看历史/我的作品/我的收藏 页 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
      <!-- 文章列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="list.length === 0 ? ' ' : '我是有底线的 ~ ~'"
        @load="onLoad"
      >
      <ArticleItem
      v-for="item in list"
      :key="item.art_id"
      :artObj="item"
      :isShowIcon="false"
      @click.native="seeMore(item)"
      ></ArticleItem>
      </van-list>
    </div>
    <van-empty v-if="list.length === 0" description="暂无更多内容 ~ ~" />
  </div>
</template>

<script>
import { userStarArtListAPI, userHistorArtListAPI } from '../api/index.js'
import ArticleItem from '../views/home/components/articleItem.vue'

export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      key: this.$route.params.key, // 路由中的key以此判断需要显示什么列表
      title: '' // 标题
    }
  },
  created () {
    if (this.key === 'star') {
      this.title = '我的收藏'
      this.getStarData()
    } else {
      if (this.key === 'history') {
        this.title = '浏览历史'
        this.getHistorData()
      }
    }
  },
  components: {
    ArticleItem
  },
  methods: {
    async onLoad () {
      if (this.list.length >= 10) {
        this.loading = true
        this.page++
        if (this.key === 'star') {
          this.getStarData()
        } else {
          if (this.key === 'history') {
            this.getHistorData()
          }
        }
      }
    },
    // async getData () {
    //   if (this.key === 'star') {
    //     this.title = '我的收藏'
    //     const res = await userStarArtListAPI({ page: this.page, per_page: 10 })
    //   } else {
    //     if (this.key === 'history') {
    //       this.title = '浏览历史'
    //       const res = await userHistorArtListAPI({ page: this.page, per_page: 10 })
    //     }
    //   }
    //   this.list = res.data.data.results
    //   if (res.data.data.results) {
    //     this.finished = true
    //     return
    //   }
    //   this.list = [...this.list, ...res.data.data.results]
    //   this.loading = false
    // },
    async getStarData () {
      const res = await userStarArtListAPI({ page: this.page, per_page: 10 })
      this.list = res.data.data.results
      if (res.data.data.results) {
        this.finished = true
        return
      }
      this.list = [...this.list, ...res.data.data.results]
      this.loading = false
    },
    async getHistorData () {
      const res = await userHistorArtListAPI({ page: this.page, per_page: 10 })
      this.list = res.data.data.results
      if (res.data.data.results) {
        this.finished = true
        return
      }
      this.list = [...this.list, ...res.data.data.results]
      this.loading = false
    },
    // 显示文章详情函数
    seeMore (item) {
      this.$router.push(`/articleDetails?aid=${item.art_id}`)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
