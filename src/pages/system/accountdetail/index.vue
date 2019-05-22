<template>
	<div>
<el-card class="box-card" style="max-width:800px;">
					  <div slot="header" class="clearfix">
					    <span>个人信息</span>
					    <el-button style="float: right; padding: 3px 0" type="text"    @click="toChange">修改密码</el-button>
					  </div>
					  <div><span style="color:#666;margin-top:10px;">门店 :</span>  {{clinicName}}</div>
					  <div><span style="color:#666;margin-top:10px;">角色:</span>    管理员 </div>
					  <div><span style="color:#666;margin-top:10px;">登录手机:</span>  {{mobile}}</div>
					  <div><span style="color:#666;margin-top:10px;">密码 :</span>   ******  </div>
				</el-card>
				<el-dialog
					  title="提示"
					  :visible.sync="dialogVisible"
					  width="30%"
                      style="min-width:300px;"
					  :before-close="handleClose2">
					  <div class="demo-input-suffix"   style="max-width:300px;text-align:center;">
					  
			  			
			  <el-input
			    placeholder="旧密码"
			    type="password"
			    v-model="oldPassword">
			  </el-input>
			  	<div style="margin-top:5px;margin-bottom:5px;">
			  <el-input
			    placeholder="新密码"
			     type="password"
			    v-model="newPassword">
			  </el-input>
			  </div>	
			  <el-input
			    placeholder="确认新密码"
			     type="password"
			    v-model="confirmNewPassword">
			  </el-input>
					  </div>
				
					  <span slot="footer" class="dialog-footer">
					    <el-button @click="dialogVisible = false">取 消</el-button>
					    <el-button type="primary" @click="changePassword">确 定</el-button>
					  </span>
					</el-dialog>
             		
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
     data: function () {
    return {
    	clinicName:'',  //诊所名称
    	role:"",//角色
    	mobile:'',//登录手机
    	password:'',//密码
  
    	dialogVisible: false,
    	oldPassword:'',
    	newPassword:'',
    	confirmNewPassword:'',
    	clinicId:'',
    	doctorId:''
    	
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
     toChange:function(){
		this.dialogVisible=true  
	  },
     changePassword:function(){
		  var self=this;
		  	if(!this.oldPassword){
		  		this.$message.error('请先输入旧密码')
		  		return 
		  	}
		  	if(!this.newPassword){
		  		this.$message.error('请先输入新密码')
		  		return
		  	}
		  	if(!this.confirmNewPassword){
		  		this.$message.error('请先输入确认新密码')
		  		return
		  	}
		  	if(this.confirmNewPassword!=this.newPassword){
		  		this.$message.error('新密码与确认密码不一致')
		  		return
		  	}
		  
	  },
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
    width: 500px;
    height:100%;
  }
</style>
