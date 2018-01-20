import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
	state : {
		data1:'',//滚动条位置
		data2:'',//tab切换状态
		datas:'',//数据存储1
		datas1:'',//数据存储2
		datas2:'',//数据存储3
		page1:'',//当前页
		page:'',//当前页
		page2:'',//当前页
	},
	mutations:{
		openRed(state,obj){//滚动条位置
			state.data1 = obj;
		},
		sendObj(state,obj){//tab状态
			state.data2 = obj;
		},
		saveData(state,obj){//数据1
			state.datas = obj;
		},
		saveData1(state,obj){//数据2	
			state.datas1 = obj;		
		},
		saveData2(state,obj){//数据3	
			state.datas2 = obj;
		},
		savePage(state,obj){//当前页
			state.page1 = obj;
		},
		savePage1(state,obj){//当前页
			state.page = obj;
		},
		savePage2(state,obj){//当前页
			state.page2 = obj;
		}
	}
})