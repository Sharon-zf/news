<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 文章信息区域 -->
    <div id="content" class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ detail.title }}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="detail.aut_name" :label="detail.pubdate">
        <template #icon>
          <img :src="detail.aut_photo" alt="" class="avatar" />
        </template>
        <template #default>
          <div>
            <van-button
              type="info"
              size="mini"
              v-if="detail.is_followed"
              @click="follow"
              >已关注</van-button
            >
            <van-button
              icon="plus"
              type="info"
              size="mini"
              plain
              v-else
              @click="follow"
              >关注</van-button
            >
          </div>
        </template>
      </van-cell>
      <!-- 分割线 -->
      <van-divider></van-divider>
      <!-- 文章内容 -->
      <div class="art-content" v-html="detail.content"></div>
      <!-- 分割线 -->
      <van-divider>End</van-divider>
      <!-- 点赞 -->
      <div class="like-box">
        <van-button
          icon="good-job"
          type="danger"
          size="small"
          v-if="detail.attitude === 1"
          @click="attitude"
          >已点赞</van-button
        >
        <van-button
          icon="good-job-o"
          type="danger"
          plain
          size="small"
          v-else
          @click="attitude"
          >点赞</van-button
        >
      </div>
    </div>
    <ArticleComment :divHeigth="divHeigth"></ArticleComment>
  </div>
</template>

<script>
import {
  articleDetailAPI,
  disFollowUser,
  followUser,
  startArticle,
  disStartArticle
} from '../../api/index.js'
import ArticleComment from './articleComment.vue'
export default {
  data () {
    return {
      detail: Object,
      divHeigth: 0
    }
  },
  async created () {
    const res = await articleDetailAPI({ article_id: this.$route.query.aid })
    this.detail = res.data.data
    // console.log(this.detail)
  },
  methods: {
    // 点击关注事件
    async follow () {
      if (this.detail.is_followed === true) {
        await disFollowUser({ followId: this.detail.aut_id })
        this.detail.is_followed = !this.detail.is_followed
        // console.log('取消关注了')
      } else {
        await followUser({ followId: this.detail.aut_id })
        this.detail.is_followed = !this.detail.is_followed
        // console.log('关注了')
      }
    },
    // 点击点赞事件
    async attitude () {
      if (this.detail.attitude === 1) {
        await disStartArticle({ target: this.detail.art_id })
        this.detail.attitude = -1
        // console.log('取消点赞了')
      } else {
        await startArticle({ target: this.detail.art_id })
        this.detail.attitude = 1
        // console.log('点赞了')
      }
    }
  },
  components: {
    ArticleComment
  },
  updated () {
    const divContent = document.getElementById('content')
    this.divHeigth = divContent.getBoundingClientRect().height
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  img {
    width: 100%;
  }
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>
