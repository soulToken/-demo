<template>
	<div class="minWidth">

     <el-row style="margin-top:15px;">
                        <el-col :span="24">
                                        <el-form :inline="true" :model="formInline" class="demo-form-inline" onsubmit="return false;">
                                            <el-form-item >
                                                    <el-button type="primary" @click="goAdd"  style="margin-right:50px;"   icon="el-icon-search">新增预约</el-button>
                                            </el-form-item>
                                            <el-form-item label="优惠券名称:">
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

     <el-dialog title="添加优惠券" :visible.sync="dialogFormVisible" width="50%" >
                <el-form :model="form"  :rules="rules"    ref="ruleForm"  style="max-height:90%;">
                    <el-row>
                      <el-col :span="12">
                            <el-form-item label="券名称" :label-width="formLabelWidth" prop="name">
                            <el-input v-model="form.name" ></el-input>
                            </el-form-item>
                      </el-col>
                     
                      
                    </el-row>

                      <el-row>
                        
                        <el-col :span="12">
                            <el-form-item label="目标人群" :label-width="formLabelWidth"  prop="region">
                                <el-select v-model="form.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                     <el-col :span="12">
                            <el-form-item label="券场景" :label-width="formLabelWidth"  prop="region">
                                <el-select v-model="form.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                     
                    </el-row>

                    <el-row>
                        
                        <el-col :span="12">
                            <el-form-item label="使用限制" :label-width="formLabelWidth"  prop="region">
                                <el-select v-model="form.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                     
                     
                    </el-row>
                   
                   <el-row>
                          <el-col :span="12">
                            <el-form-item label="优惠金额" :label-width="formLabelWidth" prop="name">
                            <el-input v-model="form.name" ></el-input>
                            </el-form-item>
                            </el-col>   
                         <el-col :span="12">
                            <el-form-item label="使用门槛" :label-width="formLabelWidth" prop="name">
                                <div flex="dir:left">
                                  <span>满</span>  
                                  <el-input v-model="form.name" ></el-input> 
                                  <span style="white-space:nowrap;">可用</span>  
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>

                <el-row>
                         <el-form-item label="日期：" :label-width="formLabelWidth">
                                <el-radio v-model="form.radio" label="1">备选项</el-radio>
                                <el-radio v-model="form.radio" label="2">备选项</el-radio>
                                 <el-date-picker
      v-model="form.value7"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2">
    </el-date-picker>
                            </el-form-item>

                </el-row>


                   
                      <el-row>
                      <el-col :span="12">
                            <el-form-item label="优惠券说明：" :label-width="formLabelWidth">
                               <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="form.desc">
                                </el-input>
                                
                            </el-form-item>
                      </el-col>
                    </el-row>
                      <el-row>
                      <el-col :span="12">
                            <el-form-item label="发送数量：" :label-width="formLabelWidth">
                             <el-input v-model="form.name" ></el-input> 不填写即为不限制数量   
                            </el-form-item>
                      </el-col>
                    </el-row>
           
                     
                  

               
                    
                   
                    
                   


                  





                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </div>
            </el-dialog>










   
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
          formLabelWidth:'100px',
          form:{

          },
          dialogFormVisible:false,
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
       this.dialogFormVisible=true;
    },
    handleClick(){
        this.$router.push('/coupon/detail')
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
