<template>
    <section>
        <section class="login_message">
            <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名">
        </section>
        <section class="login_verification">
            <input type="tel" maxlength="8" placeholder="密码">
            <div class="switch_button off">
                <div class="switch_circle"></div>
                <span class="switch_text">...</span>
            </div>
        </section>
        <section class="login_message">
            <input type="text" maxlength="11" placeholder="验证码">
            <img class="get_verification" src="./images/captcha.svg" alt="captcha">
        </section>
    </section>
</template>

<script>
export default {
    name: "LoginPwd",
}
</script>



<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixing.styl"
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
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
</style>
