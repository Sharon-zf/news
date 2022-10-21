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
        finished-text="我是有底线的 ~ ~"
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
      this.getStarData()
    } else {
      if (this.key === 'history') {
        this.getHistorData()
      }
    }
  },
  components: {
    ArticleItem
  },
  methods: {
    async onLoad () {
      if (this.list.length > 0) {
        this.loading = true
        this.page++
      }
      if (this.key === 'star') {
        console.log(this.key)
        this.getStarData()
        this.title = '我的收藏'
      } else {
        if (this.key === 'history') {
          console.log(this.key)
          this.getHistorData()
          this.title = '浏览历史'
        }
      }
    },
    async getStarData () {
      const res = await userStarArtListAPI({ page: this.page, per_page: 10 })
      this.list = res.data.data.results
      console.log(this.list)
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
      console.log(this.list)
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
