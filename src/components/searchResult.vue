<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        fixed
      />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="item in result"
          :key="item.art_id"
          :artObj="item"
          :isShow="false"
          @click.native="seeMore(item)"
        ></ArticleItem>
      </van-list>
    </div>
  </div>
</template>

<script>
import { searchResultAPI } from '../api/index.js'
import ArticleItem from '../views/home/components/articleItem.vue'
export default {
  name: 'SearchResult',
  data () {
    return {
      page: 1, // 页数
      result: [],
      loading: false,
      finished: false
    }
  },
  created () {
    this.getData()
  },
  components: {
    ArticleItem
  },
  methods: {
    onLoad () {
      if (this.result.length > 0) {
        this.loading = true
        this.page++
        this.getData()
      }
    },
    async getData () {
      const res = await searchResultAPI({
        page: this.page,
        q: this.$route.params.keywords // 路由中的数据
      })
      if (res.data.data.results.length === 0) {
        this.finished = true
        return
      }
      this.result = [...this.result, ...res.data.data.results]
      this.loading = false
      // console.log(this.result)
    },
    // 显示文章详情函数
    seeMore (item) {
      this.$router.push(`/articleDetails?aid=${item.art_id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
