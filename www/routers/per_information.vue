<style scoped lang="less">
    @import "../resources/css/reset.css";
    @import "../resources/css/base2.less";

    .page-infinite-loading {
        text-align: center;
        background-color: #FFF;
        & > span {
            display: inline-block;
        }
    }
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
                    <span class=""><a href="javascript:;" @click="chang_phone">更换手机号</a></span>
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
                        <a href="javascript:;" @click="real_name_auth">未实名认证</a>
                    </div>
                </li>
            </ul>
            <div class="common_title">名片</div>
            <div class="image_wrap clearfix mb140">
                <div v-if="hx < 1" class="upload_btn mr10 fl">
                    <input @change='add_img2' id="file_add" tag="hx" type="file">
                </div>
                <div class="img_demo fl pr" v-for='(item,index) in hxList' v-if="item.isdelete==0">
                    <img class="upload_demo_img" :src="item.id==='xxx'? item.url : $prefix + '/' + item.url" alt="" />
                    <i class="delete_icon" tag="hx" @click='delete_img(index, item.id, $event)'></i>
                </div>
            </div>
            <div class="image_wrap clearfix mb140">
                <div v-if="fm < 1" class="upload_btn mr10 fl">
                    <input @change='add_img3' id="file_add" tag="fm" type="file">
                </div>
                <div class="img_demo fl pr" v-for='(item,index) in fmList' v-if="item.isdelete==0">
                    <img class="upload_demo_img" :src="item.id==='xxx'? item.url : $prefix + '/' + item.url" alt="" />
                    <i class="delete_icon" tag="fm" @click='delete_img(index, item.id, $event)'></i>
                </div>
            </div>
            <div>
                <span style="width: 7.5rem;clear: both;margin-left: 0.2rem;"><img src="../resources/images/icons/icon.jpg"></span>
                <span style="float: right;width: 6.5rem;margin-right: 0.3rem;">名片禁止使用Photoshop等修图软件造价，一经发现，将取消合作！</span>
            </div>
        </div>
        <a href="javascript:;" style="clear: both;margin-top: 0.8rem;" class="ys_default_btn mb80" @click.stop.prevent="saveToserver">保存</a>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
    import {Indicator} from 'mint-ui';
    import { MessageBox } from 'mint-ui'; //弹窗

    export default {
        data(){
            return{
                lpid: "",
                zdid: "",
                fyid: "",
                name:'',
                phone:[],
                bindcomp:"",
                project:"",
                fmList:[],
                hxList:[],
                fy: 0,
                hx: 0,
                fm: 0,
                upload: 0,
                uploaded: 0,
                imgqx:2,
                imgxqx:2,
                imghxqx:2,
                imghxxqx:2,
                imgfmqx:2,
                imgfmxqx:2,
                saveqx:true,
            }
        },
        methods:{
            chang_phone(){
                const _this = this, url = this.$api + "/yhcms/web/qduser/getUser.do";
                let that = this;
                this.$http.post(url,
                    {
                        "parameters":{
                            "phone":this.phone,
                        },
                        "foreEndType":2,
                        "code":"1"
                    }
                ).then((res)=>{
                    Indicator.close();
                    var result = JSON.parse(res.bodyText);
                    if(result.success){
                        setTimeout(function(){
                            _this.$router.push({path:'/chang_phone'});
                        },1000);
                    }else{
                        Toast({
                            message: result.message,
                            position: 'bottom'
                        });
                    }
                }, (res)=>{
                    Indicator.close();
                });
            },
            real_name_auth(){
                this.$router.push({path:'/real_name_auth'});
            },
            delete_img(index, id, event){
                const tag = $(event.target).attr("tag"), which = {"fy":"imgList", "hx":"hxList", "fm":"fmList"}[tag];
                if(id !== 'xxx'){
                    this[which][index].isdelete = "1";
                }
                else{
                    this[which].splice(index,1);
                    this.upload -= 1;
                }
                this[tag] -= 1;
            },
            /*图片上传压缩*/
            add_img1(event){
                const images = event.target.files;
                let len = images.length;
                len = Math.min(len, 8 - this.fy);
                for(let i = 0; i < len; ++i){
                    this.append_img(images[i]);
                }
            },
            add_img2(event){
                const images = event.target.files;
                let len = images.length;
                len = Math.min(len, 8 - this.hx);
                for(let i = 0; i < len; ++i){
                    this.append_img(images[i]);
                }
            },
            add_img3(event){
                const images = event.target.files;
                let len = images.length;
                len = Math.min(len, 8 - this.fm);
                for(let i = 0; i < len; ++i){
                    this.append_img(images[i]);
                }
            },
            append_img(image){
                var reader = new FileReader(), type = image.type;
                const tag = $(event.target).attr("tag"), which = {"fy":"imgList", "hx":"hxList", "fm":"fmList"}[tag];
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
            getInitData(){
                const fyid = this.$route.params.fyid;
                this.fyid = fyid;

                this.lpid = sessionStorage.getItem("fy-lp");
                const zdid = sessionStorage.getItem("fy-zd");
                this.zdid = !zdid || zdid === "undefined" ?  "" : zdid;

                Indicator.open({
                    text: '',
                    spinnerType: 'fading-circle'
                });
                const url = this.$api + "/yhcms/web/zdfyxx/getLpZdFyTp.do";
                let that = this;
                this.$http.post(url, {"parameters":{"fyid":fyid},"foreEndType":2,"code":"300000059"}).then((res)=>{
                    Indicator.close()
                    const data = JSON.parse(res.bodyText).data;
                    const data1 = JSON.parse(res.bodyText).data1;
                    that.imgList = data.b3;
                    that.fmList = data.b9;
                    that.hxList = data.b4;
                    that.gjList = data.b7;
                    that.fy = that.imgList.length;
                    that.hx = that.hxList.length;
                    that.fm = that.fmList.length;
                    $('title').html(data1.topic + "一" + data1.zdh + "一" + data1.fybh);
                }, (res)=>{
                    Indicator.close()
                });
            },
            tebqqxpd(){
                let user22 = JSON.parse(localStorage.getItem('cook'));
                const url = this.$api + "/yhcms/web/wxqx/getFyxxqx.do";
                this.$http.post(url, {"cookie":user22.sjs,"fyid":this.$route.params.fyid,"foreEndType":2,"code":"30000008"}).then((res)=>{
                    Indicator.close();
                    const data = JSON.parse(res.bodyText).data;
                    const meg = JSON.parse(res.bodyText).message;
                    this.ryzt = data.ryzt;
                    this.qxzt = data.qxzt;
                    if(data.qxzt == 45 && data.ryzt == 5){
                        MessageBox('提示',"此用户不属于收购部人员！");
                        this.$router.push({path: '/login'});
                    }
                    this.getInitData();
                }, (res)=>{
                    Indicator.close()
                });
            },
            fanhui(){
                window.history.go(-1);
            },
            saveToserver(){
                //开始上传图片
                const that = this;
                let fp = [], fm = [], hx = [];
                const cb = (img, obj) => {
                    if(img.id === "xxx"){
                        const [_, data] = img.url.split(","), [prefix, t] = img.suffix.split('/');
                        that.saveImages(data, t, function(path){
                            obj.push({"id":"", "isdelete":"0", "url":path});
                            that.uploaded += 1;
                            if(that.uploaded >= that.upload){
                                // 新图片上传完成
                                Indicator.close();
                                setTimeout(function(){
                                    that.saveImageData();
                                }, 1000);
                            }
                        });
                    }
                    else{
                        obj.push({"id": img.id, "isdelete": img.isdelete, "url": img.url});
                    }
                };

                if(this.upload > 0){
                    Indicator.open({
                        text: '上传图片中...',
                        spinnerType: 'fading-circle'
                    });
                }

                this.imgList.forEach((img,idx)=> {cb(img, fp)});
                this.imgList = fp;

                this.hxList.forEach((img,idx)=> {cb(img, hx)});
                this.hxList = hx;

                this.fmList.forEach((img, idx)=>{cb(img,fm)});
                this.fmList = fm;

                //保存信息
                if(this.upload < 1){
                    setTimeout(function(){
                        Indicator.close();
                        that.saveImageData();
                    }, 1000);
                }
            },
            saveImages(pic, type, cb){
                const that = this;
                this.$http.post(
                    this.$api + "/yhcms/web/jcsj/uploadPic.do",
                    {"parameters":{ "smallPic":pic,"suffix": "." + type},"foreEndType":2,"code":"300000084"}
                ).then((res)=>{
                    var result = JSON.parse(res.bodyText);
                    if (result.success) {
                        cb && cb(result.data);
                    }
                    else{
                    }
                }, (res)=>{});
            },
            saveImageData(){
                const that = this;
                Indicator.open({
                    text: '保存中...',
                    spinnerType: 'fading-circle'
                });

                let fp = this.imgList.map((item, idx)=>{
                    return {"id": item.id, "isdelete": item.isdelete, "url": item.url};
                });
                let hx = this.hxList.map((item, idx)=>{
                    return {"id": item.id, "isdelete": item.isdelete, "url": item.url};
                });
                let fm = this.fmList.map((item, idx)=>{
                    return {"id": item.id, "isdelete": item.isdelete, "url": item.url};
                });

                const data = {"parameters":{"fyid":this.fyid,"fytp":fp,"hxt":hx,"gjt":this.gjList,"fmtp":fm},"foreEndType":2,"code":"300000082"};
                this.$http.post(
                    this.$api + "/yhcms/web/zdfyxx/saveZdFyTp.do", data).then((res)=>{
                    Indicator.close();
                    var result = JSON.parse(res.bodyText);
                    if (result.success) {
                        Toast({
                            message: '保存成功',
                            position: 'bottom',
                            duration: 1000
                        });
                        let link = '/fang_detail?house_id=';
                        if(this.fyid){
                            link += this.fyid;
                        }
                        /*if(this.zdid){
                         link += '/' + this.zdid;
                         }*/
                        setTimeout(function(){
                            //图片保存成功之后跳转的页面
                            history.go(-1);
                            /* that.$router.push({path:link});*/
                        },1000);
                    } else {
                        Toast({
                            message: '保存失败: ' + result.message,
                            position: 'bottom'
                        });
                    }
                },(res)=>{
                    Indicator.close();
                    Toast({
                        message: '保存失败! 请稍候再试',
                        position: 'bottom'
                    });
                });
            },
        },
        mounted(){
            this.getInitData();
        }
    }

</script>
