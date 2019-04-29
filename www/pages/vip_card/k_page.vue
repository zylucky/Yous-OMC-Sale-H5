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
				<div class="gdbgsz topxinadd">飞利浦（PHILIPS）加湿器</div>
				<div class="gdbgsz manyco">￥408.00</div>
			</div>
			<div class="lardiygwi ergelef" @click="clsfzh">
				<div class="sssfimg"></div>
				<div class="gdbgsz topxinadd">经理桌 简约款贝尔（标准配置）</div>
				<div class="gdbgsz manyco">￥3388.00</div>
			</div>
		</div>
		<div class="imnglist omcnxdis topshb">
			<div class="lardiygwi" @click="clbgsx">
				<div class="kdgwimg"></div>
				<div class="gdbgsz topxinadd">员工椅常规款 Cloud One plus</div>
				<div class="gdbgsz manyco">￥642.00</div>
			</div>
			<div class="lardiygwi ergelef" @click="clcyzs">
				<div class="zxzsimg"></div>
				<div class="gdbgsz topxinadd">车载空气净化器 车载家用两用 可做加湿器</div>
				<div class="gdbgsz manyco">￥359.00</div>
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
				window.location.href = 'https://shop41220908.youzan.com/v2/home?kdt_id=41028740&reft=1551435384198&spm=f.74931534&sf=wx_sm&is_share=1&dc_ps=2164461933355369472.200001';
			},
			cldbgy(){
				window.location.href = 'https://shop41220908.youzan.com/v2/goods/3nlm43otierg4?banner_id=f.78262950~goods~2~8fTFhxEp&reft=1551435384198_1553842620960&spm=f.74931534_f.78262950&sf=wx_sm&is_share=1&dc_ps=2164461933355369472.200001';
			},
			clsfzh(){
				window.location.href = 'https://shop41220908.youzan.com/v2/goods/3evjvwqdqikwk?banner_id=t.102132391~goods~2~M2d5upWi&reft=1553841413261_1553841444664&spm=f.74931534_f.78262950_t.102132391&sf=wx_sm&is_share=1&dc_ps=2164461933355369472.200001';
			},
			clbgsx(){
				window.location.href = 'https://shop41220908.youzan.com/v2/goods/2oro0ne2ph5s4?banner_id=t.102132562~goods~1~8CC1J1Mm&reft=1553841474881_1553841477627&spm=f.74931534_f.78262950_t.102132562&sf=wx_sm&is_share=1&dc_ps=2164461933355369472.200001';
			},
			clcyzs(){
				window.location.href = 'https://shop41220908.youzan.com/v2/goods/36949uvgv0o38?banner_id=f.78572672~goods~9~de2fuzfJ&reft=1553841606597_1553841862517&spm=f.74931534_f.78262950_f.78572672&sf=wx_sm&is_share=1&dc_ps=2164461933355369472.200001';
			},
		},
	}
</script>

<style scoped lang='less'>
@import "../../resources/css/reset.css";
@import "../../resources/css/base.less";
	.larger{position: absolute;top: 0rem;bottom: 0rem;left: 0rem;right: 0rem;margin: 0rem;padding: 0rem;background-color: #f6f6f6;margin-bottom:0.3rem;overflow: auto;}
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
	.yiziimg{width: 3.47rem;height: 3.46rem;background: #fff url(https://img.yzcdn.cn/upload_files/2019/02/12/FqeWR8t_4ggMCL-VtnzfGhQYN9sn.jpg?imageView2%2F2%2Fw%2F750%2Fh%2F0%2Fq%2F75%2Fformat%2Fjpg) no-repeat;background-size: 100% auto;}
	.gdbgsz{font-size: 0.3rem;color: #333333;height: 0.83rem;line-height: 0.83rem;padding-left: 0.11rem;background-color: #ffffff;width: 3.47rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
	.manyco{color: #fc4b4b;height: 0.44rem;line-height: 0.3rem;font-size: 0.3rem;padding-left: 0.11rem;background-color: #ffffff;width: 3.47rem;}
	.topxinadd{margin-top: 0.05rem;}
	.lardiygwi{width: 3.47rem;background: #fff;}
	.ergelef{margin-left: 0.18rem;}
	.topshb{margin-top: 0.18rem;}
	.sssfimg{width: 3.47rem;height: 3.46rem;background:url(https://img.yzcdn.cn/upload_files/2019/03/19/FqxaFx0T6TcHf8oARCTlgoEZtsJa.jpg?imageView2%2F2%2Fw%2F750%2Fh%2F0%2Fq%2F75%2Fformat%2Fjpg) no-repeat;background-size: 100% auto;}
	.kdgwimg{width: 3.47rem;height: 3.46rem;background:url(https://img.yzcdn.cn/upload_files/2019/01/22/FqTwLil5HmPS_bCG8I2i5_GpzKvg.png?imageView2%2F2%2Fw%2F750%2Fh%2F0%2Fq%2F75%2Fformat%2Fpng) no-repeat;background-size: 100% auto;}
	.zxzsimg{width: 3.47rem;height: 3.46rem;background:url(https://img.yzcdn.cn/upload_files/2019/03/29/Fj4FPjMj7kk9sbjEm_yX0JXf0npt.jpg?imageView2%2F2%2Fw%2F750%2Fh%2F0%2Fq%2F75%2Fformat%2Fjpg) no-repeat;background-size: 100% auto;}
</style>
