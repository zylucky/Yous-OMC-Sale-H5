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
                    <span class="ys_tit w224"><i>*</i> 新密码：</span>
                    <div class="ys_item_con fl">
                        <input class="npwd" type="password" value="" v-model="npwd" placeholder="请设置密码">
                    </div>
                </li>
                <li class="clearfix pr">
                    <span class="ys_tit w224"><i>*</i> 确认密码：</span>
                    <div class="ys_item_con fl">
                        <input type="password" value="" v-model="anpwd" placeholder="请再次确认密码">
                    </div>
                </li>
                <div>
                    <span class="pin"></span>
                </div>
            </ul>
        <a href="javascript:;" class="ys_default_btn mb80" @click="saveAreaMsg">确认修改</a>
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
                npwd:null,
                anpwd:null,
            }
        },
        methods: {
            saveAreaMsg(){
                if(this.npwd != null && this.anpwd != null ){
                    if(this.npwd == this.anpwd){
                        const _this = this;
                        const user22 = JSON.parse(localStorage.getItem('cooknx'));
                        const sha11 = crypto.createHash('sha1'), md51 = crypto.createHash('md5');
                        sha11.update(this.npwd);
                        const npwd1 = sha11.digest('hex');
                        md51.update(npwd1);
                        const npwd = md51.digest("hex");
                        this.$http.post(
                            this.$api + "/yhcms/web/qduser/updateRemPass.do",
                            {
                                "parameters":{
                                    "phone":"",
                                    "cookie":user22.sjs,
                                    "pass":this.npwd
                                },
                                "foreEndType":2,
                                "code":"13"
                            }
                        ).then(function (res) {
                            Indicator.close();
                            var result = JSON.parse(res.bodyText);
                            if (result.success) {
                                Toast({
                                    message: '修改密码成功',
                                    position: 'bottom',
                                    duration: 1000
                                });
                                setTimeout(function(){
                                    _this.$router.push({path:'/index'});
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
                        MessageBox('提示',"两次输入的密码不一样！");
                    }
                }else{
                    MessageBox('提示',"必填项不能为空！");
                }
            },
        },
        mounted(){

        },
    }
</script>
