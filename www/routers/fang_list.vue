<style scoped lang="less">
  @import "../resources/css/website/list.less";
  .page-infinite-loading {
    text-align: center;
    background-color: #FFF;
    & > span {
      display: inline-block;
    }
  }

.ys_item_con{margin-bottom:0.3rem}
.price-bot input{height:100% !important;width:30% !important}
.bg_gray {
  background-color: #f0eff5 !important;
  padding: .3rem .02rem;
  height: auto !important
}
.ys_tit{line-height:0.8rem}
.ys_tag {
  display: inline-block;
  padding: 0 .25rem;
  height: .55rem;
  line-height: .55rem;
  background-color: #dbdadf;
  font-size: 0.24rem;
  margin-right: .08rem;
  margin-bottom: .08rem;
  border-radius: .1rem;
}
.ys_tag.active {
  background-color: #16abdc;
  color: #fff;
}

</style>
<template>
  <div>
    <!--header-->
    <section id="header">
      <header1></header1>
    </section>
    <a href="javascript:;" class="detail-search" style="position: fixed;left: 0; top: 0">
      <input type="text" id="keyword" placeholder="请输入写字楼、区域、商圈" v-model="para.search_keywork" maxlength="50"
             @focus="changeRou">
    </a>
    <section class="section"
             :class="{'in-filter':this.currentFilterTab=='district'||this.currentFilterTab=='price'||this.currentFilterTab=='area'||this.currentFilterTab=='features'}">
      <div class="option">
        <div class="filtate-outter">
          <div class="list-filtrate">
            <!--筛选条件标题开始-->
            <section class="filtrate-nav">
              <ul @click="chooseFilter($event)">
                <li data-role="filterItem" data-type="district"
                    :class="{'active-filter':this.currentFilterTab=='district'}">
                  <a href="javascript:void(0);">
                    <h2 class="ellipsis district-h">位置</h2>
                    <i class="filt-arrow"></i>
                  </a>
                </li>
                <li data-role="filterItem" data-type="price" :class="{'active-filter':this.currentFilterTab=='price'}">
                  <a href="javascript:void(0);" @click="setPriceFilter">
                    <h2 class="ellipsis price-h">价格</h2>
                    <i class="filt-arrow"></i>
                  </a>
                </li>
                <li data-role="filterItem" data-type="area" :class="{'active-filter':this.currentFilterTab=='area'}">
                  <a href="javascript:void(0);" @click="setAreaFilter">
                    <h2 class="ellipsis area-h">面积</h2>
                    <i class="filt-arrow"></i>
                  </a>
                </li>
                <li data-role="filterItem" data-type="features"
                    :class="{'active-filter':this.currentFilterTab=='features'}">
                  <a href="javascript:void(0);">
                    <h2 class="ellipsis feature-h">筛选</h2>
                    <i class="filt-arrow"></i>
                  </a>
                </li>
              </ul>
            </section>
            <!--筛选条件标题结束-->

            <!--筛选条件内容start-->
            <div class="filt-container">
              <div class="filt-open" id="filter-district" :class="{show:this.currentFilterTab=='district'}">
                <div class="warpper box-flex1 grey-bg price-height">
                  <ul>
                    <li class="price-sub" :class="{act:this.positionType=='a'}" @click="positionType='a';curTab=''">
                      <a href="javascript:void(0);" style="color: #302F35;">行政区域</a>
                    </li>
                    <li class="price-sub" :class="{act:this.positionType=='y'}" @click="positionType='y';curTab=''">
                      <a href="javascript:void(0);" style="color: #302F35;">业务区域</a>
                    </li>
                    <li class="price-sub" :class="{act:this.positionType=='l'}" @click="positionType='l';curTab=''">
                      <a href="javascript:void(0);" style="color: #302F35;">地铁</a>
                    </li>
                    <div id="position_filter" class="warpper2 box-flex1 bg-white" :class="{choose:this.curTab=='a'||this.curTab=='l'||this.curTab=='y'}">
                      <ul class="price-ul cut-height" :class="{show:this.positionType=='a'}">
                        <li data-type="positionA" @click="searchChoose('','','不限', $event)"><a href="javascript:;">不限</a></li>
                        <li v-for="item in govDistrictArray" data-type="positionA"
                            @click="searchSubArea(item.fdcode, $event)">
                          <a href="javascript:;">{{item.fdname}}</a></li>
                      </ul>
                      <ul class="price-ul cut-height" :class="{show:this.positionType=='y'}">
                        <li data-type="positionL" @click="searchChoose('','','不限', $event)"><a href="javascript:;">不限</a></li>
                        <li v-for="item in districtArray" data-type="positionY"
                            @click="searchArea(item.id, $event)">
                          <a href="javascript:;">{{item.fdname}}</a></li>
                      </ul>
                      <ul class="price-ul cut-height" :class="{show:this.positionType=='l'}">
                        <li data-type="positionL" @click="searchChoose('','','不限', $event)"><a href="javascript:;">不限</a></li>
                        <li v-for="item in lineArray" data-type="positionL"
                            @click="searchStation(item.id, $event)">
                          <a href="javascript:;">{{item.fdname}}</a></li>
                      </ul>
                    </div>

                    <div id="third-tab" class="warpper2 box-flex1 bg-white" :class="{show:this.curTab!=''&&this.thirdpart!=''}">
                      <ul class="price-ul cut-height" :class="{show:this.positionType=='a'}">
                        <li data-type="positionA" @click="searchChoose('','','不限', $event)"><a href="javascript:;">不限</a></li>
                        <li v-for="item in subBuesiness" data-type="positionA"
                            @click="searchChoose(item.fdcode,'',item.fdname, $event)">
                          <a href="javascript:;">{{item.fdname}}</a></li>
                      </ul>
                      <ul class="price-ul cut-height" :class="{show:this.positionType=='y'}">
                        <li data-type="positionA" @click="searchChoose('','','不限', $event)"><a href="javascript:;">不限</a></li>
                        <li v-for="item in otherBusiness" data-type="positionA"
                            @click="searchChoose(item.id,'',item.fdname, $event)">
                          <a href="javascript:;">{{item.fdname}}</a></li>
                      </ul>
                      <ul class="price-ul cut-height" :class="{show:this.curTab!=''&&this.thirdpart=='dt'}">
                        <li data-type="positionL" @click="searchChoose('','','不限', $event)"><a href="javascript:;">不限</a></li>
                        <li v-for="item in stationArray" data-type="positionL"
                            @click="searchChoose(item.id,'',item.fdname, $event)">
                          <a href="javascript:;">{{item.fdname}}</a></li>
                      </ul>
                    </div>
                  </ul>
                </div>
              </div>

              <div class="filt-open" id="filter-features" :class="{show:this.currentFilterTab=='features'}">
                <div class="warpper box-flex1">
                  <ul class="box-flex1 bg-white cut-height">
                    <li class="clearfix">
                      <span class="ys_tit">面积(平米)：</span>
                    </li>
                    <li class="clearfix bg_gray">
                      <div class="ys_item_con fl">
                        <span v-for="a in areaArray" class="ys_tag">{{a ? a + "㎡" : "不限"}}</span>
                      </div>
                      <div class="ys_item_con fl">
                        <div class="price-bot">
                          <input type="tel" id="beginArea" value="" maxlength="5" placeholder="平米"
                                 v-model="size1"><i>----</i>
                          <input type="tel" id="endArea" value="" maxlength="5" placeholder="平米" v-model="size2">
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="warpper box-flex1">
                  <ul class="box-flex1 bg-white cut-height">
                    <li class="clearfix">
                      <span class="ys_tit">价格：</span>
                    </li>
                    <li class="clearfix bg_gray">
                      <div class="ys_item_con fl">
                        <span v-for="a in priceArray" class="ys_tag">{{a ? a + "元" : "不限"}}</span>
                      </div>
                      <div class="ys_item_con fl">
                        <div class="price-bot">
                          <input type="tel" id="beginPrice" value="" maxlength="5" placeholder="元"
                                 v-model="size1"><i>----</i>
                          <input type="tel" id="endPrice" value="" maxlength="5" placeholder="元" v-model="size2">
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="warpper box-flex1">
                  <ul class="box-flex1 bg-white cut-height">
                    <li class="clearfix">
                      <span class="ys_tit">特色：</span>
                    </li>
                    <li class="clearfix bg_gray">
                      <div class="ys_item_con fl">
                        <span v-for="a in featureArray" class="ys_tag" :id="a.id">{{a.topic}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!--筛选条件内容end-->
          </div>
        </div>

        <!--筛选框fixed时替代div-->
        <div  id="pos_block"></div>

        <!--筛选结果start-->
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="20"
          infinite-scroll-immediate-check="checked">
          <li class="ys_listcon pv15" v-for="item in resultData">
            <router-link :to="{path:'/detail',query:{building_id:item.id}}" class="supply_box">
              <div class="supply_price">
                <span>{{item.price}}</span> 元/㎡·天
                <i style="display: block">{{item.max_areas}}㎡</i>
              </div>
              <dl class="supply">
                <dt>
                  <img :src="item.img_path" :alt="item.img_alt">
                  <span class="icon720"><img src="../resources/images/icons/y720-icon.png"></span>
                </dt>
                <dd class="supply_msg_box">
                  <dl>
                    <dd class="supply_house">{{item.building_name}}</dd>
                    <dd class="supply_color ellipsis">{{item.district}}</dd>
                    <dd class="supply_color ellipsis">{{item.lpkzfy}}套房源可租</dd>
                    <dd>
                      <dl class="supply_tag clearfix" v-if="item.label !=null">
                        <dd v-for="item in item.label.split(',')" class="tagClass">{{item}}</dd>
                      </dl>
                    </dd>
                  </dl>
                </dd>
              </dl>
            </router-link>
          </li>
        </ul>
        <p v-if="loading" class="page-infinite-loading">
          <mt-spinner type="fading-circle"></mt-spinner>
        </p>
      </div>
      <div class="mask" id="maskEl" @click="closeFilter"
           :class="{show:this.currentFilterTab=='district'||this.currentFilterTab=='features'}">
      </div>
    </section>
  </div>
</template>
<script>
  import header1 from '../components/header.vue';
  import footer1 from '../components/footer.vue';
  import {Indicator} from 'mint-ui';
  import {InfiniteScroll} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import {Actionsheet} from 'mint-ui';
  import {Search} from 'mint-ui';
  import axios from 'axios';
  import qs from 'qs';
  export default {
    components: {
      header1,
      footer1,
      InfiniteScroll,
      Toast,
      Actionsheet,
      Search
    },
    data () {
      return {
        districtArray: [],
        govDistrictArray: [],
        lineArray:[],
        subBuesiness:[],
        otherBusiness:[],
        stationArray:[],
        priceFilter: "",
        areaFilter: "",
        areaArray:["", "<100", "100-299", "300-499", "500-599", "1000-1499", ">1500"],
        priceArray:["", "<3", "3-4.9", "5-7.9", "8-9.9", "10-14.9", ">=15"],
        featureArray: [],

        pricePArray: [],
        priceTArray: [],
        sizeArray: [],
        subBuesiness:[],
        stationArray:[],
        curTab:'',
        thirdpart:'',
        currentFilterTab: 'nth',
        priceFilterTab: 'p',
        positionType:'a',
        loading: false,
        noMore: false,
        checked: false,
        price1: '',
        price2: '',
        size1: '',
        size2: '',
        para: {
          "search_keywork": "",
          "district": "",
          "business": "",
          "district1": "",
          "business1": "",
          "line_id": "",
          "station_id": "",
          "area": "",
          "price_dj": "",
          "price_zj": "",
          "label": "",
          "orderby": "D",
          "curr_page": 1,
          "items_perpage": 10,
        },
        resultData: []
      }
    },
    mounted(){
      this.init();

      //下滑时，条件tab固定
      $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
          $('.filtate-outter').css({
            position: 'fixed',
            top: '.88rem',
            left: 0
          });

          $('#pos_block').show();

        } else {
          $('.filtate-outter').css({
            position: 'relative',
            top: 0,
            left: 0
          });
          $('#pos_block').hide();
        }
      });
    },
    created: function () {

    },
    computed: {
      unitword(){
        if (this.priceFilterTab === 'p') {
          return "元/天";
        } else {
          return "万元/月";
        }
      }
    },
    methods: {
      init(){
        axios.defaults.baseURL = this.$api; 
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
        if(this.$route['query']['keyword']){
          this.para.search_keywork = this.$route['query']['keyword'];
        }
        this.resetGetData();
        this.getFilters();
      },
      getTsbq(){
          Indicator.open({
             text: '',
             spinnerType: 'fading-circle'
          });
          const url = this.$api + "/yhcms/web/lpjbxx/getTsbq.do";
          let that = this;
          this.$http.post(url).then((res)=>{
            Indicator.close()
            const data = JSON.parse(res.bodyText).data;
            that.featureArray = data;
          }, (res)=>{
            Indicator.close()
          });
      },
      searchSubArea:function(code,e){
        this.curTab = "a";
        this.thirdpart = "sq";
        Indicator.open({
           text: '',
           spinnerType: 'fading-circle'
        });
        var paraObj = {"parameters":{"district":code},"foreEndType":2,"code":"300000010"}, this_ = this;
        axios.post('/yhcms/web/lpjbxx/getLpXzqyFq.do', paraObj)
          .then(function (response) {
            Indicator.close();
            this_.subBuesiness = response.data.data.xzfq;
          }).catch(function (error) {
            Indicator.close();
        });
      },
      searchArea:function(code,e){
        this.curTab = "y";
        this.thirdpart = "sq";
        Indicator.open({
           text: '',
           spinnerType: 'fading-circle'
        });
        var paraObj = {"parameters":{"district":code},"foreEndType":2,"code":"300000012"}, this_ = this;
        axios.post('/yhcms/web/lpjbxx/getLpYwqyFq.do', paraObj)
          .then(function (response) {
            Indicator.close();
            this_.otherBusiness = response.data.data.ywfq;
          }).catch(function (error) {
            Indicator.close();
        });
      },
      searchStation:function(line,e){
        this.curTab = "l";
        this.thirdpart = "dt";
        Indicator.open({
           text: '',
           spinnerType: 'fading-circle'
        });
        var paraObj = {"parameters":{"line_id":line},"foreEndType":2,"code":"30000008"}, this_ = this;
        axios.post('/yhcms/web/lpjbxx/getLpSubwaystation.do', paraObj)
          .then(function (response) {
            Indicator.close();
            this_.stationArray = response.data.data.subway_station;
          }).catch(function (error) {
            Indicator.close();
        });
      },
      setPriceFilter(){
          if(this.priceFilter === '' || this.priceFilter === 'P1'){
              this.priceFilter = 'P2';
          }
          else{
              this.priceFilter = 'P1';
          }
          this.areaFilter = '';
          this.resetGetData();
      },
      setAreaFilter(){
          if(this.areaFilter === '' || this.areaFilter === 'P1'){
              this.areaFilter = 'P2';
          }
          else{
              this.areaFilter = 'P1';
          }
          this.priceFilter = '';
          this.resetGetData();
      },
      getQueryString: function (key) {
        var t = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i"),
          n = window.location.search.substr(1).match(t);
        return null != n ? decodeURI(n[2]) : "";
      },
      closeFilter: function () {
        this.currentFilterTab = 'nth';
      },
      changeRou: function () {
        this.$router.push({path: '/filter'})
      },
      searchChoose: function (code, val, value, e) {
        switch ($(e.target).closest('li').attr('data-type')) {
          case 'positionA':
            //行政区域
            $('h2.district-h').html(value);
            this.para.business1 = code;
            this.para.business = "";
            this.para.district1 = "";
            this.para.district = "";

            this.para.line_id = '';
            this.para.station_id = '';
            break;
          case 'positionY':
            //业务区域
            $('h2.district-h').html(value);
            this.para.business = code;
            this.para.business1 = "";
            this.para.district1 = "";
            this.para.district = "";
            this.para.line_id = '';
            this.para.station_id = '';
            break;
          case 'positionL':
            $('h2.district-h').html(value);
            this.para.station_id = code;
            this.para.business = '';
            this.para.district = '';
            this.para.business1 = '';
            this.para.district1 = '';
            break;
          case 'size':
            $('h2.area-h').html(value);
            if(code==''){
              this.para.area = '';
            }else{
              this.para.area = [parseInt(val.split('-')[0]), parseInt(val.split('-')[1])];
            }
            break;
          case 'priceP':
            $('h2.price-h').html(value);
            if(code==''){
              this.para.price_dj = '';
            }else{
              this.para.price_dj = [parseInt(val.split('-')[0]), parseInt(val.split('-')[1])];
            }
            break;
          case 'priceT':
            $('h2.price-h').html(value);
            if(code==''){
              this.para.price_zj ='';
            }else{
              this.para.price_zj = [parseInt(val.split('-')[0]), parseInt(val.split('-')[1])];
            }
            break;
          case 'feature':
            $('h2.feature-h').html(value);
            this.para.label = code;
            break;
          default:
        }
        this.currentFilterTab = 'nth';
        Indicator.open({
          text: '',
          spinnerType: 'fading-circle'
        });
        this.resultData = [];
        this.getData();
      },
      getGovDistrict(){
          Indicator.open({
             text: '',
             spinnerType: 'fading-circle'
          });
          const url = this.$api + "/yhcms/web/lpjbxx/getLpcity.do";
          let that = this;
          this.$http.post(url).then((res)=>{
            Indicator.close()
            const data = JSON.parse(res.bodyText).data;
            that.govDistrictArray = data.xzqy;
          }, (res)=>{
            Indicator.close()
          });
      },
      getDistrict(){
          Indicator.open({
             text: '',
             spinnerType: 'fading-circle'
          });
          const url = this.$api + "/yhcms/web/lpjbxx/getLpBusiness.do";
          let that = this;
          this.$http.post(url).then((res)=>{
            Indicator.close()
            const data = JSON.parse(res.bodyText).data;
            that.districtArray = data.ywqy;
          }, (res)=>{
            Indicator.close()
          });
      },
      getLines(){
          Indicator.open({
             text: '',
             spinnerType: 'fading-circle'
          });
          const url = this.$api + "/yhcms/web/lpjbxx/lpsubway.do";
          let that = this;
          this.$http.post(url).then((res)=>{
            Indicator.close()
            const data = JSON.parse(res.bodyText).data;
            that.lineArray = data.subway;
          }, (res)=>{
            Indicator.close()
          });
      },
      getFilters: function () {
        this.getGovDistrict();
        this.getDistrict();
        this.getLines();
        this.getTsbq();
      },
      chooseFilter: function (e) {
        var e = e || window.event;
        this.currentFilterTab = $(e.target).closest('li').attr('data-type')
      },
      resetGetData: function () {
        var paraObj = {
          "parameters": {
            "search_keywork": this.para.search_keywork,
            "district": this.para.district,
            "business": this.para.business,
            "district1": this.para.district1,
            "business1": this.para.business1,
            "line_id": this.para.line_id,
            "station_id": this.para.station_id,
            "area": this.para.area,
            "price_dj": this.para.price_dj,
            "price_zj": this.para.price_zj,
            "label": this.para.label,
            "orderby": this.priceFilter || this.areaFilter || "D",
            "curr_page": this.para.curr_page,
            "items_perpage": 10
          },
          "foreEndType": 2,
          "code": "30000001"
        }, this_ = this;
        let successCb = function (result) {
          Indicator.close();
          if (result.data.data.buildings.length < this_.para.items_perpage) {
            this_.noMore = true;
          }
          this_.resultData = this_.resultData.concat(result.data.data.buildings)
          if (this_.resultData.length == 0) {
            Toast({
              message: '抱歉,暂无符合条件的房源!',
              position: 'middle',
              duration: 3000
            });
          }
        };
        let errorCb = function (result) {
          Indicator.close();
          Toast({
            message: '抱歉,暂无符合条件的房源!',
            position: 'middle',
            duration: 3000
          });
        };
        Indicator.open({
          text: '',
          spinnerType: 'fading-circle'
        });
        this.resultData = [];
        this.gRemoteData(paraObj, successCb, errorCb);
      },
      selfInputPrice: function () {
        if (parseInt(this.price1) < parseInt(this.price2)) {
          if (this.priceFilterTab === 'P') {
            this.para.price_dj = [parseInt(this.price1), parseInt(this.price2)]
          } else {
            this.para.price_zj = [parseInt(this.price1), parseInt(this.price2)]
          }
          this.getData();
        } else {
          Toast({
            message: '请输入合理价格',
            position: 'middle',
            duration: 2000
          });
        }
      },
      selfInputSize: function () {
        if (parseInt(this.size1) < parseInt(this.size2)) {
          this.para.area = [parseInt(this.size1), parseInt(this.size2)];
          this.getData();
        } else {
          Toast({
            message: '请输入合理面积数字',
            position: 'middle',
            duration: 2000
          });
        }
      },

      getData(){
        const paraObj = {
          "parameters": {
            "search_keywork": this.para.search_keywork,
            "district": this.para.district,
            "business": this.para.business,
            "district1": "",
            "business1": "",
            "line_id": this.para.line_id,
            "station_id": this.para.station_id,
            "area": this.para.area,
            "price_dj": this.para.price_dj,
            "label": this.para.label,
            "orderby": "D",
            "curr_page": this.para.curr_page,
            "items_perpage": 10
          },
          "foreEndType": 2,
          "code": "30000001"
        }, this_ = this;

        this.currentFilterTab = 'nth';
        let successCb = function (result) {
          Indicator.close();
          this_.loading = false;
          this_.resultData = this_.resultData.concat(result.data.data.buildings);
          if (result.data.data.buildings < this_.para.items_perpage) {
            this_.noMore = true;
          }
          if (this_.resultData.length == 0) {
            Toast({
              message: '抱歉,暂无符合条件的房源!',
              position: 'middle',
              duration: 3000
            });
          } else if (this_.resultData.length > 0 && result.data.data.buildings.length == 0) {
            Toast({
              message: '已经获得当前条件的所有房源!',
              position: 'middle',
              duration: 3000
            });
          }
        };
        let errorCb = function (result) {
          Indicator.close();
          Toast({
            message: '抱歉,暂无符合条件的房源!',
            position: 'middle',
            duration: 3000
          });
        };
        this.gRemoteData(paraObj, successCb, errorCb);
      },

      gRemoteData(paraobj, successcb, errorcb){
        axios.post('/yhcms/web/lpjbxx/getZdLpjbxx.do', paraobj)
          .then(function (response) {
            if (typeof successcb === "function") {
              successcb(response)
            }
          }).catch(function (error) {
          if (typeof errorcb === "function") {
            errorcb(error)
          }
        });
      },

      loadMore(){
        if (!this.loading && !this.noMore) {
          this.loading = true;
          this.para.curr_page += 1;
          this.getData();
        }
      }
    },
  }
</script>
