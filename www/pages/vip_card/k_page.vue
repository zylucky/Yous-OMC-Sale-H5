<template>
	<div class="larger">
		<div class="masonry omcnxdis omcnxjtec">
			<div class="masonryImg"></div>
		</div>
		<div class="omcnxdis omcnxjtec activated">已激活成功！</div>
		<div class="omcnxdis omcnxjtec plase">请在24小时内登录亮狮企服商城查看！</div>
		<div class="omcnxdis omcnxjtec topsc">
			<div class="shopmall" @click="clshop">去商城逛逛</div>
		</div>
		<div class="omcnxdis omcnxjtec toptemtj">
			<div class="xianh omcnxdis omcali omcnxjtec">
				<div></div>
			</div>
			<div class="Popular">热门推荐</div>
			<div class="xianh omcnxdis omcali omcnxjtec xianerwi">
				<div></div>
			</div>
		</div>
		<div class="imnglist omcnxdis">
			<div class="lardiygwi" @click="cldbgy">
				<div class="yiziimg"></div>
				<div class="gdbgsz topxinadd">简约办公桌椅组合</div>
				<div class="gdbgsz manyco">￥398.00-2580.00</div>
			</div>
			<div class="lardiygwi ergelef" @click="clsfzh">
				<div class="sssfimg"></div>
				<div class="gdbgsz topxinadd">时尚办公沙发组合</div>
				<div class="gdbgsz manyco">￥680.00-2600.00</div>
			</div>
		</div>
		<div class="imnglist omcnxdis topshb">
			<div class="lardiygwi" @click="clbgsx">
				<div class="kdgwimg"></div>
				<div class="gdbgsz topxinadd">办公首选极速企业宽带</div>
				<div class="gdbgsz manyco">￥6590.00-6590.00</div>
			</div>
			<div class="lardiygwi ergelef" @click="clcyzs">
				<div class="zxzsimg"></div>
				<div class="gdbgsz topxinadd">创意装饰装修专属空间</div>
				<div class="gdbgsz manyco">￥99999.00-99999.00</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			
		},
		mounted(){
			$('title').html('已绑定VIP卡');
		},
		methods: {
			clshop(){
				window.location.href = 'https://h5.youzan.com/wscshop/feature/dYBdpXeQ57?sf=wx_sm&is_share=1';
			},
			cldbgy(){
				window.location.href = 'https://shop41220908.youzan.com/wscshop/goods/2xj1p55f6r92c?alias=2xj1p55f6r92c&sf=wx_sm&is_share=1';
			},
			clsfzh(){
				window.location.href = 'https://shop41220908.youzan.com/wscshop/goods/2fmsg2d963xwk?reft=1543542493301&spm=f72143164&sf=wx_sm&is_share=1';
			},
			clbgsx(){
				window.location.href = 'https://shop41220908.youzan.com/wscshop/goods/36blay0ajc0k4?alias=36blay0ajc0k4&sf=wx_sm&is_share=1';
			},
			clcyzs(){
				window.location.href = 'https://shop41220908.youzan.com/wscshop/goods/3f5eamlwul4ms?reft=1543543099042&spm=f72604234&sf=wx_sm&is_share=1';
			},
		},
	}
</script>

<style scoped lang='less'>
@import "../../resources/css/reset.css";
@import "../../resources/css/base.less";
	.larger{position: absolute;top: 0rem;bottom: 0rem;left: 0rem;right: 0rem;margin: 0rem;padding: 0rem;background-color: #f6f6f6;}
	.masonry{margin-top: 0.58rem;}
	.masonryImg{width: 1.42rem;height: 1.44rem;background:url(../../resources/images/masonryWjimg.png) no-repeat;background-size: 100% auto;}
	.omcnxdis{display: flex;}
	.omcnxjtec{justify-content: center;}
	.omcali{align-items: center;}
	.activated{font-size: 0.24rem;color: #ff9000;margin-top: 0.39rem;}
	.plase{font-size: 0.24rem;color: #999999;margin-top: 0.26rem;}
	.topsc{margin-top: 0.5rem;}
	.shopmall{width: 3.3rem;height: 0.8rem;line-height: 0.8rem;text-align: center;color: #ffffff;border-radius: 0.5rem;background:url(../../resources/images/qvshwj.png) no-repeat;background-size: 100% auto;}
	.toptemtj{margin-top: 0.5rem;}
	.xianh{width: 2.91rem;height: 0.44rem;}
	.xianh div{border-top: 1px solid #dddddd;width: 100%;}
	.Popular{font-size: 0.3rem;margin: 0rem 0.14rem;color: #333333;}
	.xianerwi{width: 2.87rem;}
	.imnglist{margin-top: 0.53rem;padding: 0rem 0.19rem;}
	.yiziimg{width: 3.47rem;height: 3.46rem;background:url(../../resources/images/wjyizimg.jpg) no-repeat;background-size: 100% auto;}
	.gdbgsz{font-size: 0.3rem;color: #333333;height: 0.83rem;line-height: 0.83rem;padding-left: 0.11rem;background-color: #ffffff;width: 3.47rem;}
	.manyco{color: #fc4b4b;height: 0.44rem;line-height: 0.3rem;font-size: 0.3rem;padding-left: 0.11rem;background-color: #ffffff;width: 3.47rem;}
	.topxinadd{margin-top: 0.05rem;}
	.lardiygwi{width: 3.47rem;}
	.ergelef{margin-left: 0.18rem;}
	.topshb{margin-top: 0.18rem;}
	.sssfimg{width: 3.47rem;height: 3.46rem;background:url(../../resources/images/shisffwj.jpg) no-repeat;background-size: 100% auto;}
	.kdgwimg{width: 3.47rem;height: 3.46rem;background:url(../../resources/images/kuadifwwj.jpg) no-repeat;background-size: 100% auto;}
	.zxzsimg{width: 3.47rem;height: 3.46rem;background:url(../../resources/images/zxwjzs.jpg) no-repeat;background-size: 100% auto;}
</style>
