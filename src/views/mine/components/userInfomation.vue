<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image round class="avatar" :src="userInfoData.photo" @click="$refs.iptFile.click()" />
          <input
            type="file"
            ref="iptFile"
            v-show="false"
            @change="imgChange"
          />
        </template>
      </van-cell>
      <van-cell
        title="名称"
        is-link
        :value="userInfoData.name"
        @click="(dialogShow = true), (nameText = '')"
      />
      <van-cell
        title="生日"
        is-link
        :value="userInfoData.birthday"
        @click="birthday"
      />
    </van-cell-group>
    <!-- 时间选择器 -->
    <van-popup v-model="timeShow" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="timeShow = false"
        @confirm="determine()"
      />
    </van-popup>
    <!-- 修改name弹窗 -->
    <van-dialog
      :beforeClose="setName"
      v-model="dialogShow"
      title="修改名称"
      show-cancel-button
    >
      <van-field
        v-model="nameText"
        input-align="center"
        v-focus
        placeholder="请输入名称"
        size="25"
        maxlength="7"
      />
    </van-dialog>
  </div>
</template>

<script>
import { userInfomationAPI, editUserInfo, editUserImag } from '../../../api/index.js'
import moment from 'moment'
import { Notify } from 'vant'
export default {
  name: 'UserEdit',
  data () {
    return {
      userInfoData: [], // 用户个人信息
      minDate: new Date(1949, 10, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2022, 9, 10),
      timeShow: false,
      dialogShow: false,
      nameText: '' // 用户输入的name值
    }
  },
  async created () {
    const res = await userInfomationAPI()
    this.userInfoData = res.data.data
    // console.log(this.userInfoData)
  },
  methods: {
    birthday () {
      this.timeShow = true
    },
    async determine () {
      this.timeShow = false
      const birTime = moment(this.currentDate).format('YYYY-MM-DD')
      await editUserInfo({ birthday: birTime })
      this.userInfoData.birthday = birTime
    },
    async setName (action, done) {
      if (action === 'confirm') {
        if (/^[A-Za-z0-9\u4e00-\u9fa5]{1,7}$/.test(this.nameText)) {
          editUserInfo({ name: this.nameText })
          this.userInfoData.name = this.nameText
          localStorage.setItem('heheUserName', this.nameText)
          done()
        } else {
          Notify({ type: 'warning', message: '用户名中英文和数字1-7位' })
          done(false)
        }
      } else {
        done()
      }
    },
    async imgChange (e) {
      if (e.target.files.length === 0) return // 防止用户未选择图片
      // console.log(e.target.files[0])
      const fd = new FormData()
      fd.append('photo', e.target.files[0]) // photo在表单里参数名携带
      const res = await editUserImag(fd)
      localStorage.setItem('heheUserImag', res.data.data.photo)
      this.userInfoData.photo = res.data.data.photo // 更新最新头像
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
