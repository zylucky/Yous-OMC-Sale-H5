<style scoped lang="less">
    @import "../resources/css/reset.css";
    @import "../resources/css/base2.less";
    .tsbq{width:100% !important}
    .headt{width: 100%;background-color: rgb(220,220,220);border: 1px solid rgb(220,220,220);border-bottom: 1px solid rgb(255, 255 ,255); }
    .headcen{background-color: white;width: 1.5rem;height:1.5rem;border-radius:50%;}
    .headers{width:1.7rem;height:2rem;margin: auto;margin-top: .5rem;margin-bottom: .2rem;}
    .headname{width: .8rem;margin: auto;}
</style>
<template>
    <div class="all_elements" style="background-color: rgb(255, 255 ,255);">
        <div class="build_top">
            <div class="headt">
                <div class="headers">
                    <div class="headcen"><!--<img src="../resources/images/list/del-icon.png">--></div>
                    <div class="headname" v-text="name"></div>
                </div>
            </div>
            <ul class="ys_item_ul mb60">
                <li class="clearfix">
                    <span class="ys_tit" style="width: 2.8rem !important;">您的个人信息还未完善</span>
                    <a href="" style="width: 2.25rem !important;">立即完善</a>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 2.24rem !important;">您的还未实名认证</span>
                    <a href="">立即认证</a>
                </li>
                <li class="clearfix">
                    <span class="ys_tit"><img src=""></span>
                    <div class="ys_item_con fl">个人信息</div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit"><img src=""></span>
                    <div class="ys_item_con fl">我的收藏</div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit"><img src=""></span>
                    <div class="ys_item_con fl">我的预约</div>
                </li>
                <li class="clearfix" @click="modify_pwd">
                    <span class="ys_tit"><img src=""></span>
                    <div class="ys_item_con fl">修改密码</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
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
                "name": "姓名", //
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
            },
            tsbq_t(){
                if(this.tsbq.length < 1){
                    return "请选择标签";
                }
            }
        },
        methods: {
            modify_pwd(){
                this.$router.push({path:'/modify_pwd'});
            },

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
                    that.kfsh = data.kfsh;
                    $('title').html(that.topic);
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
                    that.zxjnjg = data.zxjnjg;
                    that.shyl = data.shyl;
                    that.hshkzbl = data.kzbl;
                    that.zxptmx = data.zxptmx;
                    that.lpsjgs = data.lpsjgs;
                    that.lpsjs = data.lpsjs;
                    that.lpsjfg = data.lpsjfg;
                    //只有查看和空白字段添加的权限
                    if(this.qxzt == 20 || this.qxzt == 30 || this.qxzt == 42){
                        this.saveqx = false;
                        this.teqx = false;
                        if(this.tsbq.length == 0){
                            this.teqx = true;
                            this.saveqx = true;
                        }
                        this.kfsqx = true;
                        if(this.kfsh == ""){
                            this.kfsqx = false;
                            this.saveqx = true;
                        }
                        this.cqxzqx = false;
                        // if(this.chqxz.length == 0){
                        if(data.chqxz==''){
                            this.cqxzqx = true;
                            this.saveqx = true;
                        }
                        this.lpjjqx = true;
                        if(this.zxjnjg == ""){
                            this.lpjjqx = false;
                            this.saveqx = true;
                        }
                        this.zxptqx = true;
                        if(this.zxptmx == ""){
                            this.zxptqx = false;
                            this.saveqx = true;
                        }
                        this.lpsjqx = true;
                        if(this.lpsjgs == ""){
                            this.lpsjqx = false;
                            this.saveqx = true;
                        }
                        this.plsjsqx = true;
                        if(this.lpsjs == ""){
                            this.plsjsqx = false;
                            this.saveqx = true;
                        }
                        this.lpsjsfgqx = true;
                        if(this.lpsjfg == ""){
                            this.lpsjsfgqx = false;
                            this.saveqx = true;
                        }
                        this.kprqqx = false;
                        if(data.kprq == ""){
                            this.kprqqx = true;
                            this.saveqx = true;
                        }
                        this.lpjbqx = false;
                        if(data.lpjb == ""){
                            this.lpjbqx = true;
                            this.saveqx = true;
                        }
                        this.lppzqx = false;
                        if(data.lppz == ""){
                            this.lppzqx = true;
                            this.saveqx = true;
                        }

                    }

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
