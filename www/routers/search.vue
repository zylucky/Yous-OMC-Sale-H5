<style scoped lang="less">
  @import "../resources/css/website/list.less";
   .search{
     -webkit-box-sizing: border-box;
     box-sizing: border-box;
     position: fixed;
     top:0;
     left: 0;
     right: 0;
     bottom: 0;
     z-index: 9;
     background-color: #fff;
     #s-header{
       position: relative;
       padding-top: .13rem;
       width: 100%;
       height: .88rem;
       line-height:.88rem;
       color: #FFF;
       font-size: .36rem;
       background-color: #302F35;
       -webkit-box-sizing: border-box;
       box-sizing: border-box;
       .close-icon {
         display: block;
         position: absolute;
         right: .30rem;
         top: 0;
         width: .40rem;
         height: .88rem;
         img {
           width: 100%;
           margin-top: -.06rem;
         }
       }
       .search-text {
         position: relative;
         margin-left: 6%;
         display: block;
         width: 78%;
         height: .62rem;
         line-height: .62rem;
         text-align: left;
         background: rgba(255, 255, 255, 0.2);
         background-size: .40rem auto;
         box-sizing: border-box;
         border-radius: .31rem;
         .sbtn{
           position: absolute;
           width: .36rem;
           height:.36rem;
           right: .28rem;
           top: .1378rem;
            background:url(../resources/images/list/ss_01.png) center center no-repeat;
            background-size: contain;
         }
         input {
           width: 88%;
           color: #FFF;
           background: none;
         }
       }
     }
   }
   .more-house{
    position: relative;
    .hot-out{
      border:1px solid transparent;
      display: block;
    }
    .history-out{
      display: block;
    }
    .result-search{
      display: none;
      background-color: #fff;
      position: fixed;
      width: 100%;
      top: .88rem;
      max-height: 7.4rem;
      overflow-y: scroll;
       li{
         margin-left: .360rem;
         padding-right: .22rem;
         height:.88rem;
         line-height: .88rem;
         border-bottom: 0.01rem solid rgba(5, 8, 2, 0.2);
       }
    }
    .more-house-title {
      font-size: .30rem;
      color: #302F35;
      font-weight: 700;
      margin: .30rem !important;
    }
    .search-list {
      padding: 0 .30rem;
      li {
        float: left;
        margin-bottom: .14rem;
        margin-right: 1%;
        padding: .02rem .32rem;
        text-align: center;
        border: 1px solid #D8D8D8;
        border-radius: .60rem;
        box-sizing: border-box;
      }
    }
    .del-btn {
      position: absolute;
      top: 0;
      right:.30rem;
      width: .32rem;
      height: .22rem;
      text-align: center;
      img {
        width: 100%;
        vertical-align: middle;
      }
    }
    .fr{
      float: right;
      em{
        font-size: .42rem;
        font-weight: 900;
        color: red;
      }
    }
      .clearfix{
        clear: both;
      }
  }
</style>
<template>
    <div class="search">
      <div id="s-header">
          <a href="javascript:void(0);" class="search-text">
            <input type="text" class="keywords" id="keyword" placeholder="区域/写字楼名称/房间号" maxlength="50" v-model.trim="search_keyword" autofocus="autofocus" @keyup.enter="find">
            <i class="sbtn" @click="toList2"></i>
          </a>
        <a href="javascript:void(0);" class="close-icon" @click="toList">
            <img src="../resources/images/xuan-close_1.png" alt="">
        </a>
      </div>
      <div class="more-house">
        <div class="hot-out">
          <h3 class="more-house-title mt15 mb15">热门搜索</h3>
          <ul class="search-list clearfix">
            <li v-for="item in hotArray" @click="toListw(item.name)">{{item.name}}</li>
          </ul>
        </div>
        <div class="pr history-out">
          <h3 class="more-house-title mt10 mb15">历史搜索</h3>
          <a href="javascript:;" class="del-btn" @click="clearHistoty">
            <img src="../resources/images/list/del-icon.png" alt="清除">
          </a>
          <ul class="search-list clearfix historyArray">
            <li v-for="item in historyArray" @click="toListw(item.name)">{{item.name}}</li>
          </ul>
        </div>
        <ul class="result-search">
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
          <li class="clearfix">
            <span class="ellipsis">北京万达广场</span>
            <span class="ellipsis fr">
						<em>8</em>元/㎡·天
					</span>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
  import { Indicator } from 'mint-ui';
  import { InfiniteScroll } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import { Actionsheet } from 'mint-ui';
  import { Search } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  import axios from 'axios';
  import qs from 'qs';
  export default {
    components: {
      InfiniteScroll,
      Toast,
      Actionsheet,
      Search
    },

    data () {
      return {
        search_keyword:'',
        historyArray:[],
        hotArray:[
          {name:"建外SOHO"},
          {name:"住邦2000"},
          {name:"万达广场"}
        ],
        resultData: [],
        histjilu:[],
        array:[],
        r: "",
        openid:333,
        searchtype:'',
      }
    },
    created(){
        this.histylishi();

    },
    mounted(){
        this.init();
        var that = this;
        $(".keywords").on('keypress',function(e) {
            var keycode = e.keyCode;
            var searchName = $(this).val();
            if(keycode=='13') {
                e.preventDefault();
                //请求搜索接口  
                that.changeHistory(searchName);
            }
        });
        if(this.r == 'house' || this.r == 'select'){

        }else{
            $(".keywords").attr('placeholder','请输入楼盘关键字搜索');
        }

    },
    methods:{
      init(){
          if(this.$route.query.keyword33){
              this.search_keyword = this.$route.query.keyword33;
          }
        axios.defaults.baseURL = this.$api;
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
        const r = this.$route.query.r;
        this.r = !r ? "" : r;

      },
      histylishi(){
          //历史记录的判断
//          this.openid = JSON.parse(localStorage.getItem("nxopenid"));
          var that = this;
          if(localStorage.getItem('cooknx')){
              //已经登录状态
              var er = that.$route.query.r;
              if(er == 'house'){
                  that.searchtype = '精选房源';
              }else if(er == 'select'){
                  that.searchtype = '今日销控';
              }else{
                  that.searchtype = '楼盘列表';
              }
              const url = that.$api + "/yhcms/web/jcsj/getHistory.do";

              that.$http.post(url,{
                  "openid":this.openid,"sourcetype":"微信公众号","searchtype":that.searchtype
              }).then((res)=>{
                  Indicator.close()
                  const data = JSON.parse(res.bodyText).data;
                  that.array = data;
//                      for(var i=0;i<that.array.length;i++){
//                          that.historyArray[i] = {"name":that.array[i].topic};
//                      }
                  let fp = that.array.map((item, idx)=>{
                      return {"name": item.topic};
                  });
                  that.historyArray = fp;
//                      console.log(fp);
//                      alert(JSON.stringify(that.historyArray));
              }, (res)=>{
                  Indicator.close();
              });
          }else{
              //未登录状态
              var er = that.$route.query.r;
              if(er == 'house' || er == 'select'){
                  if(localStorage.getItem("historyData")){
                      var hoslidata = JSON.parse(localStorage.getItem("historyData")).split('-');
                      that.array = JSON.parse(localStorage.getItem("historyData")).split('-');
                      for(var i=0;i<hoslidata.length;i++){
                          that.historyArray[i] = {name:hoslidata[i]};
                      }
                  }
              }else{
                  if(localStorage.getItem("historyDataList")){
                      var hoslidata = JSON.parse(localStorage.getItem("historyDataList")).split('-');
                      that.array = JSON.parse(localStorage.getItem("historyDataList")).split('-');
                      for(var i=0;i<hoslidata.length;i++){
                          that.historyArray[i] = {name:hoslidata[i]};
                      }
                  }
              }
          }
      },
      clearHistoty:function(){
           this.historyArray = [];
           if(localStorage.getItem('cooknx')){
               const url = this.$api + "/yhcms/web/jcsj/delHistory.do";
               this.$http.post(url,{
                   "openid":this.openid,"searchtopic":"","sourcetype":"微信公众号","searchtype":this.searchtype
               }).then((res)=>{
                   Indicator.close()
               }, (res)=>{
                   Indicator.close();
               });
           }else{
               if(this.r == 'house' || this.r == 'select'){
                   localStorage.removeItem("historyData");
               }else{
                   localStorage.removeItem("historyDataList");
               }

           }

      },
      changeHistory:function(arg){
          if(localStorage.getItem('cooknx')){
              const url = this.$api + "/yhcms/web/jcsj/saveHistory.do";
              axios.post(url,{
              "openid":this.openid,"searchtopic":arg,"sourcetype":"微信公众号","searchtype":this.searchtype
              }).then((res)=>{
                  Indicator.close()
              }, (res)=>{
                  Indicator.close();
              });
          }else{
              this.histjilu.push(arg);
              if(this.r == 'house' || this.r == 'select'){
                  if(localStorage.getItem("historyData")){
                      localStorage.removeItem("historyData");
                      var c = this.histjilu.concat(this.array);
                      //数组去重
                      var temp = []; //一个新的临时数组
                      for(var i = 0; i < c.length; i++){
                          if(temp.indexOf(c[i]) == -1){
                              temp.push(c[i]);
                          }
                      }

                      if(temp.length > 5){
                          temp = temp.slice(0,5);
                      }
                      this.histjilu = temp;
                      localStorage.setItem("historyData",JSON.stringify(this.histjilu.join('-')));
                  }else{
                      localStorage.setItem("historyData",JSON.stringify(this.histjilu.join('-')));
                  }
              }else{
                  if(localStorage.getItem("historyDataList")){
                      localStorage.removeItem("historyDataList");
                      var c = this.histjilu.concat(this.array);
                      //数组去重
                      var temp = []; //一个新的临时数组
                      for(var i = 0; i < c.length; i++){
                          if(temp.indexOf(c[i]) == -1){
                              temp.push(c[i]);
                          }
                      }

                      if(temp.length > 5){
                          temp = temp.slice(0,5);
                      }
                      this.histjilu = temp;
                      localStorage.setItem("historyDataList",JSON.stringify(this.histjilu.join('-')));
                  }else{
                      localStorage.setItem("historyDataList",JSON.stringify(this.histjilu.join('-')));
                  }
              }

          }

          this.historyArray.unshift({name:arg});
      },
      toList:function(){
        this.$router.push({path: '/' + this.r});
          //history.go(-1);
      },
      toList2:function(){
        if(this.search_keyword != ""){
             this.changeHistory(this.search_keyword);
        }
        this.$router.push({path: '/' + this.r, query: {keyword: this.search_keyword}});
      },
      find:function(){
        if(!this.search_keyword){
            MessageBox('提示', '请输入关键字');
            return;
        }
        this.$router.push({path: '/' + this.r, query: {keyword: this.search_keyword}});
      },
      toListw:function(k){
        this.changeHistory(k);
        this.$router.push({path: '/' + this.r, query: {keyword:k}});
      },
      closeFilter:function(){
        this.currentFilterTab='nth';
      },


    }
  }
</script>
