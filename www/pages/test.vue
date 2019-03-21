<template>
	<div>小手冰凉</div>
</template>

<script>
	export default {
		data () {
			
		},
		mounted(){
// 			var id = this.getUrlStr("house_id");
// 			if(id != null || id != "null"){
// 				localStorage.setItem("yqmtest",id);
// 				alert(localStorage.getItem("yqmtest"));
// 			}
			alert(localStorage.getItem("yqmtest") + ' test');
		},
		methods: {
			getUrlStr(name){
				var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)","i");
				if(reg.test(window.location.href)){
					return unescape(RegExp.$2.replace(/\+/g," "))
				}
				return undefined;
			},
		},
	}
</script>

<style>
</style>
