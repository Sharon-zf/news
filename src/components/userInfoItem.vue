<template>
  <div class="uerInfoItem">
    <div class="user">
      <div class="userImg">
        <img :src="itemInfo.photo" alt="用户头像" />
      </div>
      <div class="userInfo">
        <span class="userInfoName">{{ itemInfo.name }}</span
        ><br />
        <span class="userFansCount">粉丝数： {{ itemInfo.fans_count }} 人</span>
      </div>
    </div>
    <van-button
      class="btn"
      round
      type="primary"
      size="mini"
      style="width: 60px"
      @click="follow"
    >{{ btnText }}</van-button>
  </div>
</template>
<script>
import { Toast } from 'vant'
import { followUser, disFollowUser } from '../api/index.js'
export default {
  data () {
    return {
      btnText: ''
    }
  },
  props: {
    itemInfo: Object, // item数据
    title: String
  },
  created () {
    if (this.title === 'fans') {
      this.btnText = '关 注'
    } else {
      this.btnText = '取消关注'
    }
  },
  methods: {
    async follow () {
      if (this.btnText === '取消关注') {
        await disFollowUser({ followId: this.itemInfo.id })
        this.btnText = '关 注'
        Toast('取关成功')
      } else {
        await followUser({ followId: this.itemInfo.id })
        this.btnText = '取消关注'
        Toast('关注成功')
      }
    }
  }
}
</script>
<style lang="less">
.uerInfoItem {
  width: 100%;
  height: 75px;
  position: relative;
  .user {
    height: 100%;
    width: 70%;
    .userImg {
      display: inline-block;
      height: 70%;
      width: 52.5px;
      margin: 11.25px 18px;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .userInfo {
      display: inline-block;
      .userInfoName {
        font-size: 19px;
      }
      .userFansCount {
        font-size: 15px;
        color: #999999;
      }
    }
  }
  .btn {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 82%;
    transform: translate(-50%, -50%);
  }
}
</style>
