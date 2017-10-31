<style scoped lang="less">
    @import "../resources/css/reset.css";
    @import "../resources/css/base2.less";
    .tsbq{width:100% !important}
    i{
        color:rgb(255,0,0);
    }
</style>
<template>
    <div class="all_elements">
        <div class="build_top">
            <ul class="ys_item_ul mb60">
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.5rem !important;"><i>*</i>姓名</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model="name" placeholder="请输入真实姓名">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.5rem !important;"><i>*</i>密码</span>
                    <div class="ys_item_con fl">
                        <input type="password" value="" v-model="pwd" placeholder="请设置密码">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.5rem !important;"><i>*</i>确认密码</span>
                    <div class="ys_item_con fl">
                        <input type="password" value="" v-model="apwd" placeholder="请再次确认密码">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.5rem !important;"><i>*</i>电话</span>
                    <div class="ys_item_con fl" style="width: 4rem !important;">
                        <input type="number" value="" v-model="phone" @blur="lose_phone" placeholder="请输入手机号">
                    </div>
                    <span class="">
                        <span v-if="code == 1"><a href="javascript:;" @click="getverificode">获取验证码</a></span>
                        <span v-if="code == 2"><a href="javascript:;" @click="getverificode">59s</a></span>
                        <span v-if="code == 3"><a href="javascript:;" @click="getverificode">重新获取</a></span>
                    </span>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.5rem !important;"><i>*</i>验证码</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model="verificode" @blur="yzverificode" placeholder="请输入验证码">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.5rem !important;">渠道公司</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model="bindcomp" placeholder="绑定公司">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.5rem !important;">所属项目</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model="project" placeholder="所属项目">
                    </div>
                </li>
            </ul>
            <a href="javascript:;" class="ys_default_btn mb80" @click="register">注册</a>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui'; //toast
    import { Indicator } from 'mint-ui'; //toast
    import crypto from 'crypto';
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
                "name": null, //姓名
                "phone":null, //电话
                "verificode": null, //验证码
                "pwd": null, //密码
                "apwd": null, //确认密码
                "bindcomp": "", //渠道公司
                bindcompid:null,//渠道公司的id
                "project": "", //所属项目
                code:1,
            }
        },
        computed:{

        },
        methods: {
            lose_phone(){
                if(this.phone != null){
                    const url = this.$api + "/yhcms/web/qduser/getUser.do";
                    let that = this;
                    this.$http.post(url, {"parameters":{"phone":this.phone},"foreEndType":2,"code":"4"}).then((res)=>{
                        Indicator.close();
                        var result = JSON.parse(res.bodyText);
                        if(result.success){

                        }else{
                            Toast({
                                message: result.message,
                                position: 'bottom'
                            });
                            this.phone = null;
                        }
                    }, (res)=>{
                        Indicator.close();
                    });
                }else{
                    Toast({
                        message: '手机号不能为空！',
                        position: 'bottom'
                    });
                }
            },
            register(){
                if(this.name != null && this.phone != null && this.verificode != null && this.pwd != null && this.apwd != null){
                    const _this = this, user22 = JSON.parse(localStorage.getItem('cooknx'));
                    const url = this.$api + "/yhcms/web/qduser/register.do";
                    let that = this;
                    const sha1 = crypto.createHash('sha1'), md5 = crypto.createHash('md5');
                    sha1.update(this.pwd);
                    const pwd = sha1.digest('hex');
                    md5.update(pwd);
                    const password = md5.digest("hex");
                    this.$http.post(url, {"parameters":{"cookie":user22.sjs,"name":this.name,"phone":this.phone,"pass":password,"gsid":this.bindcompid,"gsname":this.bindcomp,"xmname":this.project},"foreEndType":2,"code":"1"}).then((res)=>{
                        Indicator.close();
                        var result = JSON.parse(res.bodyText);
                        if(result.success){
                            Toast({
                                message: '注册成功',
                                position: 'bottom',
                                duration: 1000
                            });

                            setTimeout(function(){
                                _this.$router.push({path:'/index'});
                            },1000);
                        }else{
                            Toast({
                                message: '注册失败: ' + result.message,
                                position: 'bottom'
                            });
                        }
                    }, (res)=>{
                        Indicator.close();
                    });
                }else{
                    Toast({
                        message: '必填项不能为空！',
                        position: 'bottom'
                    });
                }
            },
            //生成验证码
            getverificode(){
                const _this = this, sjsd = {"sjs":(new Date)};
                localStorage.setItem('cooknx', JSON.stringify(sjsd));
                const user22 = JSON.parse(localStorage.getItem('cooknx'));
                const url = this.$api + "/yhcms/web/qduser/getCode.do";
                let that = this;
                this.$http.post(url,
                    {
                        "parameters":{
                            "cookie":user22.sjs,
                            "phone":this.phone,
                        },
                        "foreEndType":2,
                        "code":"14"
                    }
                    ).then((res)=>{
                    Indicator.close();
                    var result = JSON.parse(res.bodyText);
                    if(result.success){
                        Toast({
                            message: '验证码已发送，请稍等！',
                            position: 'bottom',
                            duration: 1000
                        });
                    }else{
                        Toast({
                            message: '验证码发送失败: ' + result.message,
                            position: 'bottom'
                        });
                    }
                }, (res)=>{
                    Indicator.close();
                });
            },
            //验证验证码
            yzverificode(){
                const user22 = JSON.parse(localStorage.getItem('cooknx'));
                const url = this.$api + "/yhcms/web/qduser/compareCode.do";
                let that = this;
                this.$http.post(url,
                    {
                        "parameters":{
                            "cookie":user22.sjs,
                            "code":this.verificode,
                        },
                        "foreEndType":2,
                        "code":"15"
                    }
                ).then((res)=>{
                    Indicator.close();
                    var result = JSON.parse(res.bodyText);
                    if(result.success){

                    }else{
                        this.verificode = null;
                        Toast({
                            message: result.message,
                            position: 'bottom'
                        });
                    }
                }, (res)=>{
                    Indicator.close();
                });
            },
        },
        mounted(){

        },
    }
</script>
