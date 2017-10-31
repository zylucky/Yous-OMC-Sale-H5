<style scoped lang="less">
    @import "../resources/css/reset.css";
    @import "../resources/css/website/login.less";

    .page-infinite-loading {
        text-align: center;
        background-color: #FFF;
        & > span {
            display: inline-block;
        }
    }

    .mt5rem {
        margin-top: .5rem;
    }
    .forgor_pwd{
        width: 1.5rem;
        //border:1px solid red;
        float: right;
        a{
            color: white !important;
        }
        margin-top: .2rem;
    }

</style>
<template>
    <div class="all_elements" id="ys_user">
        <div class="all_wrap">
            <div class="login_wrap">
                <div class="login_box" >
                    <div class="inp_item">
                        <div class="inp_bg"></div>
                        <i class="ys_icon user"></i>
                        <input type="text" id="userName"
                               class="mt5rem" value=""
                               v-model.trim="username" placeholder="请输入用户名">
                    </div>
                    <div class="inp_item">
                        <div class="inp_bg"></div>
                        <i class="ys_icon pass"></i>
                        <input type="password" value="" class="mt5rem" v-model.trim="password" placeholder="请输入密码">
                    </div>
                    <div class="forgor_pwd">
                        <a href="javascript:;" @click="forgot_pwd">忘记密码</a>
                    </div>
                    <div class="inp_item login" style="margin-top: .5rem;clear: both;">
                        <a href="javascript:;" style="line-height: 1.4rem;margin-top: .14rem;" class="ys_btn" @click="login">登 录</a>
                    </div>
                    <div class="inp_item login">
                        <a href="javascript:;" style="line-height: 1.4rem;margin-top: .14rem" class="ys_btn" @click="register">注 册</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui'; //toast
    import {Indicator} from 'mint-ui';
    import {MessageBox} from 'mint-ui'; //弹窗
    import crypto from 'crypto';

    export default {
        data () {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            forgot_pwd(){
                this.$router.push({path:'/forgot_pwd'});
            },
            login(){
                const _this = this, un = this.username, pw = this.password;
                if (!un || !pw) {
                    MessageBox('提示', '请输入用户名和密码');
                    return;
                }

                const sha1 = crypto.createHash('sha1'), md5 = crypto.createHash('md5');
                sha1.update(this.password);
                const pwd = sha1.digest('hex');
                const sjsd = {"sjs":(new Date)};
                localStorage.setItem('cooknx', JSON.stringify(sjsd));
                let user22 = JSON.parse(localStorage.getItem('cooknx'));
                md5.update(pwd);
                const password = md5.digest("hex");
                this.$http.post(
                    this.$api + "/yhcms/web/qduser/login.do",
                    {
                        "parameters":{
                            "phone":this.username,
                            "upass":password
                        },
                        "cookie":user22.sjs,
                        "foreEndType":2,
                        "code":"8"
                    }
                ).then(function (res) {
                    Indicator.close();
                    var result = JSON.parse(res.bodyText);
                    if (result.success) {
                        const msg = {"user": name,"time":(new Date).getMilliseconds()};
                        localStorage.setItem('loginnx', JSON.stringify(msg));
                        localStorage.setItem('usernx', JSON.stringify(result.uname));
                        let ss = JSON.parse(localStorage.getItem('usernx'));
                        console.log(ss);
                        Toast({
                            message: '登录成功',
                            position: 'bottom',
                            duration: 1000
                        });

                        setTimeout(function(){
                            _this.$router.push({path:'/index'});
                        },1000);

                    } else {
                        Toast({
                            message: '登录失败: ' + result.message,
                            position: 'bottom'
                        });
                    }
                }, function (res) {
                    Indicator.close();
                    Toast({
                        message: '登录失败! 请稍候再试',
                        position: 'bottom'
                    });
                });
            },
            register(){
                this.$router.push({path:'/register'});
            }
        },
        mounted(){
            $('title').html("幼狮科技");
        },
    }
</script>
