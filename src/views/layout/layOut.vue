<template>
  <div>
    <div class="router">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item to='/layOut/home' icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to='/layOut/mine' icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  created () {
    if (this.$route.path === '/layOut/home') {
      this.active = 0
    } else if (this.$route.path === '/layOut/mine') {
      this.active = 1
    }
  }
}
</script>
<style lang="less">
  .router{
    padding-bottom: 50px;
  }
  .van-tabbar {
  border-top: 1px solid #f8f8f8;
}
</style>
