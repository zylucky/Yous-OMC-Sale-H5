<template>
	<div class="add_card_box">
		<div class="top_box"></div>
		<div class="center">
			<p class="inp_box">
				<input type="number" placeholder="请输入商城登录手机号" v-model="phone"/>
			</p>
			<p class="inp_box inp_box1">
				<span class="yzm">
					<input type="number" placeholder="请输入验证码" v-model="code"/>
				</span>
				<span class="send_btn" @click="getCode">{{!show?'重新获取'+count:'获取验证码'}}</span>
			</p>
			<p class="inp_box">
				<input type="text" placeholder="请输入VIP卡激活码" v-model="actcode"/>
			</p>
			<p class="btn_t" @click="to_active">激活VIP卡</p>
		</div>
		<!-- 注意事项 -->
		<div class="card_bottom">
			<p class="tit_box">
				<span class="tit_l"></span>
				<span class="tit">注意事项</span>
				<span class="tit_r"></span>
			</p>
			<!-- 事项 -->
			<div class="tip_box">
				<p>1、VIP系列卡激活码为8位数随机码，一个激活码只能被激活一次；</p>
				<p>2、激活后将自动获取会员资格或充值卡面金额，24小时内开通；</p>
				<p>3、此卡不兑现不挂失，自激活之日起有效期1年；</p>
				<p>4、最终解释权归亮狮企服商城所有</p>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
	export default {
		data(){
			return{
				show: true,
				count: '',
				timer: null,
				phone: '',
				code: '',
				actcode:'',
			}
		},
		methods:{
			getCode(){
				//手机号码验证
				if(this.phone == ''){
					MessageBox('提示', '请输入您的手机号码！');
					return;
				}
				if(!(/^1[345678]\d{9}$/.test(this.phone))){
					MessageBox('提示', '手机号格式有误！');
					return;
				}
				//验证码倒计时
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.send_code();//发送验证码
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			},
			send_code(){
				const time1 = Date.parse(new Date());
				const sjsd = {"sjs":(time1)};
				localStorage.setItem('cook_code', JSON.stringify(sjsd));
				const url = this.$api + "/yhcms/web/qduser/getCode.do";
				axios.post(url,{
					"parameters":{
						"phone": this.phone,
						"cookie": JSON.parse(localStorage.getItem('cook_code')).sjs,
					},
					"foreEndType":2,
					"code":"14"
				}).then((res)=>{
					console.log(res);
				}, (err)=>{
					console.log(err);
					if(this.$api = "http://116.62.68.26:8080"){
						Toast({
						message: '网络异常请稍后再试！',
						position: 'center',
						duration: 5000
						});
					}
				});
			},
			yz_code(){//验证验证码
				if(this.code == ''){
					MessageBox('提示', '验证码不能为空！');
					return;
				}else{
					const url = this.$api + "/yhcms/web/qduser/compareCode.do";
					axios.post(url,{
						"parameters":{
							"code": this.code,
							"cookie": JSON.parse(localStorage.getItem('cook_code')).sjs,
						},
						"foreEndType":2,
						"code":"15"
					}).then((res)=>{
						this.activation();//验证激活码 
					}, (err)=>{
						console.log(err);
					});
				}
			},
			activation(){
				if(this.actcode == ''){
					MessageBox('提示', '激活码不能为空！');
					return;
				}else{
					const url = this.$api + "/yhcms/web/vipcard/cardActivation.do";
					axios.post(url,{
							"activationcode":this.actcode,
							"customerphone":this.phone,
						}
					).then((res)=>{
						if(res.data.success){
							if(res.data.status){
								this.$router.push({path: '/k_page'});
							}else{
								MessageBox('提示',res.data.activationcode);
								return;
							}
							
						}else{
							MessageBox('提示',res.data.message);
							return;
						}
					}, (err)=>{
						console.log(err);
					});
				}
			},
			to_active(){
				this.yz_code();//验证验证码
				
			}

		},
		mounted() {
			var _this = this;
		}
	}
</script>

<style scoped lang='less'>
@import "../../resources/css/reset.css";
@import "../../resources/css/base.less";
.add_card_box{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: #00040e;
	overflow: auto;
	-webkit-overflow-scrolling: touch;
}
.top_box{
	height: 4.92rem;
	background: url(../../resources/images/active_bg.jpg) no-repeat center;
	background-size: 100% auto;
}
.card_bottom{
	margin-top: 0.6rem;
	padding-bottom: 0.5rem;
}
.tit_box{
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	-webkit-justify-content: center;
	align-items: center;
	-webkit-align-items: center;
}
.tit_box span{
	display: inline-block;
}
.tit_l{
	width: 1.03rem;
	height: 0.02rem;
	background: url(../../resources/images/card_img/title_bg.png) no-repeat center;
	background-size: 100% auto;
	transform: rotate(180deg);
}
.tit_r{
	width: 1.03rem;
	height: 0.02rem;
	background: url(../../resources/images/card_img/title_bg.png) no-repeat center;
	background-size: 100% auto;
}
.tit{
	font-size: 0.28rem;
	color: #fff;
	text-align: center;
	margin: 0 0.12rem;
}
.tip_box{
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	-webkit-flex-direction: column;
	justify-content: space-around;
	-webkit-justify-content: space-around;
	width: 6.43rem;
	height: 3.45rem;
	background: #050c1d;
	margin: 0.25rem auto 0;
	padding: 0.38rem 0.5rem;
}
.tip_box p{
	font-size: 0.24rem;
	color: #acacac;
	line-height: 0.48rem;
}
.center{
	margin-top: 0.5rem;
}
.inp_box{
	width: 6.08rem;
	height: 0.8rem;
	margin: 0 auto 0.2rem;
	background: #fff;
	border-radius: 0.15rem;
	overflow: hidden;
}
.inp_box input{
	width: 100%;
	height: 100%;
	background: none;
	border: none;
	outline: none;
	padding: 0 0.34rem;
	font-size: 0.24rem;
	color: #333333;
}
.inp_box input::-webkit-input-placeholder{
    color:#ccc;
	font-size: 0.24rem;
}
.inp_box1{
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	-webkit-justify-content: space-between;
	background: none;
}
.inp_box span{
	display: block;
}
.yzm{
	width: 3.85rem;
	height: 0.8rem;
	border-radius: 0.15rem;
	overflow: hidden;
	background: #fff;
}
.yzm input{
	width: 100%;
	height: 100%;
}
.send_btn{
	width: 2.02rem;
	height: 0.8rem;
	line-height: 0.8rem;
	border: 1px solid #b79039;
	border-radius: 0.15rem;
	font-size: 0.24rem;
	color: #fff;
	text-align: center;
}
.btn_t{
	width: 6.08rem;
	height: 0.8rem;
	line-height: 0.8rem;
	margin: 0 auto 0;
	background: url(../../resources/images/card_img/btn_c.png) no-repeat center;
	background-size: 100% 100%;
	font-size: 0.3rem;
	color: #030b13;
	text-align: center;
}
</style>
