<template>
<div style="background:#f1f2f7;overflow:hidden;"  v-loading="loading"
   
>
    <!-- <div flex="dir:left main:justify cross:center" class="index_top">
            <div  flex="dir:left main:justify cross:center">
                 <icon name="消息提醒" scale="20" style="margin-right:10px;" width="22" height="22"></icon>
                asdasdasdasdasdasd
            </div>
            <div class="cursor_pointer" style="margin-right:10px;color:#666;">详情</div>
    </div> -->
    <div class="ml_30 " >
            <el-row :gutter="50">
                    <el-col :xs="24" style="margin-top:15px;margin-bottom:15px;" :sm="24" :md="12" :lg="12" :xl="12" >
                        <div class="pd_20 bf_fff"  >
                                     <div  flex="dir:left main:justify cross:center" >
                                            <div  flex="dir:left  cross:center" style="margin-left:30px;">
                                                    <div  flex="dir:left  cross:center">
                                                           <icon name="用户" scale="20" style="margin-right:10px;" width="50" height="50"></icon>
                                                    </div>
                                                    <div  flex="dir:top main:justify cross:center" class="common_color" >
                                                            <div style="margin-bottom:5px;">
                                                             {{type1.totalCount}}
                                                            </div>
                                                            <div>
                                                                总用户量
                                                            </div>
                                                    </div>  
                                            </div>
                                            <div  flex="dir:top main:justify cross:center" class="common_color" style="border-left:1px solid #666;margin-right:30px;padding:0 20px;">
                                                    <div style="margin-bottom:5px;">
                                                        今日 ：{{type1.todayCount}}
                                                    </div>
                                                    <div>
                                                        昨日 ：{{type1.yesterdayCount}}
                                                    </div>
                                            </div>
                                     </div>
                        </div>
                    </el-col>
                     <el-col :xs="24" style="margin-top:15px;margin-bottom:15px;" :sm="24" :md="12" :lg="12" :xl="12" >
                        <div class="pd_20 bf_fff"  >
                                     <div  flex="dir:left main:justify cross:center" >
                                            <div  flex="dir:left  cross:center" style="margin-left:30px;">
                                                    <div  flex="dir:left  cross:center">
                                                           <icon name="pre_icon_预约取现" scale="20" style="margin-right:10px;" width="50" height="50"></icon>
                                                    </div>
                                                    <div  flex="dir:top main:justify cross:center" class="common_color" >
                                                            <div style="margin-bottom:5px;">
                                                             {{type2.totalCount}}
                                                            </div>
                                                            <div>
                                                                本周总预约数
                                                            </div>
                                                    </div>  
                                            </div>
                                            <div  flex="dir:top main:justify cross:center" class="common_color" style="border-left:1px solid #666;margin-right:30px;padding:0 20px;">
                                                    <div style="margin-bottom:5px;">
                                                        今日 ：{{type1.todayCount}}
                                                    </div>
                                                    <div>
                                                        昨日 ：{{type1.yesterdayCount}}
                                                    </div>
                                            </div>
                                     </div>
                        </div>
                    </el-col>
                    <!-- <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"><div class="pd_20 bf_fff">asdasdasdas</div></el-col> -->
            </el-row>

            <el-row :gutter="50">
                    <el-col :xs="24" style="margin-top:15px;margin-bottom:15px;" :sm="24" :md="12" :lg="12" :xl="12" >
                        <div class="pd_20 bf_fff"  >
                                     <div  flex="dir:left main:justify cross:center" >
                                            <div  flex="dir:left  cross:center" style="margin-left:30px;">
                                                    <div  flex="dir:left  cross:center">
                                                           <icon name="订单" scale="20" style="margin-right:10px;" width="50" height="50"></icon>
                                                    </div>
                                                    <div  flex="dir:top main:justify cross:center" class="common_color" >
                                                            <div style="margin-bottom:5px;">
                                                             {{type3.totalCount}}
                                                            </div>
                                                            <div>
                                                                订单总数
                                                            </div>
                                                    </div>  
                                            </div>
                                            <div  flex="dir:top main:justify cross:center" class="common_color" style="border-left:1px solid #666;margin-right:30px;padding:0 20px;">
                                                    <div style="margin-bottom:5px;">
                                                        今日 ：{{type3.todayCount}}
                                                    </div>
                                                    <div>
                                                        昨日 ：{{type3.yesterdayCount}}
                                                    </div>
                                            </div>
                                     </div>
                        </div>
                    </el-col>
                     <el-col :xs="24" style="margin-top:15px;margin-bottom:15px;" :sm="24" :md="12" :lg="12" :xl="12" >
                        <div class="pd_20 bf_fff"  >
                                     <div  flex="dir:left main:justify cross:center" >
                                            <div  flex="dir:left  cross:center" style="margin-left:30px;">
                                                    <div  flex="dir:left  cross:center">
                                                           <icon name="订单金额" scale="20" style="margin-right:10px;" width="50" height="50"></icon>
                                                    </div>
                                                    <div  flex="dir:top main:justify cross:center" class="common_color" >
                                                            <div style="margin-bottom:5px;">
                                                             {{type4.totalCount}}
                                                            </div>
                                                            <div>
                                                                订单金额
                                                            </div>
                                                    </div>  
                                            </div>
                                            <div  flex="dir:top main:justify cross:center" class="common_color" style="border-left:1px solid #666;margin-right:30px;padding:0 20px;">
                                                    <div style="margin-bottom:5px;">
                                                        今日 ：{{type4.todayCount}}
                                                    </div>
                                                    <div>
                                                        昨日 ：{{type4.yesterdayCount}}
                                                    </div>
                                            </div>
                                     </div>
                        </div>
                    </el-col>
                    <!-- <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"><div class="pd_20 bf_fff">asdasdasdas</div></el-col> -->
            </el-row>




    </div>


     <div class="ml_30" style="" >
            <div style="font-size:24px;font-weight:500;">常用功能</div>
           <el-row :gutter="50">
                <el-col  style="margin-top:15px;margin-bottom:15px;" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                    <div class=" bg_fff" @click="goCoupon">
                           <el-card  style="text-align:center;"  shadow="hover">
                                <icon name="现金券"  scale="20" style="margin-right:10px;" width="50" height="50"></icon>
            
                                <div style="padding: 14px;">
                                    <span>现金券</span>
                                
                                </div>
                            </el-card>        
                    </div>
                </el-col>
                 <el-col style="margin-top:15px;margin-bottom:15px;" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                    <div class=" bg_fff">
                           <el-card  style="text-align:center;"  shadow="hover">
                                <icon name="折扣券"  scale="20" style="margin-right:10px;" width="50" height="50"></icon>
            
                                <div style="padding: 14px;">
                                    <span>折扣券</span>
                                
                                </div>
                            </el-card>        
                    </div>
                </el-col>
                 <el-col style="margin-top:15px;margin-bottom:15px;" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                    <div class=" bg_fff">
                           <el-card  style="text-align:center;"  shadow="hover">
                                <icon name="多人拼团"  scale="20" style="margin-right:10px;" width="50" height="50"></icon>
            
                                <div style="padding: 14px;">
                                    <span>多人拼团</span>
                                
                                </div>
                            </el-card>        
                    </div>
                </el-col>
                 <el-col style="margin-top:15px;margin-bottom:15px;" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                    <div class=" bg_fff">
                           <el-card  style="text-align:center;"  shadow="hover">
                                <icon name="页面装修"  scale="20" style="margin-right:10px;" width="50" height="50"></icon>
            
                                <div style="padding: 14px;">
                                    <span>页面装修</span>
                                
                                </div>
                            </el-card>        
                    </div>
                </el-col>
       
            </el-row>



             <el-row :gutter="50">
                <el-col style="margin-top:15px;margin-bottom:15px;" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                    <div class=" bg_fff">
                        <router-link to='/storeInformation'>
                           <el-card  style="text-align:center;"  shadow="hover">
                                <icon name="咨讯"  scale="20" style="margin-right:10px;" width="50" height="50"></icon>
            
                                <div style="padding: 14px;">
                                    <span>门店咨讯</span>
                                
                                </div>
                            </el-card>
                        </router-link>        
                    </div>
                </el-col>
                 <el-col style="margin-top:15px;margin-bottom:15px;" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                    <div class=" bg_fff">
                         <router-link to='/classicCase'>
                           <el-card  style="text-align:center;"  shadow="hover">
                                <icon name="案例"  scale="20" style="margin-right:10px;" width="50" height="50"></icon>
            
                                <div style="padding: 14px;">
                                    <span>专属案例</span>
                                
                                </div>
                            </el-card>        
                         </router-link>
                    </div>
                </el-col>
                 <el-col style="margin-top:15px;margin-bottom:15px;" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                    <div class=" bg_fff">
                        <router-link to='/appointment'>
                           <el-card  style="text-align:center;"  shadow="hover">
                                <icon name="预约管理"  scale="20" style="margin-right:10px;" width="50" height="50"></icon>
            
                                <div style="padding: 14px;">
                                    <span>预约管理</span>
                                
                                </div>
                            </el-card>   
                        </router-link>     
                    </div>
                </el-col>
                
       
            </el-row>
         
     </div>

</div>
	<!-- <div>
		<h1>vuex 测试</h1>
		Clicked: {{ getCount }} times
		<button @click="increment">+</button>
		<button @click="decrement">-</button>
	</div> -->
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import {headpage} from '../../api/api'


export default {

    data() {
    return {
    loading:true,
    indexData:[],
  
    type1:{
       todayCount:"0",
        totalCount:0,
        yesterdayCount:0
    },
     type2:{
       todayCount:0,
        totalCount:0,
        yesterdayCount:0
    },
     type3:{
       todayCount:0,
        totalCount:0,
        yesterdayCount:0
    },
     type4:{
       todayCount:0,
        totalCount:0,
        yesterdayCount:0
    }
    };
  },
	computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'getCount',
      'getHeadUrl'
      // ...
    ])
  },
  mounted(){
        this.getDetail()
  },
   methods: {
     
    getDetail(){
          var self=this;
          var params={}
             headpage(params)
            .then(function(res) {
               if(res.code!==200){
                   self.$notify({
                        title: "错误",
                        message: res.msg,
                        type: "error"
                    });
                    return
               }
               self.indexData=res.data||[];
               self.type1=res.data.filter((item)=>{
                   return item.type==1
               })[0]
               self.type2=res.data.filter((item)=>{
                   return item.type==2
               })[0]
               self.type3=res.data.filter((item)=>{
                   return item.type==3
               })[0]
               self.type4=res.data.filter((item)=>{
                   return item.type==4
               })[0]
               self.loading=false;
            })
            .catch(function(error) {
              self.loading=false;
              self.$notify({
                title: "错误",
                message: "网络错误",
                type: "error"
              });
              
            
            });
    },
    goCoupon(){
        console.log('跳转到优惠券')
    },
    ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
	  'decrement'
    ])
    //...mapActions({
    //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    //})
  }
}
</script>
<style scoped>
    .index_top{
        padding:30px 10px;
        font-size: 16px;
        background:#fff;
    }
    .ml_30{
        margin-top:30px;
    }
    .pd_20{
        padding:20px 10px;
    }
    .common_color{
        font-size:20px;
        color:#666;
    }
</style>
