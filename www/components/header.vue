<style lang="less">
  @import "../resources/css/reset.less";
  @import "../resources/css/color.less";
  @import "../resources/css/base.less";
  @import "../resources/css/website/list2.less";

  [header]{
    .mint-popup{
      width:100%;
      position: fixed;
      left:0;
      top:0;
    }
  }
</style>
<template>
  <div header>
    <!--header start-->
    <header id="header" class="clearfix">
      <label class="side_nav side-nav" @click.native="popupVisible= true"  v-on:click="showMenu">
        <img src="../resources/images/ys_more.png" width="20" alt="">
      </label>
      <a href="javascript:;" class="detail-search" style="position: fixed;left: 0; top: 0">
        <input type="text" id="keyword" placeholder="请输入关键字搜索" v-model="para.search_keywork" maxlength="50"
               @focus="changeRou">
      </a>
      <router-view></router-view>
    </header>
    <mt-popup v-model="popupVisible" position="left" class="mint-popup-3" :modal="false">
      <!--左侧登录div-->
      <div class="main-nav-wrapper sidenav" style="height: 628px;">
        <div class="user-box clearfix">
          <div class="mb20">
            <div>
              <img style="margin: .6rem auto .6rem !important;" class="portrait" src="../resources/images/por_icon.png" alt="">
            </div>
            <div class="tc" style="margin-top: -0.5rem;">{{username}}</div>
          </div>
          <div class="ys_function tc">
            <!--<router-link :to="{path:'/list2'}" id="first_list_link">精选房源</router-link>-->
            <a href="javascript:;" @click="house">精选房源</a>
            <a href="javascript:;" @click="select">今日销控</a>
            <a href="javascript:;" @click="list">楼盘列表</a>
          </div>
          <div class="tc ys_function">
            <a href="javascript:;" @click="percent">个人中心</a>
          </div>
        </div>
        <a href="javascript:;" class="log_out_btn" style="bottom:1.5rem;" @click="login_out()">退出登录</a>
      </div>
    </mt-popup>
  </div>
  <!--header end-->
</template>
<script type="text/babel">
  import $ from 'jquery';
  import {Indicator} from 'mint-ui';
  export default {
    data() {
      return {
        popupVisible: false,
          username:"",
          para: {
              "search_keywork": "",
          },
      };
    },
    methods: {
        init(){
            this.para.search_keywork = this.$route.query.keyword;
        },
        changeRou: function () {
            this.$router.push({path: '/search?rt=index'})
        },
      showMenu: function () {
        this.popupVisible = true;
        var wwd = $("#section").width();
        if (!wwd) {
          wwd = $(".section").width();
        }
        var wgd = $(window).height() + 50;
        $("body").prepend('<div id="zhezhao"></div>');
        $("#zhezhao").css({
          width: "" + wwd + "px",
          height: "" + wgd + "px",
          "background-color": "#000",
          "z-index": "1200",
          opacity: "0.5",
          position: "absolute",
          top: "0px",
          left: "0px"
        });
        $(".sidenav").css("left", "-100%");
        $(".sidenav").show();
        $("#zhezhao").animate({
          left: "60%"
        }, 150);
        $("#zhezhao").animate({
          backgroundColor: "#000000"
        }, 150);
        $(".sidenav").animate({
          left: "0"
        }, 150, function () {
          $('html').css({'height': '100%', 'overflow': 'hidden'});
          $('body').css({'height': '100%', 'overflow': 'hidden'});
          $("#zhezhao").on("click",
            function () {
              $('.sidenav').animate({
                left: '-100%'
              }, 150, function () {
                $('.sidenav').hide();
              });
              $("#section").animate({
                left: '0'
              }, 150);
              $(".section").animate({
                left: '0'
              }, 150);
              this.popupVisible = false;
              $("#zhezhao").remove();
              $('html').removeAttr("style");
              $("body").removeAttr("style");
            }
          )
        });
        $("#section").animate({
          left: "60%"
        }, 150);
        $(".section").animate({
          left: "60%"
        }, 150);
      },
      house(){
          $("#zhezhao").remove();
          $('html').removeAttr("style");
          $("body").removeAttr("style");
          this.$router.push({path:'/house'});
      },
      select(){
          $("#zhezhao").remove();
          $('html').removeAttr("style");
          $("body").removeAttr("style");
          this.$router.push({path:'/select'});
      },
      list(){
        $("#zhezhao").remove();
        $('html').removeAttr("style");
        $("body").removeAttr("style");
        this.$router.push({path:'/'});
      },
      percent(){
        $("#zhezhao").remove();
        $('html').removeAttr("style");
        $("body").removeAttr("style");
        this.$router.push({path:'/per_cen'});
      },

      modify_pwd(){
          $("#zhezhao").remove();
          $('html').removeAttr("style");
          $("body").removeAttr("style");
          this.$router.push({path:'/modify_pwd'});
      },
      login_out(){
          $("#zhezhao").remove();
          const url = this.$api + "/yhcms/web/qduser/loginOut.do";
          const user22 = JSON.parse(localStorage.getItem('cooknx'));
          let that = this;
          this.$http.post(url,{"cookie":user22.sjs,"foreEndType":2,"code":"10"}).then((res)=>{
              Indicator.close();
              const data = JSON.parse(res.bodyText).success;
              if(data){
                  $('html').removeAttr("style");
                  $("body").removeAttr("style");
                  //$('html').css({'height': 'auto', 'overflow': 'auto'});
                  localStorage.removeItem('cooknx');
                  this.$router.push({path:'/login'});
              }else{
                  Toast({
                      message: '系统异常，请稍后再试!',
                      position: 'middle',
                      duration: 3000
                  });
              }
          }, (res)=>{
              Indicator.close();
          });
      }
    },
    mounted: function () {
      var _this = this;
      let user = JSON.parse(localStorage.getItem('usernx'));
      this.username = user;
      $('#first_list_link').click(function(){
          $("#zhezhao").remove();
      });
    }
  };
</script>
