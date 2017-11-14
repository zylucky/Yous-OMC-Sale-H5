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
    .headback{
      background: url("../resources/images/left_list/headback.png") no-repeat;
      background-size: 100% 100%;
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
      <div class="main-nav-wrapper sidenav" style="height: 628px;background-color: rgb(233,239,247) !important">
        <div class="user-box clearfix">
          <div class="mb20 headback" style="height: 4rem;">
            <div style="padding-top:.6rem;padding-left: 1.6rem;">
              <img style="margin:0rem !important;" id="headimg" class="portrait" src="../resources/images/left_list/headback_head.png" alt="">
            </div>
            <div class="tc" style="margin-top: 0.2rem;font-size:0.4rem">{{username}}</div>
          </div>
          <div class="ys_function tc" style="background-color: rgb(255,255,255);margin-top: -0.4rem;">
            <!--<router-link :to="{path:'/list2'}" id="first_list_link">精选房源</router-link>-->
            <div style="height: 1rem;margin-left: 0.4rem;border-bottom: 1px solid rgb(167,196,223);border-collapse:collapse;">
              <span style=""><img style="float: left;width: 0.5rem;height: 0.48rem;margin-top: 0.25rem;" src="../resources/images/left_list/house.png"></span>
              <a href="javascript:;" style="color: black !important;width: 2rem;font-size: 0.38rem;" @click="house">精选房源</a>
            </div>
            <div style="height: 1rem;margin-left: 0.4rem;border-bottom: 1px solid rgb(167,196,223);">
              <span style=""><img style="float: left;width: 0.5rem;height: 0.48rem;margin-top: 0.25rem;" src="../resources/images/left_list/select.png"></span>
              <a href="javascript:;" style="color: black !important;width: 2rem;font-size: 0.38rem;" @click="select">今日销控</a>
            </div>
            <div style="border-bottom: 1px solid rgb(167,196,223);">
              <div style="height: 1rem;margin-left: 0.4rem;">
                <span style=""><img style="float: left;width: 0.5rem;height: 0.48rem;margin-top: 0.25rem;" src="../resources/images/left_list/list.png"></span>
                <a href="javascript:;" style="color: black !important;width: 2rem;font-size: 0.38rem;" @click="list">楼盘列表</a>
              </div>
            </div>
          </div>
          <div style="background-color:rgb(255,255,255);border-bottom: 1px solid rgb(167,196,223);height: 1rem;margin-top: 0.3rem;">
            <div style="margin-left: 0.4rem;" class="tc ys_function">
              <span style=""><img style="float: left;width: 0.5rem;height: 0.48rem;margin-top: 0.25rem;" src="../resources/images/left_list/per_cen.png"></span>
              <a href="javascript:;" style="color: black !important;width: 2rem;font-size: 0.38rem;" @click="percent">个人中心</a>
            </div>
          </div>
        </div>
        <a href="javascript:;" class="log_out_btn" style="position: relative;bottom:-2rem;width: 4rem;" @click="login_out()">退出登录</a>
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
          head:"",
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
          if(window.location.href == "http://omc.urskongjian.com/wanx/#/house"){
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
          }else{
              $("#zhezhao").remove();
              $('html').removeAttr("style");
              $("body").removeAttr("style");
              this.$router.push({path:'/house'});
          }

      },
      select(){
          if(window.location.href == "http://omc.urskongjian.com/wanx/#/select"){
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
          }else{
              $("#zhezhao").remove();
              $('html').removeAttr("style");
              $("body").removeAttr("style");
              this.$router.push({path:'/select'});
          }
      },
      list(){
        if(window.location.href == "http://omc.urskongjian.com/wanx/#/list" || window.location.href == "http://omc.urskongjian.com/wanx/#/"){
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
        }else{
            $("#zhezhao").remove();
            $('html').removeAttr("style");
            $("body").removeAttr("style");
            this.$router.push({path:'/'});
        }
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
      //获取微信的头像
      let head1 = JSON.parse(localStorage.getItem('nxhead'));
      if(head1 != ""){
          console.log(head1);
          $('#headimg').attr('src',head1);
      }
    }
  };
</script>
