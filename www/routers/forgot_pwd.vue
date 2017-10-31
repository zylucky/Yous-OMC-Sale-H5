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
                    <span class="ys_tit w224"><i>*</i> 电话：</span>
                    <div class="ys_item_con fl"">
                    <input style="width: 65% !important;" type="number" value="" v-model="phone" placeholder="请输入电话">
                    <span class="" @click="getverificode">获取验证码</span>
        </div>

        </li>
        <li class="clearfix pr">
            <span class="ys_tit w224"><i>*</i> 验证码：</span>
            <div class="ys_item_con fl">
                <input class="npwd" type="text" value="" v-model="verificode" placeholder="请输入验证码">
            </div>
        </li>
        <div>
            <span class="pin"></span>
        </div>
        </ul>
        <a href="javascript:;" class="ys_default_btn mb80" @click="saveAreaMsg">下一步</a>
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
                phone:null,
                verificode:null,
            }
        },
        methods: {
            /*getdata(){
                const user22 = JSON.parse(localStorage.getItem('cooknx'));
                this.$http.post(
                    this.$api + "/yhcms/web/qduser/getQdUser.do",
                    {"cookie":user22.sjs,"foreEndType":2,"code":"3"}
                ).then(function (res) {
                    Indicator.close();
                    var result = JSON.parse(res.bodyText);
                    if (result.success) {
                        var data = JSON.parse(res.bodyText).data;
                        console.log(data);

                    } else {
                        Toast({
                            message: result.message,
                            position: 'bottom'
                        });
                    }
                }, function (res) {
                    Indicator.close();
                    Toast({
                        message: '修改密码失败! 请稍候再试',
                        position: 'bottom'
                    });
                });
            },*/
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
            saveAreaMsg(){
                if(this.phone != null && this.verificode != null){
                    const _this = this;
                    this.$http.post(
                        this.$api + "/yhcms/web/qduser/getRemUser.do",
                        {
                            "parameters":{
                                "phone":this.phone
                            },
                            "foreEndType":2,
                            "code":"12"
                        }
                    ).then(function (res) {
                        Indicator.close();
                        var result = JSON.parse(res.bodyText);
                        if (result.success) {
                            setTimeout(function(){
                                _this.$router.push({path:'/reset_pwd/'+_this.phone});
                            },1000);

                        } else {
                            Toast({
                                message: result.message,
                                position: 'bottom'
                            });
                        }
                    }, function (res) {
                        Indicator.close();
                        Toast({
                            message: '修改密码失败! 请稍候再试',
                            position: 'bottom'
                        });
                    });
                }else{
                    MessageBox('提示',"必填项不能为空！");
                }
            },
        },
        mounted(){
            /*this.getdata();*/
        },
    }
</script>
