<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我是有底线的~~~"
        @load="onLoad"
      >
        <ArticleItem
          v-for="item in newsData"
          :key="item.art_id"
          :artObj="item"
          @noLikeItem="disLike"
          @articleBad="artBad"
          @click.native="seeMore(item)"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import ArticleItem from './articleItem.vue'
import { getArticleListAPI, articleNoLikeAPI, articleBadAPI } from '../../../api/index.js'
import { Notify } from 'vant'
export default {
  data () {
    return {
      // 文章列表数据
      newsData: [],
      // 时间戳，用于分页
      theTime: new Date().getTime(),
      loading: false, // 加载状态
      finished: false, // 是否全部加载
      isLoading: false // 刷新状态
    }
  },
  props: {
    // 当前标签的ID
    listId: Number
  },
  components: {
    ArticleItem
  },
  methods: {
    async onLoad () {
      const res2 = await getArticleListAPI({
        channel_id: this.listId,
        timestamp: this.theTime
      })
      this.newsData = [...this.newsData, ...res2.data.data.results]
      this.theTime = res2.data.data.pre_timestamp
      this.loading = false
      // 判断数据是否全部加载
      if (res2.data.data.pre_timestamp === 0) {
        this.finished = true
      }
    },
    // 刷新事件方法
    async onRefresh () {
      this.newsData = []
      this.theTime = new Date().getTime()
      const res2 = await getArticleListAPI({
        channel_id: this.listId,
        timestamp: this.theTime
      })
      this.newsData = [...this.newsData, ...res2.data.data.results]
      this.theTime = res2.data.data.pre_timestamp
      this.isLoading = false
    },
    // 用户反馈“不感兴趣”提交数据
    async disLike (id) {
      try {
        await articleNoLikeAPI({
          artId: id
        })
        Notify({ type: 'success', message: '反馈成功' })
      } catch (err) {
        Notify({ type: 'danger', message: '反馈错误，请稍后再试' })
      }
      // 反馈不敢兴趣后删除该文章
      this.newsData = this.newsData.filter((item) => {
        return item.art_id !== id
      })
      // 当页面中文章被用户删除至7篇文章时加载新文章
      if (this.newsData.length <= 7) {
        this.onLoad()
      }
    },
    // 用户反馈“举报”提交举报信息
    async artBad (artId, type) {
      try {
        await articleBadAPI({ artId: artId, value: type })
        Notify({ type: 'success', message: '举报成功' })
      } catch (err) {
        Notify({ type: 'danger', message: '举报错误，请稍后再试' })
      }
    },
    // 显示文章详情函数
    seeMore (item) {
      this.$router.push(`/articleDetails?aid=${item.art_id}`)
    }
  }
}
</script>
