import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    loginState:''
}

// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    LOGINSTATE(state){

        var id=sessionStorage.getItem("loginInfo");
        if(!id){
            state.loginState="loginOut"
        }else{
            state.loginState=""
        }
    },
    GETHEADURL(state){
        var loginInfo=sessionStorage.getItem("loginInfo");
        if(loginInfo){
            var param=JSON.parse(loginInfo);
            state.headUrl=param.headUrl
        }
    }
}
// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})