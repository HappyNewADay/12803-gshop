<template>
  <div id="app">

    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer/Footer.vue'
import { reqFoodTypes } from './api/index.js'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  mounted() {
    this.getAddress()
    // this.$store.dispatch('getCategorys')
  },
  methods: {
    ...mapActions(['getAddress'])
  },
  components: {
    Footer
  }
}
</script>



<style lang="stylus" rel="stylesheet/stylus">
    @import "./common/stylus/mixing.styl"
    #app
      width 100%
      height 100%
      background #f5f5f5
  position relative
  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>
