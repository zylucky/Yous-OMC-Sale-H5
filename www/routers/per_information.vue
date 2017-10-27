<style scoped lang="less">
    @import "../resources/css/reset.css";
    @import "../resources/css/base2.less";
    .tsbq{width:100% !important}
    .upload_btn{
        position: relative;
        input{
            width: 100%;
            height: 100%;
            z-index: 99999;
            opacity: 0;
        }
    }
    .image_wrap {
        .img_demo{
            margin-right: .3rem;
            margin-bottom: .3rem;
        }
    }
</style>
<template>
    <div class="all_elements">
        <div class="build_top">
            <ul class="ys_item_ul mb60">
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.7rem !important;">姓名</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model="name" placeholder="请输入真实姓名">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.7rem !important;">电话</span>
                    <div class="ys_item_con fl" style="width: 4rem !important;">
                        <input type="text" value="" v-model="phone" placeholder="请输入手机号">
                    </div>
                    <span class="">更换手机号</span>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.7rem !important;">渠道公司</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model="bindcomp" placeholder="绑定公司">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.7rem !important;">所属项目</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model="project" placeholder="所属项目">
                    </div>
                </li>
                <li class="clearfix">
                    <span class="ys_tit" style="width: 1.7rem !important;">身份证号</span>
                    <div class="ys_item_con fl">
                        <input type="text" value="" v-model="bindcomp" placeholder="身份证号">
                    </div>
                </li>
            </ul>
            <div class="common_title">名片</div>
            <div class="image_wrap clearfix mb140">
                <div class="upload_btn mr10 fl">
                    <input @change='add_img2' id="file_add" tag="mp" type="file">
                </div>
                <div class="img_demo fl pr" v-for='(item,index) in mpList'>
                    <img class="upload_demo_img" :src="item.id==='xxx'? item.url : $prefix + '/' + item.url" alt="" />
                    <i class="delete_icon" tag="mp" @click='delete_img(index, item.id, $event)'></i>
                </div>
            </div>
            <div><span style="border: 1px solid red;width: 7.5rem;clear: both;">1111</span></div>
            <div>名片禁止使用Photoshop等修图软件造价，一经发现，将取消合作！</div>
            <a href="javascript:;" class="ys_default_btn mb80" @click="register">保存</a>
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
                mp:0,//名片
                mpList:[],
            }
        },
        computed:{

        },
        methods: {
            register(){
                this.$router.push({path:'/login'});
            },
            delete_img(index, id, event){
                const tag = $(event.target).attr("tag"), which = {"fy":"imgList", "mp":"mpList", "fm":"fmList"}[tag];
                if(id !== 'xxx'){
                    this[which][index].isdelete = "1";
                }
                else{
                    this[which].splice(index,1);
                    this.upload -= 1;
                }
                this[tag] -= 1;
            },
            add_img2(event){
                const images = event.target.files;
                let len = images.length;
                len = Math.min(len, 8 - this.mp);
                for(let i = 0; i < len; ++i){
                    this.append_img(images[i]);
                }
            },
            append_img(image){
                var reader = new FileReader(), type = image.type;
                const tag = $(event.target).attr("tag"), which = {"fy":"imgList", "hx":"mpList", "fm":"fmList"}[tag];
                if (!/\/(?:jpeg|jpg|png)/i.test(type)){
                    return;
                }
                var that=this;
                reader.onloadend = () => {
                    let ret;
                    const imgx = new Image();
                    imgx.src = reader.result;
                    imgx.onload = function(){
                        var canvas = document.createElement('canvas');
                        canvas.width = imgx.naturalWidth;
                        canvas.height = imgx.naturalHeight;
                        canvas.getContext("2d").drawImage(imgx, 0, 0);
                        ret = canvas.toDataURL(type, .2);

                        const obj = {
                            id: "xxx",
                            lpid: that.lpid,
                            isdelete: 0,
                            type: 2,
                            suffix:type,
                            url: ret
                        };
                        that[which].push(obj)
                    }
                }
                reader.readAsDataURL(image);
                this[tag] += 1;
                this.upload += 1;
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
