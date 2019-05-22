<template>
	<div class="minWidth">
        <el-button type="primary" @click="add" style="margin-bottom:30px;">新增同事</el-button>
       <el-table   :stripe=true ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
                                                <el-table-column prop="doctorName" label="姓名">
                                                        <template slot-scope="scope">{{ scope.row.doctorName}}</template>
                                                </el-table-column>
                                                <el-table-column  label="电话" prop="mobile">
                                                        <template slot-scope="scope">{{ scope.row.mobile}}</template>
                                                </el-table-column>
                                                <el-table-column prop="positio" label="职称">
                                                        <template slot-scope="scope">{{ scope.row.positio}}</template>
                                                </el-table-column>
                                                 <el-table-column prop="selfPosition" label="职位">
                                                        <template slot-scope="scope">{{ scope.row.selfPosition}}</template>
                                                </el-table-column>
                                                <el-table-column label="操作" width="300"  fixed="right">
                                                        <template slot-scope="scope">
                                                                <el-tooltip content="投放" placement="top">
                                                                        <el-button size="mini" icon="el-icon-edit" @click="modify(scope.$index, scope.row)">修改</el-button>
                                                                           <el-button type="text" size="small"  @click="handleClick(scope.row)">编辑</el-button>
                                                                            <el-button type="text" size="small" @click="handleDelete(scope.row)" style="color:red;">删除</el-button>
                                                                </el-tooltip>
                                                                
                                                              <!--   <el-tooltip content="详情" placement="top">
                                                                        <el-button size="mini" icon="el-icon-view" @click="lookDetail(scope.$index, scope.row)">详情</el-button>
                                                                </el-tooltip> -->
                                                        </template>
                                                </el-table-column>
         </el-table>
           <div class="block" style="float:right;margin:10px;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="currentPageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNum">
            </el-pagination>
      </div>


         <el-dialog title="添加同事" :visible.sync="dialogFormVisible" width="50%" >
                <el-form :model="form"  :rules="rules"    ref="ruleForm"  style="max-height:90%;">
                    <el-row>
                      <el-col :span="12">
                            <el-form-item label="姓名" :label-width="formLabelWidth" prop="doctorName">
                            <el-input v-model="form.doctorName" ></el-input>
                            </el-form-item>
                      </el-col>
                    </el-row>

                     <el-row>
                      <el-col :span="12">
                            <el-form-item label="职位" :label-width="formLabelWidth">
                            <el-input v-model="form.selfPosition" ></el-input>
                            </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                    <el-form-item label="职称" :label-width="formLabelWidth"  prop="positio">
                    <el-select v-model="form.positio" placeholder="请选择职位">
                        <el-option label="主任医师" value="主任医师"></el-option>
                        <el-option label="助理" value="助理"></el-option>
                    </el-select>
                    </el-form-item>
                    </el-row>

                    
                   
                    
                            <el-form-item label="手机：" :label-width="formLabelWidth" prop="mobile">
                                  <el-row>
                                  <el-col :span="11">
                                      
                                                <el-input v-model="form.mobile" ></el-input>
                                                
                                        
                                 </el-col>
                                  <el-col :span="12">
                                      <span style="line-height:40px;color:#666;margin-left:10px;" >手机号码将作为100健康管家账号</span>
                                  </el-col>
                                  </el-row>
                            </el-form-item>
                     
                   

                     <el-row>
                    <el-form-item label="账号权限" :label-width="formLabelWidth" prop="isManager">
                    <el-select v-model="form.isManager" placeholder="是否是管理员">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                    </el-form-item>
                    </el-row>

                    <el-row>
                    <el-form-item label="是否展示在公众号/小程序" :label-width="formLabelWidth" prop="isShowSmallProgram">
                                    <el-switch
                                        v-model="form.isShowSmallProgram"
                                        active-value="1"
                                        inactive-value="0"
                                   >
                                    </el-switch>
                    </el-form-item>
                    </el-row>
                    <el-row>
                    <el-form-item label="头像" :label-width="formLabelWidth" prop="headUrl">
                                 <el-upload
                                    :action="loadUrl"
                                    :data="data"
                                    list-type="picture-card"
                                    :file-list="form.fileList"
                                    :multiple="false"
                                    :on-exceed="onExceed"
                                    :limit="1"
                                    :on-success="onSuccess"
                                    :on-preview="handlePictureCardPreview">
                                    <i class="el-icon-plus"></i>
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                    </el-form-item>
                    </el-row>

                     <el-row>
                      <el-col :span="12">
                            <el-form-item label="个人简介：" :label-width="formLabelWidth" prop="selfDescription">
                               <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="form.selfDescription">
                                </el-input>
                                
                            </el-form-item>
                      </el-col>
                    </el-row>

                       <el-row>
                    <el-form-item label="图片简介" :label-width="formLabelWidth">
                                 <el-upload
                                    :action="loadUrl"
                                     :data="data2"
                                    list-type="picture-card"
                                    :file-list="form.rollImages"
                                    :on-preview="handlePictureCardPreview"
                                    :on-success="onSuccess2"
                                    :on-remove="handleRemove">
                                    <i class="el-icon-plus"></i>
                                     <div slot="tip" class="el-upload__tip" style="color:#333">请添加图片简介，如该医生的诊疗案例，单张图片大小不超过1兆，最多可添加5张</div>
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                    </el-form-item>
                    </el-row>






                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </div>
            </el-dialog>




	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import {doctorList,doctorAdd,doctorDelete,loadUrl} from '../../../api/api'
export default {
    data(){
        return {
              data:{
            token:window.sessionStorage.getItem("token"),
            data:JSON.stringify({
                fileType:2
            })
        },
        data2:{
            token:window.sessionStorage.getItem("token"),
            data:JSON.stringify({
                fileType:1
            })
        },
            tableData3:[],
             loadUrl:loadUrl,
            dialogFormVisible:false,
            form:{
                 
            },
            formLabelWidth:'100px',
              dialogImageUrl: '',
            dialogVisible: false,
        rules: {
          doctorName: [
            { required: true, message: '请输入姓名', trigger: ['blur','change'] },
           
          ],
           selfPosition: [
            { required: true, message: '请输入职位', trigger:  ['blur','change'] },
           
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger:  ['blur','change']},
          ],
         isShowSmallProgram:[
            { required: true, message: '必选', trigger:  ['blur','change']},
          ],
          headUrl:[
              { required: true, message: '必选', trigger:  ['blur','change']},
          ]
         
        },
         currentPage4: 1,
           totalNum:0,
           currentPageSize:10,
        }
    },
	computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'getCount'
      // ...
    ])
  },
   mounted () {
        this.getList()
    },
   methods: {
    ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
	  'decrement'
    ]),
   
    add(){
        this.dialogFormVisible=true;
    },
     handleRemove(file, fileList) {
        console.log(file, fileList);
           if(file.response&&file.response.data&&file.response.data.url){
             var url=file.response.data.url;
            this.form.rollImages= this.form.rollImages.filter((item)=>{
            return  item!=url
        })
        }

         if(file.url){
             var url=file.url;
            this.form.rollImages= this.form.rollImages.filter((item)=>{
            return  item!=url
        })
        
        }




      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
        getList(){
               var self=this;
        var param={data:{body:{currentPage:this.currentPage4,pageSize:this.currentPageSize}}}
        doctorList(param).then(function(res) {
               if(res.code!==200){
                   self.$notify({
                        title: "错误",
                        message: res.msg,
                        type: "error"
                    });
                    return
               }
            

                
             if(res.data&&res.data.body){
                 self.tableData3=res.data.body;
                 self.totalNum=res.data.totalNum
             }
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
         handleClick(row) {
        console.log(row);



     var self=this;
        var param={data:{id:row.id}}
        serviceItemDetail(param).then(function(res) {
               if(res.code!==200){
                   self.$notify({
                        title: "错误",
                        message: res.msg,
                        type: "error"
                    });
                    return
               }
                self.form=res.data;
                
                if(res.data.serverImg){
                    self.form.fileList=[{url:res.data.serverImg}]
                }
                self.dialogFormVisible=true;
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
       //删除
    delete(id){
          
                   var self=this;
        var param={data:{doctorId:id}}
        doctorDelete(param).then(function(res) {
               if(res.code!==200){
                   self.$notify({
                        title: "错误",
                        message: res.msg,
                        type: "error"
                    });
                    return
               }
                 self.$notify({
                        title: "成功",
                        message: '删除成功',
                        type: "success"
                    });

                
                self.getList()
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
     //serviceItemUpdate
    listUpdate(){
        var self=this;
        this.form.orderNum=this.form.orderNum+'';
        var param={data:this.form}
        serviceItemUpdate(param).then(function(res) {
               if(res.code!==200){
                   self.$notify({
                        title: "错误",
                        message: res.msg,
                        type: "error"
                    });
                    return
               }
            
                  self.$notify({
                        title: "成功",
                        message:'修改成功',
                        type: "success"
                    });
                     self.getList();
                     self.dialogFormVisible=false;
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
     listAdd(){
                   var self=this;
          
        var param={data:this.form}
        doctorAdd(param).then(function(res) {
               if(res.code!==200){
                   self.$notify({
                        title: "错误",
                        message: res.msg,
                        type: "error"
                    });
                    return
               }
            
                  self.$notify({
                        title: "成功",
                        message:'新增成功',
                        type: "success"
                    });
                     self.getList();
                     self.dialogFormVisible=false;
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
        handleDelete(row){
            
         this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

            this.delete(row.doctorId)

            //执行删除操作
        
        }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });          
        });
    },
      onExceed(){
        this.$notify({
                title: "错误",
                message: "请先删除之前上传的图片",
                type: "error"
        });
    },
      onSuccess(response){
       this.form.headUrl=response.data.url;
   },
   onSuccess2(response){
        this.form.rollImages.push(response.data.url);
        this.form.introducePicture=this.form.rollImages.join(',')
   },
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPageSize=val;
        this.getList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage4=val;
        this.getList()
      },
        submitForm(formName) {
           var self=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
              if(self.form.id){
                  self.listUpdate()
              }else{
                  self.listAdd()
              }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    //...mapActions({
    //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    //})
  }
}
</script>