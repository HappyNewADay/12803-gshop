<template>
  <div>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <!-- <router-link active-class="on" to="/login/logintel" selected="true">短信登录</router-link>
            <router-link active-class="on" to="/login/loginpwd">密码登录</router-link> -->
            <a href="javascript:;" :class="{on: loginway}" @click="loginway=true">短信登录</a>
            <a href="javascript:;" :class="{on: !loginway}" @click="loginway=false">密码登录</a>
          </div>
          <div class="login_content">
            <form @submit.prevent="login">
              <div :class="{on: loginway}">
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                  <button :disabled="!rightPhone" class="get_verification" :class="{right_phone: rightPhone}"
                    @click.prevent="getCode">{{phoneTime>0?`已发送(${phoneTime}s)`:'获取验证码'}}</button>
                </section>
                <section class="login_verification">
                  <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
                </section>
                <section class="login_hint">
                  温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                  <a href="javascript:;">《用户服务协议》</a>
                </section>
              </div>
              <div :class="{on: !loginway}">
                <section>
                  <section class="login_message">
                    <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                  </section>
                  <section class="login_verification">
                    <input type="password" maxlength="8" placeholder="密码" v-if="!showPwd" v-model="pwd">
                    <input type="text" maxlength="8" placeholder="密码" v-else v-model="pwd">
                    <div class="switch_button" @click="showPwd=!showPwd" :class="showPwd?'on':'off'">
                      <div class="switch_circle" :class="{right:showPwd}"></div>
                      <span class="switch_text">{{showPwd?'abc':'...'}}</span>
                    </div>
                  </section>
                  <section class="login_message">
                    <input type="tel" maxlength="11" placeholder="验证码" v-model="captcha">
                    <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getcaptcha"
                      ref="captcha">
                  </section>
                </section>
              </div>
              <button class="login_submit">登录</button>
            </form>
            <a href="javascript:;" class="about_us">关于我们</a>
          </div>
          <a href="javascript:" class="go_back" @click="goback">
            <i class="iconfont icon-jiantou2"></i>
          </a>
        </div>
      </div>
      <AlertTip :alertText="alertText" v-show="alertShow" @closeTips="closeTips" />
    </section>
  </div>
</template>

<script>
import AlertTip from '../../components/AlertTips/AlertTips.vue'
import { reqSendCode, reqSmsLogin, reqPwdLogin } from '../../api/index.js'
import { mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      loginway: true,//true代表短信登陆,false代表密码登录
      phone: '',//手机号
      phoneTime: 0,
      showPwd: false,
      pwd: '',//密码
      code: '',//短信验证码
      name: '',//用户名
      captcha: '',//图形验证码
      alertText: '',//提示文本
      alertShow: false,//是否显示提示框
      codePhone: '',//短信验证码暂存地
    }
  },
  computed: {
    rightPhone() {
      return /^1[3-9][0-9]{9}$/.test(this.phone)
    },
    ...mapState(['testUser'])
  },
  components: {
    AlertTip,
  },
  methods: {
    goback() {
      this.$router.replace('/profile')
    },
    //异步获取短信验证码
    async getCode() {
      if (!this.phoneTime) {
        this.phoneTime = 30
        this.intervalId = setInterval(() => {
          this.phoneTime--
          if (this.phoneTime <= 0) {
            clearInterval(this.intervalId)
          }
        }, 1000);
        //发送ajax请求(向指定手机发送短信验证码)
        const result = await reqSendCode(this.phone)
        if (!result.code) {
          //显示提示
          this.codePhone = result.msg
          this.showAlert(result.msg)
          //停止倒计时
          if (this.phoneTime) {
            this.phoneTime = 0
            clearInterval(this.intervalId)
            this.intervalId = undefined
          }
        }
      }
    },
    showAlert(alertText) {
      this.alertShow = true
      this.alertText = alertText
    },
    //登陆表单验证
    async login() {
      let result
      if (this.loginway) {
        const { phone, code } = this
        if (!this.rightPhone) {
          //手机号不正确
          this.showAlert('手机号不正确')
          return
        } else if (!/^\d{6}$/.test(code)) {
          //验证码必须是六位数字
          this.showAlert('验证码必须是六位数字')
          return
        }
        //发送Ajax请求短信登陆
        // result = await reqSmsLogin(phone, code)
      } else {
        const { name, pwd, captcha } = this
        if (!this.name) {
          //用户不能为空
          this.showAlert('用户不能为空')
          return
        } else if (!this.pwd) {
          //密码不能为空
          this.showAlert('密码不能为空')
          return
        } else if (!this.captcha) {
          //验证码不能为空
          this.showAlert('验证码不能为空')
          return
        }
        //发送AJAx请求密码登录
        // result = await reqPwdLogin({ name, pwd, captcha })
      }
      if (this.phoneTime) {
        this.phoneTime = 0
        clearInterval(this.intervalId)
        this.intervalId = undefined
      }
      if (this.phone == this.testUser.phone) {
        const useInfo = { phone: this.phone }
        const user = useInfo
        //将user保存到state中
        this.$store.dispatch('recordUsers', user)
        //跳转路由到个人中心界面
        this.$router.replace('/profile')
      } else if (this.name == this.testUser.name && this.pwd == this.testUser.pwd) {
        const useInfo = { name: this.name, pwd: this.pwd }
        const user = useInfo
        //将user保存到state中
        this.$store.dispatch('recordUsers', user)
        //跳转路由到个人中心界面
        this.$router.replace('/profile')
      }
      else {
        this.getcaptcha()
        this.showAlert(this.name ? '账户名或密码错误' : '手机号或验证码错误')
      }

      // // 根据结果对数据进行处理
      // if (result.code === 0) {
      //   // const user = result.data
      //   //将user保存到state中
      //   this.$store.dispatch('recordUsers', user)
      //   //跳转路由到个人中心界面
      //   this.$router.replace('/profile')
      // } else {
      //   const message = result.msg
      //   this.getcaptcha()
      //   this.showAlert(message)
      // }
    },
    //关闭提示框
    closeTips() {
      this.alertShow = false
      this.alertText = ''
    },
    //获取一个新的图片验证码
    getcaptcha() {
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }
  }
}
</script>



<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixing.styl"
    .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.right_phone
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>
