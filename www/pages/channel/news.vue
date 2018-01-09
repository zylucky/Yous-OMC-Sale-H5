<style scoped lang='less'>
	@import "../../resources/css/reset.css";
  	@import "../../resources/css/base.less";
  	.box{
  		position: absolute;
  		left: 0;
  		top: 0;
  		right: 0;
  		bottom: 0;
  		overflow: auto;
  		padding-left: 0.22rem;
  		padding-top: 0.9rem;
  	}
  	.new_box{
  		display: flex;
  		justify-content: space-between;
  		width: 6.05rem;
  	}
  	.newspic{
  		width: 0.75rem;
  		height: 0.75rem;
  		img{
  			width: 100%;
  		}
  	}
  	.news_list{
  		position: relative;
  		width: 5.1rem;
  		background: #fff;
  		border-radius: 0.08rem;
  		-webkit-box-shadow:0px 1px 3px #DBDAE0; 
  		box-shadow:0px 1px 3px #DBDAE0;
  		margin-bottom: 1.2rem;
  		padding: 0.1rem 0.3rem;
  		.time{
  			position: absolute;
  			top: -0.6rem;
  			left: 50%;
  			margin-left: -1.13rem;
  			display: inline-block;
  			width: 2.26rem;
  			height: 0.45rem;
  			line-height: 0.45rem;
  			background: #d7d7d9;
  			color: #fff;
  			text-align: center;
  			border-radius: 0.08rem;
  		}
  		li{
  			height: 0.5rem;
  			font-size: @font26;
  			/*line-height: 0.5rem;*/
  		}
  		.tip{
  			font-size: @font28;
  		}
  		.title{
  			font-size: @font30;
  			color: #feac00;
  			line-height: 0.5rem;
  		}
  		.price,.huname,.name{
  			color: #969696;
  		}
  		.spzt{
  			color: #0fad60;
  		}
  		li:last-child{
  			line-height: 0.5rem;
  			border-top: 1px solid #e4e4e4;
  		}
  	}
</style>

<template>
	<div class="box">
		<!--佣金确认消息状态-->
		<div class="new_box">
			<p class="newspic">
				<img src="../../resources/images/news/1.png"/>
			</p>
			<p class="news_list">
				<span class="time">12月5日  12:03</span>
				<ul>
					<li class="title" style="color: #0fad60;">佣金确认</li>
					<li class="tip">您有一条佣金信息需确认，请知晓</li>
					<li class="name">申请人：张三</li>
					<li>查看详情</li>
				</ul>
			</p>
		</div>
		<!--审批消息状态-->
		<div class="new_box">
			<p class="newspic">
				<img src="../../resources/images/news/2.png"/>
			</p>
			<p class="news_list">
				<span class="time">12月5日  12:03</span>
				<ul>
					<li class="title">审批</li>
					<li class="tip">您的佣金已审批，请知晓</li>
					<li class="name">申请人：李四</li>
					<li class="spzt">审批通过</li>
					<li>查看详情</li>
				</ul>
			</p>
		</div>
		<!--收款通知消息状态-->
		<div class="new_box">
			<p class="newspic">
				<img src="../../resources/images/news/3.png"/>
			</p>
			<p class="news_list">
				<span class="time">12月5日  12:03</span>
				<ul>
					<li class="title" style="color: #3486f2;">收款通知</li>
					<li class="tip">您的佣金已付款，请注意查收</li>
					<li class="name">申请人：张三</li>
					<li class="price">佣金金额：￥2,568.00</li>
					<li class="huname" style="border: none;line-height: inherit;">收款户名：李明</li>
				</ul>
			</p>
		</div>
		
	</div>
</template>

<script>
import axios from 'axios';
export default{
	data(){
		return{
			userid:'',//用户id
			newData:[],//消息通知数据
		}
	},
	created(){
		this.takeid();
	},
	methods:{
		takeid(){//获取用户id
			var cookxs = JSON.parse(localStorage.getItem('cooknx'));
			console.log(cookxs);
//			const url = "http://116.62.68.26:8080/yhcms/web/qdyongjin/getLoginInfo.do";
			const url = this.$api + "/yhcms/web/qdyongjin/getLoginInfo.do";
			axios.post(url,{
				"cookie":cookxs,
				"ptype":2
           }).then((res)=>{
	           	if(res.data.success){
	//         		console.log(res.data.data.userid)
	             	this.userid = res.data.data.userid
	             	this.takenews();
	           	}else{
	           		return;
	           	}
            }, (err)=>{
				console.log(err);
            });
		},
		takenews(){//接收消息
			const url = "http://erp.youshikongjian.com/receiveMessage/"+ this.userid + "/sys/qd";//消息接口地
			axios.get(url, {
				
			}).then((res)=>{
//				clearInterval(timer);//清楚定时器
				if(res.data.success){
					this.newDate = res.data.data;
					console.log(this.newDate);
//					var timer = setTimeout(this.takenews,2000);//定时查询
				}				
            }, (err)=>{
				console.log(err);
            });
		}
	}
}
</script>
