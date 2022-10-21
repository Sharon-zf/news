<template>
  <div>
    <!-- 评论列表 -->
    <div class="cmt-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 评论的 Item 项 -->
        <div class="cmt-item" v-for="item in comments" :key="item.comm_id">
          <!-- 头部区域 -->
          <div class="cmt-header">
            <!-- 头部左侧 -->
            <div class="cmt-header-left">
              <img :src="item.aut_photo" alt="" class="avatar" />
              <span class="uname">{{ item.aut_name }}</span>
            </div>
            <!-- 头部右侧 -->
            <div class="cmt-header-right">
              <van-icon
                @click="like(item)"
                v-if="item.is_liking"
                name="like"
                size="16"
                color="red"
              />
              <van-icon
                @click="like(item)"
                v-else
                name="like-o"
                size="16"
                color="gray"
              />
            </div>
          </div>
          <!-- 主体区域 -->
          <div class="cmt-body">{{ item.content }}</div>
          <!-- 尾部区域 -->
          <div class="cmt-footer">{{ item.pubdate }}</div>
        </div>
      </van-list>
    </div>
    <!-- 底部添加评论区域 - 1 -->
    <div class="add-cmt-box van-hairline--top" v-if="show">
      <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
      <div class="ipt-cmt-div" @click="change">发表评论</div>
      <div class="icon-box">
        <van-badge
          id="badge"
          :content="commentCount === 0 ? '' : commentCount"
          max="99"
        >
          <van-icon @click="move()" name="comment-o" size="0.53333334rem" />
        </van-badge>
        <van-icon @click="star" :color="start ? '#ffdf00' : '#000000'" :name="start ? 'star' : 'star-o'" size="0.53333334rem" />
        <van-icon name="share-o" size="0.53333334rem" />
      </div>
    </div>
    <!-- 底部添加评论区域 - 2 -->
    <div class="cmt-box van-hairline--top" v-else>
      <textarea
        v-model="textContent"
        v-focus
        placeholder="友善评论、理性发言、阳光心灵"
        @blur="blur"
      ></textarea>
      <van-button
        type="default"
        :disabled="this.textContent.length ? false : true"
        @click="sentOut()"
        >发布</van-button
      >
    </div>
  </div>
</template>

<script>
import {
  getComment,
  disStartComment,
  startComment,
  sentOutComment,
  postStartArticleAPI,
  disStartArticleAPI
} from '../../api/index.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      comments: [], // 评论数据
      show: true,
      commentCount: 0, // 评论数量
      textContent: '', // 评论内容
      page: null, // 获取评论页数
      loading: false,
      finished: false,
      keyNum: true,
      start: this.isStart
    }
  },
  props: {
    divHeigth: Number,
    isStart: {
      type: Boolean,
      default: false
    }, // 是否收藏
    artId: String
  },
  async created () {
    const res = await getComment({
      artId: this.$route.query.aid,
      offset: this.page
    })
    this.comments = res.data.data.results
    this.commentCount += res.data.data.total_count
    this.page = res.data.data.last_id // 下一页的id
    // console.log(res)
    // console.log(this.comments)
  },
  methods: {
    async like (item) {
      if (item.is_liking === true) {
        // 取消点赞
        try {
          await disStartComment({ target: item.com_id })
        } catch (error) {
        }
        // console.log('取消')
        item.is_liking = false
      } else {
        try {
          await startComment({ target: item.com_id })
        } catch (error) {
        }
        item.is_liking = true
        // console.log('点赞')
      }
    },
    change () {
      this.show = !this.show
    },
    // 页面滑动到评论区域
    move () {
      // console.log(this.divHeigth)
      window.scrollTo(0, this.divHeigth)
    },
    // 发送评论事件
    async sentOut () {
      await sentOutComment({
        id: this.$route.query.aid,
        content: this.textContent
      })
      // 创建一个假评论数据
      this.comments.unshift({
        com_id: Math.floor(Math.random() * 100000),
        content: this.textContent,
        aut_photo: localStorage.getItem('heheUserImag'),
        aut_name: localStorage.getItem('heheUserName'),
        pubdate: this.timestampToTime(Date.parse(new Date())),
        like_count: 0,
        is_liking: false
      })
      this.commentCount++ // 评论数加一
    },
    // 失去焦点事件
    blur () {
      setTimeout(() => {
        this.show = true
      }, 0)
    },
    async onLoad () {
      // 页面刚刷新时评论数量为零且文章未渲染导致触发onload函数从而导致请求两次第一页数据
      if (this.comments.length === 0) {
        this.finished = true
        return
      }
      const res = await getComment({
        artId: this.$route.query.aid,
        offset: this.page
      })
      if (res.data.data.results.length === 0) {
        this.finished = true
        return
      }
      this.comments = [...this.comments, ...res.data.data.results]
      this.commentCount += res.data.data.total_count
      this.page = res.data.data.last_id // 下一页的id
      this.loading = false
    },
    // 时间处理函数
    timestampToTime (timestamp) {
      const date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = date.getFullYear() + '-'
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + M + D + h + m + s
    },
    // (取消)收藏功能
    async star () {
      if (this.start === false) {
        this.start = !this.start
        const res = await postStartArticleAPI({ target: this.artId })
        if (res.status === 201) {
          Toast('收藏成功')
        }
        console.log(res)
      } else {
        this.start = !this.start
        const res = await disStartArticleAPI({ target: this.artId })
        if (res.status === 204) {
          Toast('已取消收藏')
        }
        console.log(res)
      }
    }
  }
}
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px 10px 35px 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}
/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
