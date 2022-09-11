<template>
<div>
  <van-nav-bar
  title="呵呵快讯——登录"
/>
<van-form @submit="onSubmit">
  <van-field
    v-model="user.mobile"
    required
    name="mobile"
    label="手机号"
    placeholder="手机号"
    :rules="[{ required: true, message: '请正确填写手机号', pattern: /^1[3-9]\d{9}$/ }]"
  />
  <van-field
    v-model="user.code"
    required
    type="password"
    name="code"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写正确密码', pattern: /^\d{6}$/}]"
  />
  <div style="margin: 16px;">
    <van-button :disabled="isLoding" :loading= "isLoding" loading-text="登录中..." round block type="info" native-type="submit">登录</van-button>
  </div>
</van-form>
</div>

</template>
<script>
import { loginAPI, userInfomationAPI } from '../../api/index.js'
import { Notify } from 'vant'
import { setToken } from '../../utils/token.js'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''// 密码（验证码246810）
      },
      isLoding: false,
      userInfo: [] // 登录后获取到的用户信息
    }
  },
  methods: {
    async onSubmit (values) {
      // console.log('submit', values)
      this.isLoding = true
      try {
        const res = await loginAPI(this.user)
        // console.log(res)
        Notify({ type: 'success', message: '登录成功' })
        setToken(res.data.data.token)
        this.$router.replace({
          path: '/layOut'
        })
        this.isLoding = false
      } catch (err) {
        // console.log(err)
        Notify({ type: 'danger', message: '账号或密码错误' })
      }
      const res = await userInfomationAPI()
      this.userInfo = res.data.data
      // console.log(this.userInfo)
      // 由于事件循环同步代码先执行会导致没有将用户信息存储到vuex中
      this.$nextTick(() => {
        localStorage.setItem('heheUserName', this.userInfo.name)
        localStorage.setItem('heheUserImag', this.userInfo.photo)
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
