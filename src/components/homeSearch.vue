<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <van-search
        v-model="value"
        @input="inputEvent"
        @search="clickSearch(value)"
        v-focus
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
      />
    </div>
    <!-- 搜索建议列表 -->
    <div class="sugg-list">
      <div
        class="sugg-item"
        v-for="(item, index) in adviceList"
        :key="index"
        v-html="textLight(item, value)"
        @click="clickSearch(item)"
      ></div>
    </div>
    <!-- 搜索历史 -->
    <div v-show="historyShow" class="search-history">
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon @click="clearHistory" name="delete" class="search-icon" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span
          class="history-item"
          v-for="(item, index) in history"
          :key="index"
          @click="clickSearch(item)"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import { adviceListAPI } from '../api/index.js'
export default {
  data () {
    return {
      value: '', // 搜索关键字
      time: null,
      adviceList: [], // 搜索建议列表
      history: JSON.parse(localStorage.getItem('searchHistory')) || [], // 搜索历史
      historyShow: true
    }
  },
  methods: {
    inputEvent () {
      clearTimeout(this.time)
      this.historyShow = false
      if (this.value.length === 0) {
        this.adviceList = []
        this.historyShow = true
      } else {
        this.time = setTimeout(async () => {
          const res = await adviceListAPI({ keyWorld: this.value })
          this.adviceList = res.data.data.options
        }, 500)
      }
    },
    // 字体高亮函数
    textLight (sumText, target) {
      // 使用replaceAll匹配字符串时可能会没有导致匹配失败报错
      try {
        return sumText.replaceAll(
          target,
        `<span style="color: red">${target}</span>`
        )
      } catch (error) {

      }
    },
    // 搜索函数
    clickSearch (keyWorld) {
      if (keyWorld.length > 0) { // 防止搜索空值
        // 将搜索的历史记录存储到history中
        this.history.push(keyWorld)
        this.history = [...new Set(this.history)] // 数组的去重
        localStorage.setItem('searchHistory', JSON.stringify(this.history))
        // 最后进行路由的跳转,防止路由跳转后销毁组件无法获取history数据
        this.$router.push({
          path: `/searchRe/${keyWorld}`
        })
      }
    },
    // 清除历史记录
    clearHistory () {
      this.history = []
      localStorage.removeItem('searchHistory')
    }
  }
}
</script>
<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
