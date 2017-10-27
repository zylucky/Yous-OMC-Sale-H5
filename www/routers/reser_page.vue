<style scoped lang="less">
    @import "../resources/css/reset.css";
    @import "../resources/css/base2.less";
    .tsbq{width:100% !important}

</style>
<template>
    <div class="all_elements">
        <div class="build_top">
            <ul class="ys_item_ul mb60">
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.5rem !important;">姓名：</span>
                    <div class="ys_item_con fl" v-text="topic"></div>
                </li>
                <li class="clearfix pr">
                    <span class="ys_tit" style="width: 1.5rem !important;">电话：</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model="lpjb" placeholder="请选择" @click="openLevel">
                        <i class="right_arrow" @click="openLevel">&gt;</i>
                    </div>
                </li>
                <li class="clearfix pr">
                    <span class="ys_tit" style="width: 1.5rem !important;">看房时间：</span>
                    <div class="ys_item_con fl">
                        <input type="text" value=""
                               readonly
                               placeholder="请选择看房时间"
                               v-model="kprq"
                               @click="openPicker()">
                        <i class="calendar_icon" style="top:0px !important;" @click="openPicker()">&gt;</i>
                    </div>
                </li>
                <li class="clearfix pr">
                    <span>备注：</span>
                    <textarea style="background-color: white !important;" rows="3" cols="20" placeholder="请输入看房说明"></textarea>
                </li>

            </ul>
            <a href="javascript:;" class="ys_default_btn mb80" @click="saveBuildMsg">提交预约</a>
        </div>

        <!--日期选择-->
        <mt-datetime-picker
                ref="picker"
                v-model="pickerValue"
                type="date"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                :startDate="startDate"
                @confirm="handleConfirm">
        </mt-datetime-picker>

        <!--楼盘级别-->
        <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
            <div class="picker-toolbar">
                <span class="mint-datetime-action mint-datetime-cancel" @click="sureLevel">取消</span>
                <span class="mint-datetime-action mint-datetime-confirm" @click="sureLevel">确定</span>
            </div>
            <mt-picker :slots="slots" @change="selectLevel"></mt-picker>
        </mt-popup>

        <!--楼盘品质-->
        <mt-popup v-model="popQuality" position="bottom" class="mint-popup-4">
            <div class="picker-toolbar">
                <span class="mint-datetime-action mint-datetime-cancel" @click="sureQuality">取消</span>
                <span class="mint-datetime-action mint-datetime-confirm" @click="sureQuality">确定</span>
            </div>
            <mt-picker :slots="slots_quality" @change="selectQuality"></mt-picker>
        </mt-popup>


    </div>
</template>
<script>

    const lang = {
        '优': 1,
        '良': 2,
        '差': 3,
    };

    const level = {
        "5A":"1","甲":"2","乙":"3","公寓":"4","商务":"5","综合":"6"
    };

    import { Toast } from 'mint-ui'; //toast
    import { Indicator } from 'mint-ui'; //toast

    import { MessageBox } from 'mint-ui'; //弹窗

    import {DatetimePicker} from 'mint-ui';  //日期选择

    import {Popup} from 'mint-ui'; //弹窗

    export default {
        components: {
            DatetimePicker,
            Popup
        },

        data () {
            return {
                "lpid": "", //楼盘id
                "topic": "", //楼盘名称
                "address": "", //地址
                "tsbq": [], //特色标签
                "kfsh": "", //开发商名称
                "kprq": "", //开盘日期(必选)
                "lpjb": "", //楼盘级别(必选)
                "chqxz": [], //产权性质
                "lppz": "", //楼盘品质 1优 2良 3差
                "zxjnjg": "", //均价
                "shyl": "",  //使用率
                "hshkzbl": "", //户数空置比例
                "zxptmx": "",  //装修设施配套明细
                "lpsjgs": "", //楼盘设计公司
                "lpsjs": "", //楼盘设计师
                "lpsjfg": "", //楼盘设计风格
                "tsbq_all":[],
                "ryzt":"",//人员状态的权限
                "qxzt":"",//权限状态码

                //特色标签权限的判断
                /*teqx:true,
                 kfsqx:false,
                 cqxzqx:true,
                 lpjjqx:false,
                 zxptqx:false,
                 lpsjqx:false,
                 plsjsqx:false,
                 lpsjsfgqx:false,
                 kprqqx:true,
                 lpjbqx:true,
                 lppzqx:true,
                 saveqx:true,*/
                teqx:0,
                kfsqx:0,
                cqxzqx:0,
                lpjjqx:0,
                zxptqx:0,
                lpsjqx:0,
                plsjsqx:0,
                lpsjsfgqx:0,
                kprqqx:0,
                lpjbqx:0,
                lppzqx:0,
                saveqx:0,


                //日期
                pickerValue: '',
                startDate: new Date("1990-01-01"),

                //楼盘级别
                lpjb: '',
                slots: [
                    {
                        values: ['5A', '甲', '乙', '公寓', '商务', '综合'],
                    }
                ],

                //品质
                slots_quality: [
                    {
                        values: ["优", "良", "差"],  //1优 2良 3差
                    }
                ],



                //级别弹窗显示隐藏
                popupVisible: false,

                //品质弹窗隐藏
                popQuality: false,


            }
        },
        computed:{
            chqxz_c(){
                if(this.chqxz.length < 1){
                    return "请选择标签";
                }
                const map = {"1":"写字楼", "2":"公寓","3":"商务楼","4":"住宅","5":"商业","6":"酒店","7":"综合","8":"别墅","9":"商业综合体","10":"酒店式公寓"};
                let tip = this.chqxz.map((item,idx)=>{return map[item.toString()]});
                return tip.join(",");
            },
            tsbq_t(){
                if(this.tsbq.length < 1){
                    return "请选择标签";
                }
                let tags = this.tsbq.map((t)=>{
                    for(let i = 0; i < this.tsbq_all.length; ++i){
                        if(this.tsbq_all[i].id === t){
                            return this.tsbq_all[i].topic;
                        }
                    }
                });
                return tags.join(",");
            }
        },
        methods: {

            //日期panel展示
            openPicker() {
                this.$refs.picker.open();
            },

            //日期确定
            handleConfirm(value){
                this.kprq = this.transformDate(value);
            },

            //楼盘类型panel展示
            openLevel() {
                //this.lpjb = '乙';
                this.popupVisible = true;
            },


            //选择类型
            selectLevel(picker, values) {
                this.lpjb = values[0];
            },

            //类型确定
            sureLevel(){
                this.popupVisible = false;
            },


            //打开品质
            openQuality(){
                //this.lppz = '差';
                this.popQuality = true;
            },

            //选择品质
            selectQuality(picker, values){
                this.lppz = values[0];
            },

            //品质确定
            sureQuality(){
                this.popQuality = false;
            },


            //打开品质
            openUse(){
                this.shyl = '非常';
                this.popUse = true;
            },

            //选择品质
            selectUse(picker, values){
                this.shyl = values[0];
            },

            //品质确定
            sureUse(){
                this.popUse = false;
            },

            //日期转换
            transformDate: function (date) {
                var str = '';
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                str = year + '-' + this.addZero(month) + '-' + this.addZero(day);
                return str;
            },

            //补零
            addZero(n){
                return n = n < 10 ? '0' + n : '' + n;
            },

            //选择tag
            selectTag(e){
                const target = $(e.target), val = target.attr("value");
                if(!val){return;}

                if ($(e.target).hasClass('active')) {
                    let tsbq_t = new Set(this.tsbq);
                    tsbq_t.delete(val);
                    this.tsbq = [...tsbq_t];

                    $(e.target).removeClass('active');
                } else {
                    let tsbq_t = new Set(this.tsbq);
                    tsbq_t.add(val);
                    this.tsbq = [...tsbq_t];

                    $(e.target).addClass('active');
                }
            },

            //获取后台的数据
            getInitData(){
                const lpid = this.$route.params.lpid;
                Indicator.open({
                    text: '',
                    spinnerType: 'fading-circle'
                });
                const url = this.$api + "/yhcms/web/lpjbxx/getLpjbxx.do";
                let that = this;
                this.$http.post(url, {"parameters":{ "lpid":lpid},"foreEndType":2,"code":"30000008"}).then((res)=>{
                    Indicator.close()
                    const data = JSON.parse(res.bodyText).data;
                    that.lpid = lpid;
                    that.topic = data.topic;
                    that.address = data.address;
                    that.tsbq = data.tsbq.map((t)=>{return t.id});
                    that.kfsh = data.kfsh;
                    $('title').html(that.topic);
                    if(data.kprq!=''){
                        that.kprq = data.kprq.substring(0,10);
                    }
                    if(data.lpjb==1){
                        that.lpjb ="5A" ;
                    }
                    if(data.lpjb==2){
                        that.lpjb ="甲" ;
                    }
                    if(data.lpjb==3){
                        that.lpjb ="乙" ;
                    }

                    if(data.lpjb==4){
                        that.lpjb ="公寓" ;
                    }
                    if(data.lpjb==5){
                        that.lpjb ="商务" ;
                    }
                    if(data.lpjb==6){
                        that.lpjb ="综合" ;
                    }

                    that.chqxz = data.chqxz.split("、");
                    if(data.lppz==1){
                        that.lppz ="优" ;
                    }else  if(data.lppz==2){
                        that.lppz ="良" ;
                    }else  if(data.lppz==3){
                        that.lppz ="差" ;
                    }

                    that.zxjnjg = data.zxjnjg;
                    that.shyl = data.shyl;
                    that.hshkzbl = data.kzbl;
                    that.zxptmx = data.zxptmx;
                    that.lpsjgs = data.lpsjgs;
                    that.lpsjs = data.lpsjs;
                    that.lpsjfg = data.lpsjfg;
                    //this.tebqqxpd();
                }, (res)=>{
                    Indicator.close()
                });
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
                    that.tsbq_all = data;
                }, (res)=>{
                    Indicator.close()
                });
            },

            //特色标签权限的判断
            tebqqxpd(){
                let user22 = JSON.parse(localStorage.getItem('cook'));
                const url = this.$api + "/yhcms/web/wxqx/getLpqx.do";
                this.$http.post(url, {"cookie":user22.sjs,"lpid":this.$route.params.lpid,"foreEndType":2,"code":"30000008"}).then((res)=>{
                    Indicator.close();
                    const data = JSON.parse(res.bodyText).data;
                    const meg = JSON.parse(res.bodyText).message;
                    this.ryzt = data.ryzt;
                    this.qxzt = data.qxzt;
                    console.log("ryzt:"+data.ryzt+",  qxzt: "+data.qxzt);
                    console.log(data.qxzt);
                    //data.qxzt = 11;
                    if(data.qxzt == 0){
                        this.teqx = false;
                        MessageBox('提示',meg);
                        window.history.go(-1);
                        return;
                    }
                    //此用户有所有权限
                    if(data.qxzt == 1 || data.qxzt == 21 || data.qxzt == 31 || data.qxzt == 41 || data.qxzt == 43){
                        this.teqx = true;
                        this.kfsqx = false;
                        this.cqxzqx = true;
                        this.lpjjqx = false;
                        this.zxptqx = false;
                        this.lpsjqx = false;
                        this.plsjsqx = false;
                        this.lpsjsfgqx = false;
                        this.kprqqx = true;
                        this.lpjbqx = true;
                        this.lppzqx = true;
                        this.saveqx = true;
                    }
                    if(data.qxzt == 2){
                        MessageBox('提示',"此用户已被禁用，请联系管理员！");
                        this.$router.push({path: '/login'});
                    }
                    if(data.qxzt == 3){
                        this.$router.push({path: '/login'});
                    }
                    //只有查看权限
                    if(data.qxzt == 11){
                        this.teqx = false;
                        this.kfsqx = true;
                        this.cqxzqx = false;
                        this.lpjjqx = true;
                        this.zxptqx = true;
                        this.lpsjqx = true;
                        this.plsjsqx = true;
                        this.lpsjsfgqx = true;
                        this.kprqqx = false;
                        this.lpjbqx = false;
                        this.lppzqx = false;
                        this.saveqx = false;
                        $("input").attr('placeholder',"");
                    }

                    if(data.qxzt == 46){
                        MessageBox('提示',"此用户不属于收购部人员！");
                        this.$router.push({path: '/login'});
                    }
                    this.getInitData();
                    this.getTsbq();

                }, (res)=>{
                    Indicator.close()
                });
            },
            fanhui(){
                window.history.go(-1);
            },
            saveBuildMsg(){
                var _this = this;
                if(this.topic==''){
                    MessageBox('提示', '请填写楼盘名称');
                    return;
                }

                var tt= this.chqxz.join("、");
                if(tt==''){
                    MessageBox('提示', '请选择产权性质');
                    return;
                }



                /*if(!this.kfsh){
                 MessageBox('提示', '请填写开发商');
                 return;
                 }

                 if(this.kprq == ''){
                 MessageBox('提示', '请选择开盘日期');
                 return;
                 }

                 if(this.lpjb == ''){
                 MessageBox('提示', '请选择楼盘级别');
                 return;
                 }

                 if(!this.lppz){
                 MessageBox('提示', '请选择楼盘品质');
                 return;
                 }*/

                /*
                 Toast({
                 message: '保存成功',
                 position: 'bottom'
                 });
                 */
                Indicator.open({
                    text: '保存中...',
                    spinnerType: 'fading-circle'
                });

                /*
                 setTimeout(function(){
                 _this.$router.push({path:'/list2'});
                 },1000);
                 */
                this.$http.post(
                    this.$api + "/yhcms/web/lpjbxx/saveLp.do",
                    {
                        "parameters": {
                            "lpid": this.lpid, //楼盘id
                            "topic": this.topic, //楼盘名称
                            "address": this.address, //地址
                            "tsbq": "、" + this.tsbq.join("、") + "、", //特色标签
                            "kfsh": this.kfsh, //开发商名称
                            "kprq": this.kprq, //开盘日期(必选)
                            "lpjb": level[this.lpjb], //楼盘级别(必选)
                            "chqxz": this.chqxz.join("、"), //产权性质
                            "lppz": lang[this.lppz], //楼盘品质 1优 2良 3差
                            "zxjnjg": this.zxjnjg, //均价
                            "shyl": this.shyl,  //使用率
                            "hshkzbl": this.hshkzbl, //户数空置比例
                            "zxptmx": this.zxptmx,  //装修设施配套明细
                            "lpsjgs": this.lpsjgs, //楼盘设计公司
                            "lpsjs": this.lpsjs, //楼盘设计师
                            "lpsjfg": this.lpsjfg //楼盘设计风格
                        },
                        "foreEndType": 2,
                        "code": "300000041"
                    }
                ).then(function (res) {
                    Indicator.close();
                    var result = JSON.parse(res.bodyText);
                    if (result.success) {
                        Toast({
                            message: '保存成功',
                            position: 'bottom',
                            duration: 1000
                        });

                        setTimeout(function(){
                            history.go(-1);
                            // _this.$router.push({path:'/index'});
                        },1000);
                    } else {
                        //this.$Message.error(res.message);
                        Toast({
                            message: '保存失败: ' + result.message,
                            position: 'bottom'
                        });
                    }
                }, function (res) {
                    //this.$Message.error('保存失败');
                    Toast({
                        message: '保存失败! 请稍候再试',
                        position: 'bottom'
                    });
                });
            }

        },
        mounted(){
            this.getInitData();

        },
    }
</script>
