<template>
  <div>
    <!-- 头部导航 -->
    <div>
      <van-nav-bar fixed>
        <template #left>
          <p class="little">呵呵快讯</p>
        </template>
        <template #right>
          <van-icon size="0.666rem" name="search" color="#ffffff" @click="search" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 标签栏 -->
    <div class="tabs">
      <van-tabs
        v-model="active"
        animated
        sticky
        offset-top="1.226667rem"
        color="#007bff"
      >
        <van-tab
          v-for="item in userList"
          :key="item.id"
          :title="item.name"
          :name="item.id"
        >
          <ArticleList :listId="active"></ArticleList>
        </van-tab>
      </van-tabs>
      <van-icon name="plus" class="addTabs" size="16" @click="changeTabs()" />
    </div>
    <!-- 频道切换——遮罩层 -->
    <van-overlay :show="show" class="overlay">
      <div class="wrapper">
        <div class="block">
          <Overlay @cross="cross" @closeOV="closeOverlay" :userListTabs="userList" :siftTabs="siftTabs" @addTab="addTab" ></Overlay>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { getUserChangeListAPI, list } from '../../api/index.js'
import ArticleList from './components/articleList.vue'
import Overlay from './components/overlayTab.vue'
export default {
  data () {
    return {
      active: 0,
      // 用户选择的标签列表
      userList: [],
      list: [],
      show: false
    }
  },
  async created () {
    const res = await getUserChangeListAPI()
    this.userList = res.data.data.channels
    // console.log(this.userList)
    // this.getNewList()
    const res2 = await list()
    this.list = res2.data.data.channels
    // console.log(this.list)
  },
  components: {
    ArticleList,
    Overlay
  },
  methods: {
    changeTabs () {
      this.show = true
    },
    closeOverlay (value) {
      this.show = value
    },
    // 标签频道添加与删除标签
    addTab (items) {
      this.userList.push(items)
      // await updateUserList(this.userList)
    },
    cross (id, show) {
      // console.log(id)
      if (show === true && id !== 0) {
        const index = this.userList.findIndex(item => {
          return item.id === id
        })
        this.userList.splice(index, 1)
      }
      if (show === false) {
        this.show = false
        this.active = id
      }
    },
    // 点击search icon后跳转到搜索页面
    search () {
      this.$router.push('/search')
    },
    // 频道管理页面非编辑状态下点击tab后跳转到对应频道
    clickTab (id) {
      this.active = id
    }
  },
  computed: {
    // 筛选出用户没有选择的频道
    siftTabs () {
      const newTabs = this.list.filter(obj => {
        const index = this.userList.findIndex(item => {
          return item.id === obj.id
        })
        if (index > -1) {
          return false
        } else {
          return true
        }
      })
      return newTabs
    }
  }
}
</script>
<style lang="less">
.little {
  color: #ffffff;
  font-size: 18px;
}

.van-tabs__content {
  padding-top: 44px;
  height: auto;
}
.addTabs {
  position: fixed;
  top: 60px;
  right: 0px;
  z-index: 999;
  background-color: #ffffff;
}
.overlay{
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .block {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
  }
}
</style>
