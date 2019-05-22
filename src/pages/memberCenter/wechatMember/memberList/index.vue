<template>
	<div >
        <div v-if="false" style="position:absolute;top:40%;left:40%;text-align:center;color:blue">
                  <p>您还未创建微信会员卡，赶快去创建吧</p>  
                 <el-button type="primary">立即创建</el-button>
        </div>
        <div v-else>
            <el-card class="box-card" style="margin-top:30px;position:relative;max-width:800px;" shadow="never">
				  <div class="text item">
				   	会员名称 ： {{form.title}}
				  </div>
				  <div class="text item">
				   	状态 ：{{form.cardStatus}}
				  </div>
                  <!-- {{form.dateInfoType=='DATE_TYPE_PERMANENT'?"永久有效": timestampToTime(form.beginTimestamp)+'--'+timestampToTime(form.endTimestamp)        }} -->
				  <div class="text item">
				   	有效期 ：
				  </div>
				  <div class="text item">
				   	会员卡ID ：{{form.cardId}}
				  </div>
				   <span class="text item" @click="goMoreDetail" style="color:blue;cursor:pointer;">
				   		查看更多会员卡详情
				  </span>
				  <div class="carn_box">
				  		<div></div>
				  		<div @click="getqrCode" style="cursor:pointer">获取会员卡二维码</div>
				  </div>
			</el-card>


            <el-card class="box-card" style="margin-top:30px;position:relative;max-width:800px;margin-top:20px;" shadow="never">
				        <div>
				    		<span>快速买单</span>
				    		<el-switch
				    			active-value="1"
    							inactive-value="0"
							  v-model="form.openPayment">
							</el-switch>
							<span style="margin-left:30px;">(开通后用户可通过会员卡卡面快速买单，需先开通微信支付功能,并且需配置门店)</span>
							<!-- <div style="text-align:center;margin-top:30px;">
									 <el-button type="primary"  @click="quickBuy">保存</el-button>
							</div>			    		 -->
				    	 </div>
			</el-card>

        </div>
	 
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    data(){
        return {
            form:{}
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
    getqrCode(){

    },
    goMoreDetail(){
            this.$router.push('/wechatMember/detail')
    }   
    //...mapActions({
    //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    //})
  }
}
</script>


<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
  
    height:100%;
  }
  .marginAuto{
  	margin:0 auto;
  }
  .al_center{
  text-align:center;
  }
  .el-upload-dragger{
  width:200px;}
  
  .float_left{
  	float:left;
  }
  .card_head_box{
  	border-radius:10px;
 	border:1px solid #eee;
  	width:100%;
  	height:150px;
  	overflow:hidden;
  	padding:10px;
  	box-sizing:border-box;
  	background-size:contain;
  }
 
  .card_head{
  	width:30px;
  	height:30px;
  	border-radius:50%;
  	background:#fff;
  }
  .card_list_box{
  	padding:0 10px;
  	margin-top:20px;
  }
  .card_list_box2{
  	padding:0 10px;
  }
  .card_list{
  	width:100%;
  	height:40px;
  	border-top:1px solid #eee;
  	border-bottom:1px solid #eee;
  	line-height:40px;
  	cursor:pointer;
  }
  .card_list2{
  	width:100%;
  	height:40px;
 	cursor:pointer;
  	line-height:40px;
  }
  .card_list:nth-child(even){
   	border-top:none;
  }
  .card_text_notice{
  	background:#eee;
  	padding-left:10px;
  	height:35px;
  	line-height:35px;
  }
  .is-hit{
  	border:10px;
  }
  .carn_box{
  	position:absolute;
  	bottom:30px;
  	right:30px;
  	width:200px;
  	color:blue;
  }
  .fl{
  	float:left;
  }
  .fr{
  	float:right;
  }
</style>
