<template>
  <div>
    <div class="newsItem">
      <div class="title">
        <span>{{ artObj.title }}</span>
        <img
          v-if="artObj.cover.type === 1"
          class="thumb"
          :src="artObj.cover.images[0]"
          alt=""
        />
      </div>
      <div class="thumb-box" v-if="artObj.cover.type > 1">
        <img
          v-for="(imgs, index) in artObj.cover.images"
          :key="index"
          class="thumb"
          :src="artObj.cover.images[index]"
          alt=""
        />
      </div>
      <div class="newsBody" v-if="isShow">
        <div class="description">
          <span>{{ artObj.aut_name }}</span> &nbsp;&nbsp;&nbsp;
          <span>{{ artObj.is_top }}评论</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>{{ artObj.pubdate }}</span>
        </div>
        <van-icon v-if="isShowIcon" class="dislikeIcon" size="15" name="cross" @click.stop="show = true"/>
      </div>
    </div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      :cancel-text="bottomText"
      @select="onSelect"
      @cancel="cancelAct"
      @close="closeSheet"
      get-container="body"
    />
  </div>
</template>
<script>
import { firstActions, secondActions } from '../../../api/reportData.js'
export default {
  props: {
    artObj: Object,
    isShow: {
      type: Boolean,
      default: true
    },
    isShowIcon: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: false, // 遮罩层的显示
      actions: firstActions,
      bottomText: '取消'
    }
  },
  methods: {
    onSelect (action) {
      if (action.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (action.name === '不感兴趣') {
        // console.log(this.artObj)
        this.$emit('noLikeItem', this.artObj.art_id)
        this.show = false
      } else {
        this.$emit('articleBad', this.artObj.art_id, action.value)
        this.show = false
      }
    },
    // 反馈栏标签的显示隐藏与切换
    cancelAct () {
      if (this.bottomText === '返回') {
        this.show = true
        this.actions = firstActions
        this.bottomText = '取消'
      }
    },
    closeSheet () {
      this.actions = firstActions
    }
  }
}
</script>
<style lang="less">
.newsItem {
  width: 100%;
  height: auto;
  border-bottom: solid 2px #f4f4f4;
  overflow: hidden;
  .title {
    font-size: 0.5rem;
    margin: 5px 20px;
  }
  .newsBody {
    display: inline-block;
    margin: 0 0 0 13px;
    position: relative;
    width: 100%;
    .description {
      display: inline-block;
      font-size: 0.3rem;
      color: #5f6368;
    }
    .dislikeIcon{
      position: absolute;
      right: 25px;
      bottom: 2px;
    }
  }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
  vertical-align: top;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-around;
}
</style>
