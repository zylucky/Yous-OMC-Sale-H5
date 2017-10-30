<style scoped lang="less">
    @import "../resources/css/reset.css";
    @import "../resources/css/base2.less";
    .pin{
        //border:1px solid red;
        margin: 2.5rem;
        display: none;
    }
    i{
        color:rgb(255,0,0);
    }
</style>
<template>
    <div class="all_elements">
        <div class="build_top">
            <ul class="ys_item_ul mb60">
                <li class="clearfix pr">
                    <span class="ys_tit w224"><i>*</i> 新手机号：</span>
                    <div class="ys_item_con fl" style="width: 3.5rem !important;">
                        <input type="password" value="" v-model="nphone" placeholder="请输入新手机号">
                    </div>
                    <span class="">获取验证码</span>
                </li>
                <li class="clearfix pr">
                    <span class="ys_tit w224"><i>*</i> 验证码：</span>
                    <div class="ys_item_con fl">
                        <input class="npwd" type="password" value="" v-model="yzm" placeholder="请输入验证码">
                    </div>
                </li>
                <div style="margin-top: 0.4rem;">
                    <span style="width: 7.5rem;clear: both;margin-left: 0.2rem;"><img src="../resources/images/icons/icon.jpg"></span>
                    <span style="float: right;width: 6.5rem;margin-right: 0.3rem;">更换手机号不会影响您个人中心的内容和数据您将使用新手机号登录</span>
                </div>
            </ul>
        <a href="javascript:;" class="ys_default_btn mb80" @click="saveAreaMsg">保存</a>
        </div>
    </div>
</template>
<script>

    import { Toast } from 'mint-ui'; //toast
    import { Indicator } from 'mint-ui';
    import crypto from 'crypto';
    import { MessageBox } from 'mint-ui'; //弹窗

    export default {
        data () {
            return {
                nphone:null,
                yzm:null,
            }
        },
        methods: {
            saveAreaMsg(){
                if(this.nphone != null && this.yzm != null){
                    const _this = this;
                    const user22 = JSON.parse(localStorage.getItem('cooknx'));
                    this.$http.post(
                        this.$api + "/yhcms/web/qduser/getUser1.do",
                        {
                            "parameters":{
                                "phone":this.nphone,
                                "cookie":user22.sjs
                            },
                            "foreEndType":2,
                            "code":"5"
                        }
                    ).then(function (res) {
                        Indicator.close();
                        var result = JSON.parse(res.bodyText);
                        if (result.success) {
                            this.$http.post(
                                this.$api + "/yhcms/web/qduser/updatePhoneUser.do",
                                {
                                    "parameters":{
                                        "phone":this.nphone,
                                        "cookie":user22.sjs
                                    },
                                    "foreEndType":2,
                                    "code":"5"
                                }
                            ).then(function (res) {
                                Indicator.close();
                                var result = JSON.parse(res.bodyText);
                                if (result.success) {
                                    Toast({
                                        message: '手机号修改成功！',
                                        position: 'bottom'
                                    });

                                    setTimeout(function(){
                                        _this.$router.push({path:'/per_information'});
                                    },1000);

                                } else {
                                    Toast({
                                        message: result.message,
                                        position: 'bottom'
                                    });
                                }
                            }, function (res) {
                                Indicator.close();
                            });
                        } else {
                            Toast({
                                message: result.message,
                                position: 'bottom'
                            });
                        }
                    }, function (res) {
                        Indicator.close();
                    });
                }else{
                    MessageBox('提示',"必填项不能为空！");
                }
            },
        },
        mounted(){

        },
    }
</script>
