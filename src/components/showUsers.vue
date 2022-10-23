<template>
  <div>
    <div class="body">
      <van-nav-bar :title="title" left-arrow @click-left="$router.go(-1)" />
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="list.length === 0 ? ' ' : '我是有底线的 ~ ~'"
        @load="onLoad"
      >
      <UserInfoItem
        v-for="item in list"
        :key="item.id"
        :itemInfo="item"
        :title="key"
      ></UserInfoItem>
      </van-list>
    </div>
    <van-empty v-if="list.length === 0" description="暂无更多内容 ~ ~" />
  </div>
</template>
<script>
import UserInfoItem from './userInfoItem.vue'
import { getUserFollowListAPI, getUserFansListAPI } from '../api/index.js'
export default {
  data () {
    return {
      title: '',
      loading: false,
      finished: false,
      key: this.$route.params.key, // 路由中的key以此判断显示粉丝还是关注列表
      list: [],
      page: 1
    }
  },
  components: {
    UserInfoItem
  },
  created () {
    if (this.key === 'fans') {
      this.title = '我的粉丝'
      this.getData()
    } else {
      this.title = '我的关注'
      this.getData()
    }
  },
  methods: {
    async getData () {
      let res = []
      if (this.key === 'fans') {
        res = await getUserFansListAPI({ page: this.page, per_page: 1 })
        // console.log(res + '粉丝')
      } else {
        res = await getUserFollowListAPI({ page: this.page, per_page: 10 })
        // console.log(res + '关注')
      }
      this.list = [...this.list, ...res.data.data.results]
    },
    onLoad () {
      if (this.list.length >= 10) {
        this.loading = true
        this.page++
        this.getData()
        this.loading = false
      }
      this.finished = true
    }
  }
}
</script>
<style lang="less">
</style>
