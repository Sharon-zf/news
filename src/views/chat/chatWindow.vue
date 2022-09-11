<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小思同学"></van-nav-bar>
    <!-- 聊天主体区域 -->
    <div class="chat-list">
      <div v-for="(item, index) in list" :key="index">
          <!-- 左侧是机器人小思 -->
          <div v-if="item.name === 'xs'" class="chat-item left">
            <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <div class="chat-pao">{{item.msg}}</div>
          </div>
          <!-- 右侧是当前用户 -->
          <div v-else class="chat-item right">
            <div class="chat-pao">{{item.msg}}</div>
            <van-image fit="cover" round :src="userImag" />
          </div>
       </div>
    </div>
    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field v-model="word"  placeholder="说点什么...">
        <template #button>
          <span  style="font-size:12px;color:#999" @click="sentInfo">提交</span>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client'
import { getToken } from '../../utils/token.js'
export default {
  data () {
    return {
      word: '', // 输入框的内容
      // 所有的聊天消息
      list: [
        // 只根据 name 属性，即可判断出这个消息应该渲染到左侧还是右侧
        { name: 'xs', msg: 'hi，你好！我是小思' },
        { name: 'me', msg: '我是编程小王子' }
      ],
      userImag: localStorage.getItem('heheUserImag'), // 用户头像
      socket: null
    }
  },
  created () {
    console.log(localStorage.getItem('heheUserImag'))
    // 创建客户端 websocket 的实例
    this.socket = io('http://toutiao.itheima.net', {
      query: {
        token: getToken()
      },
      transports: ['websocket']
    })
    // 检查是否链接成功
    this.socket.on('connect', () => {
      console.log('成功了')
    })
    // 监听后台传来的消息
    this.socket.on('message', data => {
      this.list.push({
        name: 'xs',
        msg: data.msg
      })
    })
  },
  // 销毁组件前关闭链接
  beforeDestroy () {
    this.socket.close()
    this.socket = null
  },
  methods: {
    sentInfo () {
      // 判断信息是否为空
      if (this.word === '') return
      // 将发送的消息存到数组中
      this.list.push({
        name: 'me',
        msg: this.word
      })
      // 将消息发送给后台
      this.socket.emit('message', {
        msg: this.word,
        timesTamp: new Date().getTime()
      })
      // 清空输入框
      this.word = ''
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
