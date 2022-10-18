<template>
  <div>
    <van-nav-bar title="呵呵快讯——登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        required
        name="mobile"
        label="手机号"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请输入', pattern: /^1[3-9]\d{9}$/ },
        ]"
      />
      <van-field
        v-model="user.code"
        required
        type="password"
        name="code"
        :label="loginMode ? '密码' : '验证码'"
        :placeholder="loginMode ? '密码' : '验证码'"
        :rules="[{ required: true, message: '请输入', pattern: /^\d{6}$/ }]"
      />
      <div style="margin: 16px">
        <van-button
          :disabled="isLoding"
          :loading="isLoding"
          loading-text="登录中..."
          round
          block
          type="info"
          native-type="submit"
          >登录</van-button
        >
      </div>
      <div class="changeLOginMode">
        <van-button
          round
          size="large"
          plain
          type="info"
          @click="changeLOginMode"
          >切换登录方式</van-button
        >
      </div>
      <div v-if="!loginMode" class="getVerCode">
        <van-button
          :disabled="this.verCodeCd"
          @click="getVerCode"
          style="height: 43px"
          round
          size="large"
          plain
          type="info"
          >{{ this.verModeInfo }}</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import {
  loginAPI,
  userInfomationAPI,
  getVerificationCodeAPI
} from '../../api/index.js'
import { Notify } from 'vant'
import { setToken } from '../../utils/token.js'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: '' // 密码（验证码246810）
      },
      isLoding: false,
      userInfo: [], // 登录后获取到的用户信息
      loginMode: true, // 登录方式：true:密码登录；false: 验证码登录
      verModeInfo: '获取验证码',
      verCodeCd: false // false: 能获取验证码；true: 不能获取验证码
    }
  },
  methods: {
    async onSubmit (values) {
      // console.log('submit', values)
      this.isLoding = true
      try {
        const res = await loginAPI(this.user)
        console.log(res)
        Notify({ type: 'success', message: '登录成功' })
        setToken(res.data.data.token)
        this.$router.replace({
          path: '/layOut'
        })
        this.isLoding = false
        localStorage.setItem('refresh_token', res.data.data.refresh_token) // 刷新token时使用
      } catch (err) {
        console.log(err)
        Notify({ type: 'danger', message: '账号或密码错误' })
        this.isLoding = false
      }
      const res = await userInfomationAPI()
      this.userInfo = res.data.data
      // console.log(this.userInfo)
      // 由于事件循环同步代码先执行会导致没有将用户信息存储到vuex中
      this.$nextTick(() => {
        localStorage.setItem('heheUserName', this.userInfo.name)
        localStorage.setItem('heheUserImag', this.userInfo.photo)
      })
    },
    changeLOginMode () {
      this.loginMode = !this.loginMode
      console.log(111)
    },
    async getVerCode () {
      if (this.user.mobile.length === 0) { // 判断是否输入手机号
        console.log(22)
      } else {
        if (/^1[3-9]\d{9}$/.test(this.user.mobile)) { // 判断是否输入正确格式的手机号
          // let time = 60
          this.verModeInfo = '重新获取验证码'
          this.verCodeCd = true
          const getVercode = setTimeout(() => {
            this.verCodeCd = false
          }, 60000)
          // const surplusTime = setInterval
          const res = await getVerificationCodeAPI({
            telephoneNumber: this.user.mobile
          })
          console.log(res)
          clearTimeout(getVercode)
        } else {
          console.log(33)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.changeLOginMode {
  width: 90%;
  margin: 20px 5%;
}
.getVerCode {
  width: 90%;
  margin-left: 5%;
}
</style>
