<template>
	<div class="big_con">
		<div class="header">
			<div class="logo"></div>
		</div>
		<ul class="form_list">
			<li>
				<p class="ion"></p>
				<p class="inp">
					<input type="number" placeholder="请输入您的手机号" v-model.trim="phone" maxlength="11"/>
				</p>
			</li>
			<li>
				<p class="ion"></p>
				<p class="inp">
					<input type="number" placeholder="请输入您的验证码" v-model="verificode"/>
				</p>
				<p class="get_code" @click="getCode">{{!show?'重新获取' + count + 's':'获取验证码'}}</p>
			</li>
		</ul>
		<div class="btn_login" @click="login_in">绑定</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import wx from 'weixin-js-sdk';
	import { Toast } from 'mint-ui';
    import { Indicator } from 'mint-ui';
	import { MessageBox } from 'mint-ui'; //弹窗
//	import '../resources/js/flexible.js';
//	import '../resources/js/flexible_css.js';
	export default {
	    data () {
	      return {
	      	phone: null, //电话
            verificode: null, //验证码
			show: true,
			count: '',
			timer: null,
	      }
	  	},
	  	created(){
	  		
	  	},
	  	methods:{
	  		getCode(){
				//手机号码验证
				if(this.phone == '' || this.phone == null){
					Toast({
					  message: '手机号不能为空',
					  position: 'center',
					  duration: 1000
					});
                    return;
				}
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){
					Toast({
					  message: '您输入的手机号格式有误',
					  position: 'center',
					  duration: 2000
					});
					return;
				}
				//验证码倒计时
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.send_code();//发送验证码
					$('.get_code').css({
						'color':'#8590b9'
					});
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 1 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
							$('.get_code').css({
								'color':'#8590b9'
							});
						}
					}, 1000)
				}
			},
			send_code(){
				var _this = this;
				const url = this.$api + "/yhcms/web/qduser/getUser.do";
				axios.post(url,{//查询用户是否注册
					"parameters":{
						"phone": _this.phone,
					},
					"foreEndType":2,
					"code":"4"
				}).then((res)=>{
					var result = res.data;
					if(result.success){
						//没有账号
						Toast({
							message: "该用户尚未注册",
							position: 'center'
						});
						// 手机号置空，清除定时器
						this.phone = null;
						this.show = true;
						clearInterval(this.timer);
						this.timer = null;
						$('.get_code').css({
							'color':'#8590b9',
						});
						return false;
						
					}else{
						//已有账号
						//可以注册 发送验证码   获取当前的cookie
						const sjsd = {"sjs":(new Date)};
						localStorage.setItem('cooknxcode', JSON.stringify(sjsd));
						const user22 = JSON.parse(localStorage.getItem('cooknxcode'));
						const url = _this.$api + "/yhcms/web/qduser/getCode.do";
						axios.post(url,{
							"parameters":{
								"cookie": user22.sjs,
								"phone": _this.phone,
							},
							"foreEndType":2,
							"code":"14"
						}).then((res)=>{
							var result = res.data;
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
								return false;
							}
						}, (err)=>{
							console.log(err);
						});
					
					}
				}, (err)=>{
					console.log(err);
				});
			},
			login_in(){
				if(this.phone==''||this.phone==null){
					Toast({
						message: '手机号不能为空！',
						position: 'bottom',
						duration: 1000
					});
					return false;
				}
				if(this.verificode==''||this.verificode==null){
					Toast({
						message: '验证码不能为空！',
						position: 'bottom',
						duration: 1000
					});
					return false;
				}
				// 验证码验证 + 成功后登陆
				const user22 = JSON.parse(localStorage.getItem('cooknxcode'));
				const url = this.$api + "/yhcms/web/qduser/compareCode.do";
				let _this = this;
				axios.post(url,{
					"parameters":{
						"cookie": user22.sjs,
						"code": _this.verificode,
					},
					"foreEndType": 2,
					"code": "15"
				}).then((res)=>{
					var result = res.data;
					if(result.success){//验证成功
						//验证成功与微信建立绑定
						let url = this.$api + "/yhcms/web/qduser/authBind.do";
						var nxopenid = localStorage.getItem('nxopenid');//用户openid
						axios.post(url,{
							"cookie": "",
							"openid": nxopenid,
							"phone": _this.phone
						}).then((res)=>{
							let result = res.data;
							if(result.success){
								console.log(res);
								const sjsd = {"sjs":(result.cookie)};
		                        localStorage.setItem('cooknx', JSON.stringify(sjsd));
		                        const msg = {"user": name,"time":(new Date).getMilliseconds()};
		                        localStorage.setItem('loginnx', JSON.stringify(msg));
		                        localStorage.setItem('usernx', JSON.stringify(result.uname));
		                        let ss = JSON.parse(localStorage.getItem('usernx'));
		                        Toast({
		                            message: '登录成功',
		                            position: 'bottom',
		                            duration: 1000
		                        });
		                        setTimeout(function(){
		                            _this.$router.push({path:'/'});
		                        },1000);
		                    }
						}, (err)=>{
							console.log(err);
						});
						
					}else{//验证失败
						// this.verificode = null;
						Toast({
							message: result.message,
							position: 'bottom'
						});
						return false;
					}
				}, (err)=>{
					console.log(err);
				});
			},
			to_regeit(){
				this.$router.push({path:'/register'});
			}
			
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
		background: #fff;
		overflow: hidden;
	}
	.header{
		display: flex;
		display: -webkit-flex;
		align-items: flex-end;
		-webkit-align-items: flex-end;
		justify-content: center;
		-webkit-justify-content: center;
		height: 2.45rem;
	}
	.logo{
		width: 1.18rem;
		height: 1.25rem;
		background: url(../resources/images/invite/wechat.png) no-repeat center;
		background-size: 100% auto;
	}
	.form_list{
		/*border: 1px solid blue;*/
		padding: 0 0.3rem;
	}
	.form_list li{
		position: relative;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		-webkit-align-items: center;
		height: 0.9rem;
		margin-top: 0.45rem;
	}
	.form_list li::after{
		position: absolute;
		left: 0;
		bottom: 0;
		content: "";
		display: block;
		height: 1px;
		width: 100%;
		border-bottom: 1px solid #d3dfef;
		transform: scaleY(0.5);
	}
	.form_list li{
		padding-left: 0.28rem;
	}
	.form_list li:first-child .ion{
		width: 0.29rem;
		height: 0.38rem;
		background: url(../resources/images/invite/icon-phone.png) no-repeat center;
		background-size: 0.25rem  0.38rem;
	}
	.form_list li:last-child .ion{
		width: 0.29rem;
		height: 0.35rem;
		background: url(../resources/images/invite/icon-yzm.png) no-repeat center;
		background-size: 100% auto;
	}
	.form_list li .inp{
		height: 100%;
	}
	.form_list li input{
		/*385px*/
		width: 3.85rem;
		height: 100%;
		outline: none;
		border: none;
		font-size: 0.28rem;
		padding-left: 0.4rem;
	}
	.form_list li:last-child input{
		width: 3rem;
	}
	.get_code{
		flex: 1;
		height: 100%;
		line-height: 0.9rem;
		font-size: 0.28rem;
		color: #8590b9;
		text-align: right;
		padding-right: 0.1rem;
	}
	.btn_login{
		width: 5.9rem;
		height: 0.88rem;
		line-height: 0.88rem;
		margin: 0.8rem auto 0;
		border-radius: 0.1rem;
		background: url(../resources/images/invite/btn_bg.png) no-repeat center;
		background-size: 100% auto;
		font-size: 0.3rem;
		color: #fff;
		text-align: center;
		letter-spacing: 0.1rem;
	}
</style>