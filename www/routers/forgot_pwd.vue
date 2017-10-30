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
                    <input style="width: 65% !important;" type="password" value="" v-model="phone" placeholder="请输入电话">
                    <span class="">获取验证码</span>
        </div>

        </li>
        <li class="clearfix pr">
            <span class="ys_tit w224"><i>*</i> 验证码：</span>
            <div class="ys_item_con fl">
                <input class="npwd" type="password" value="" v-model="verificode" placeholder="请输入验证码">
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
                                _this.$router.push({path:'/reset_pwd'});
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

        },
    }
</script>
