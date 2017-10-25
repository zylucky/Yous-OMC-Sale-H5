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
                    <span class="ys_tit">姓名</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model="name" placeholder="请输入真实姓名">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit">电话</span>
                    <div class="ys_item_con fl" style="width: 4rem !important;">
                        <input type="text" value="" v-model="phone" placeholder="请输入手机号">
                    </div>
                    <span class="">获取验证码</span>
                </li>
                <li class="clearfix">
                    <span class="ys_tit">验证码</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model="verificode" placeholder="请输入验证码">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit">密码</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model="pwd" placeholder="请设置密码">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit">确认密码</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model="apwd" placeholder="请再次确认密码">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit">渠道公司</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model="bindcomp" placeholder="绑定公司">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit">所属项目</span>
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
                "name": "", //姓名
                "phone":null, //电话
                "verificode": "", //验证码
                "pwd": null, //密码
                "apwd": null, //确认密码
                "bindcomp": "", //渠道公司
                "project": "", //所属项目
            }
        },
        computed:{

        },
        methods: {
            register(){
                this.$router.push({path:'/login'});
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
            fanhui(){
                window.history.go(-1);
            },

        },
        mounted(){

        },
    }
</script>
