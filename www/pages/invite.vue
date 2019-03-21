<template>
	<!-- 大块 -->
	<div class="big_con">
		<div class="top">
		</div>
			<!-- 二维码显示区域 -->
			<div class="code_box">
				<!-- 白色背景 -->
				<div class="code_bg">
					<!-- 邀请码 -->
					<div class="yqm_show">
						<span v-for="item in qcode_num">{{item}}</span>
					</div>
					<!-- 二维码 -->
					<div class="qr_code">
						<img :src="'data:image/png;base64,' + qcode" alt="">
					</div>
				</div>
				<!-- 标题 -->
				<div class="tit_box">
					<div class="tit">我的邀请码</div>
				</div>
			</div>
		<div class="bottom">
			<p>面对面扫描二微码邀请好友成为亮狮网渠道伙伴</p>
			<p>或点击右上角的分享发送链接邀请好友成为亮狮网渠道伙伴</p>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import wx from 'weixin-js-sdk';
	export default {
	    data () {
	      return {
	      	qcode: '',//二维码
	      	qcode_num: [],//邀请码
	      }
	  	},
	  	created(){
	  		this.init();
	  	},
	  	methods:{
	  		init(){
	  			const url = this.$api + "/yhcms/web/wxqx/getQRcode.do";
				axios.post(url,{
					"code": 'QURD'
				}).then((res)=>{
					var qcode_num = res.data.code;
					this.qcode = res.data.image;
					for (var i=0; i<qcode_num.length; i++) {
						this.qcode_num.push(qcode_num[i]);
					}
				}, (err)=>{
					console.log(err);
				});
	  		},
	  		wechat_share(){//微信分享
	      	 const url = "http://omc.urskongjian.com/yhcms/web/weixin/share.do";
	      	 var url_share = window.location.href;
	      	 url_share = url_share.split('#')[0];
			 axios.post(url,{
				"url":url_share
		     }).then((res)=>{
		        let we_cs = res.data;   
				//微信签名调取
				wx.config({
			      debug: false, // 开启调试模式
			      appId: we_cs.appId, // 必填，公众号的唯一标识
			      timestamp: we_cs.timestamp, // 必填，生成签名的时间戳
			      nonceStr: we_cs.nonceStr, // 必填，生成签名的随机串
			      signature: we_cs.signature, // 必填，签名
			      jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "getLocation", "scanQRCode", "closeWindow", "addCard", "chooseWxPay","chooseImage", "previewImage", "uploadImage", "downloadImage", "getLocalImgData"]
				});
						
		      }, (err)=>{
						console.log(err);
		      });
	      	},
	      	fx_send(){
		      	wx.ready(()=>{
					wx.onMenuShareAppMessage({
					    title: "邀请", // 分享标题
					    desc: "邀请码", // 分享描述
					    link: location.href,
					    imgUrl: 'http://omc.urskongjian.com:81/yskjapp/shi_ion.png', // 分享图标
					    type: 'link', // 分享类型,music、video或link，不填默认为link
					    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					    success: function () { 

					    },
					    
					    cancel: function () { 

					    }
					});
							
					wx.onMenuShareTimeline({
					    title: "邀请", // 分享标题
					    link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					    imgUrl: 'http://omc.urskongjian.com:81/yskjapp/shi_ion.png', // 分享图标
					    success: function () { 

					    },
					    cancel: function () { 
					    	
					    }
					});
				})
		    },

	  	},
	  	mounted(){
	  		this.wechat_share();//微信配置调用
	  		this.fx_send();
	  		
	  	},

  	}
</script>

<style scoped lang="less">
	@import "../resources/css/reset.css";
	@import "../resources/css/base.less";
	.big_con{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #ebddf8;
		overflow: hidden
	}
	.top{
		position: relative;
		width: 100%;
		height: 5.4rem;
		background: url(../resources/images/invite/top_bg.png) no-repeat center bottom;
		background-size: 100% auto;
		box-sizing: border-box;
	}
	.code_box{
		position: absolute;
		z-index: 99;
		left: 50%;
		margin-left: -3.4rem;
		top: 4.6rem;
		width: 6.8rem;
		height: 5.7rem;
		border-radius: 0.33rem;
		background: #fff;
	}
	.qr_code{
		width: 2.9rem;
		height: 2.9rem;
		margin: 0 auto 0;
	}
	.qr_code img{
		width: 100%;
		height: 100%;
	}
	.tit_box{
		position: absolute;
		top: -0.34rem;
		left: 50%;
		margin-left: -2.225rem;
		width: 4.45rem;
		height: 0.65rem;
		background: url(../resources/images/invite/tit_bg.png) no-repeat center;
		background-size: 100% auto;
	}
	.tit_box .tit{
		position: absolute;
		z-index: 999;
		top: 0;
		left: 50%;
		margin-left: -2.025rem;
		width: 4.05rem;
		height: 0.65rem;
		line-height: 0.65rem;
		background: #732ce5;
		border-radius: 0.1rem;
		font-size: 0.32rem;
		color: #fff;
		text-align: center;
	}
	.code_bg{
		position: absolute;
		z-index: 99;
		height: 100%;
		width: 100%;
		background: #fff;
		border-radius: 0.33rem;
	}
	.yqm_show{
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		width: 2.68rem;
		margin: 0.8rem auto 0.32rem;
	}
	.yqm_show span{
		display: inline-block;
		width: 0.45rem;
		height: 0.59rem;
		line-height: 0.59rem;
		background: #efefef;
		text-align: center;
		font-size: 0.32rem;
		color: #732ce5;
		border-radius: 0.04rem;
	}
	.bottom{
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		-webkit-flex-direction: column;
		align-items: center;
		-webkit-align-items: center;
		position: absolute;
		left: 50%;
		margin-left: -3.4rem;
		bottom: 0.9rem;
		width: 6.8rem;
	}
	.bottom p{
		font-size: 0.24rem;
		color: #a97df0;
	}
</style>
