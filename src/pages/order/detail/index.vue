<template>
	<div>
         <el-button type="primary" @click="goBack" style="margin-top:15px;margin-bottom:15px;">回退</el-button>
	  <el-card class="box-card" style="max-width:1000px;margin:0 auto;">
          <el-form  :model="formInline" class="demo-form-inline" onsubmit="return false;">
                                           
                                            <el-form-item label="姓名:">
                                                   <span >张三张三张三张三张三</span>
                                            </el-form-item>
                                           <el-form-item label="电话:">
                                                   <span>18838186419</span>
                                            </el-form-item>
                                            <el-form-item label="预约时间:">
                                                   <span>2019-1-10</span>
                                            </el-form-item>
                                            <el-form-item label="预约项目:">
                                                   <span>备注</span>
                                            </el-form-item>
                                            <el-form-item label="备注信息:">
                                                   <span>未填写</span>
                                            </el-form-item>
                                        </el-form>

	  </el-card>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    data(){
        return {
            formInline:{
                ClinicName:''
            }
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
     goBack(){
          this.$router.go(-1)
      }
    //...mapActions({
    //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    //})
  }
}
</script>