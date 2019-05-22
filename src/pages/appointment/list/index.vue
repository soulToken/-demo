<template>
	<div>
<el-row>
	 <el-col :xs="24" style="margin-top:15px;margin-bottom:15px;" :sm="24" :md="12" :lg="12" :xl="12" >
                        <div class="pd_20 bf_fff"  >
                                     <div  flex="dir:left main:justify cross:center" >
                                            <div  flex="dir:left  cross:center" style="margin-left:30px;">
                                                    <div  flex="dir:left  cross:center">
                                                           <icon name="用户" scale="20" style="margin-right:10px;" width="50" height="50"></icon>
                                                    </div>
                                                    <div  flex="dir:top main:justify cross:center" class="common_color" >
                                                            <div style="margin-bottom:5px;">
                                                            
                                                            </div>
                                                            <div>
                                                                总用户量
                                                            </div>
                                                    </div>  
                                            </div>
                                            <div  flex="dir:top main:justify cross:center" class="common_color" style="border-left:1px solid #666;margin-right:30px;padding:0 20px;">
                                                    <div style="margin-bottom:5px;">
                                                        今日 ：
                                                    </div>
                                                    <div>
                                                        昨日 ：
                                                    </div>
                                            </div>
                                     </div>
                        </div>
    </el-col>
</el-row>
    <el-row>
        <div flex="dir:left cross:center">
              <span>最近七天预约</span>
         <span style="margin-left:15px;margin-right:15px;" class="checked"> 按照时间段查询</span>   
          <span class="demonstration">选择日期</span>
            <el-date-picker
            v-model="value4"
            type="datetimerange"
            :picker-options="pickerOptions2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
            </el-date-picker>
            <el-button type="primary" style="margin-left:15px;">查询</el-button>
        </div>
    </el-row>
 <!-- <el-row> -->
     <el-row style="margin-top:15px;">
                        <el-col :span="24">
                                        <el-form :inline="true" :model="formInline" class="demo-form-inline" onsubmit="return false;">
                                            <el-form-item >
                                                    <el-button type="primary" @click="goAdd"  style="margin-right:50px;"   icon="el-icon-search">新增预约</el-button>
                                            </el-form-item>
                                            <el-form-item label="诊所名称:">
                                                    <el-input v-model="formInline.ClinicName" @keyup.enter.native="searchClinic" placeholder="请输入诊所名称"></el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                    <el-button type="primary" @click="searchClinic"    icon="el-icon-search">查询</el-button>
                                            </el-form-item>
                                        </el-form>

                                          
                        </el-col>
     </el-row>


    <el-row>
            	 <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
   
      prop="date"
      label="日期"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      >
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
     >
      <template slot-scope="scope">
       
      </template>
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      >
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      >
    </el-table-column>
    <el-table-column

      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
     <div class="block" style="float:right;margin:10px;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
            </el-pagination>
      </div>


    </el-row>




   
 <!-- </el-row> -->
   


	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
     data() {
      return {
          formInline:{
ClinicName:""
          },
          input:'',
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value4: '',
             currentPage4: 4,
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
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
    searchClinic(){

    },
    handleSizeChange(val) {
    console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
    console.log(`当前页: ${val}`);
    },
    goAdd(){
        this.$router.push('/appointment/add')
    },
    handleClick(){
        this.$router.push('/appointment/detail')
    }
    //...mapActions({
    //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    //})
  }
}
</script>

<style scoped>
.pd_20{
        padding:20px 10px;
}
.checked{
    color:blue;
    text-decoration:underline;
}
</style>
