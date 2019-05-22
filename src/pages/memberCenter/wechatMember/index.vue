<template>
	<div>
  <el-tabs v-model="activeName" @tab-click="handleClick"   v-if="$route.path!='/wechatMember/detail'">
    <el-tab-pane label="微信会员卡" name="first"></el-tab-pane>
    <el-tab-pane label="创建会员卡" name="second"></el-tab-pane>
  </el-tabs>





      <transition >
          <keep-alive>
                <router-view></router-view>
          </keep-alive>
      </transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    data(){
        return {
             activeName: 'first'
        }
    },
     watch: {
    $route(to, from) {    
        if(to.path=="/wechatMember"){
            this.activeName="first"
        }else{
             this.activeName="second"
        }

    },
  },
  mounted(){

      if(this.$route.path=="/wechatMember/creat"){
          this.activeName="second"
      }else{
            this.activeName="first"
      }
  },
	computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'getCount'
      // ...
    ])
  },
   methods: {
    ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
	  'decrement'
    ]),
       handleClick(tab, event) {
        console.log(tab, event);
        if(tab.name=="first"){
            this.$router.push('/wechatMember')
        }else{
             this.$router.push('/wechatMember/creat')
        }
      }
    //...mapActions({
    //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    //})
  }
}
</script>