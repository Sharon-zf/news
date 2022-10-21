<template>
  <div class="user-container">
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <!-- 用户头像、姓名 -->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <img :src="userInfo.photo" alt="" class="avatar" />
        </template>
        <template #title>
          <span class="username">{{ userInfo.name }}</span>
        </template>
        <template #label>
          <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
        </template>
      </van-cell>
      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>{{ userInfo.art_count }}</span>
          <span>动态</span>
        </div>
        <div class="user-data-item">
          <span>{{ userInfo.like_count }}</span>
          <span>关注</span>
        </div>
        <div class="user-data-item">
          <span>{{ userInfo.follow_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="user-data-item">
          <span>{{ userInfo.like_count }}</span>
          <span>被赞</span>
        </div>
      </div>
    </div>

    <!-- 操作面板 -->
    <van-cell-group class="action-card">
      <van-cell icon="edit" title="编辑资料" is-link to="/userInfo" />
      <van-cell icon="star-o" title="我的收藏" is-link @click="starList('star')" />
      <van-cell icon="clock-o" title="浏览历史" is-link @click="historyList('history')" />
      <van-cell icon="newspaper-o" title="我的作品" is-link />
      <van-cell icon="chat-o" title="小思同学" is-link to="/chatWindow" />
    </van-cell-group>
    <van-button  @click="outLogin" class="outButton" style="width: 150px" round plain type="info"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { userInfoAPI } from '../../api/index.js'
import { Dialog } from 'vant'
import { removeToken } from '../../utils/token.js'
export default {
  data () {
    return {
      userInfo: Object
    }
  },
  async created () {
    const res = await userInfoAPI()
    this.userInfo = res.data.data
    // console.log(this.userInfo)
  },
  methods: {
    // 退出登录函数
    outLogin () {
      Dialog.confirm({
        title: '退出登录',
        message: '这就走了？没爱了？'
      })
        .then(() => {
          removeToken()
          this.$router.replace('/login')
          localStorage.removeItem('heheUserName')
          localStorage.removeItem('heheUserImag')
        })
        .catch(() => {
          // on cancel
        })
    },
    starList (key) {
      this.$router.push({
        path: `/showart/${key}`
      }
      )
    },
    historyList (key) {
      this.$router.push({
        path: `/showart/${key}`
      }
      )
    }
  }
}
</script>

<style scoped lang="less">
.user-container {
  position: relative;
  .user-card {
    background-color: #007bff;
    color: white;
    padding-top: 20px;
    .van-cell {
      background: #007bff;
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
      }
      .username {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    padding: 30px 0;
    .user-data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
    }
  }
  .outButton {
    position: absolute;
    left: 50%;
    transform: translate(-50% , 0);
    margin-top: 99px;
  }
}
</style>
