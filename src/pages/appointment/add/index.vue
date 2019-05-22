<template>
	<div>

        <el-button type="primary" @click="goBack" style="margin-top:15px;margin-bottom:15px;">回退</el-button>

        <el-card class="box-card" style="max-width:1000px;margin:0 auto;">
	<el-form  :inline="false" ref="form"  onsubmit="return false;"   :model="form" label-width="80px">
  <el-form-item label="姓名">
       <el-col :span="10">
    <el-input v-model="form.name"></el-input>
       </el-col>
  </el-form-item>
  <el-form-item label="性别">
    <el-select v-model="form.region" placeholder="请选择性别">
      <el-option label="男" value="shanghai"></el-option>
      <el-option label="女" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="手机号">
      <el-col :span="10">
    <el-input v-model="form.name"></el-input>
      </el-col>
  </el-form-item>
   <el-form-item label="医生">
    <el-select v-model="form.region" placeholder="请选择性别">
      <el-option label="harry" value="shanghai"></el-option>
      <el-option label="liu" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="时间">
    <el-col :span="10">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="1" style="text-align:center;">-</el-col>
    <el-col :span="8">
      <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
 
  <el-form-item label="项目">
    <el-select v-model="form.region" placeholder="请选择项目">
      <el-option label="harry" value="shanghai"></el-option>
      <el-option label="liu" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="备注">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">确定</el-button>
    <!-- <el-button>取消</el-button> -->
  </el-form-item>
</el-form>
        </el-card>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
        data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }},
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
     onSubmit() {
        console.log('submit!');
      },
      goBack(){
          this.$router.go(-1)
      }
    //...mapActions({
    //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    //})
  }
}
</script>