<template>
	<div class="minWidth" v-loading="loading" >
        <el-button type="primary" style="margin-top:10px;margin-bottom:10px;" @click="add">添加分类</el-button>
	 <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
   
      prop="clisName"
      label="分类名称"
    >
    </el-table-column>
  
    <el-table-column
      prop="clisPic"
      label="分类图片"
     >
      <template slot-scope="scope">
            <img @click="priviewListImage(scope.row.clisPic)" :src="scope.row.clisPic" style="height:50px;" />
      </template>
    </el-table-column>
    <el-table-column
      prop="clisDesc"
      label="描述"
      >
     
       <template slot-scope="scope">
           <span v-html="getString(scope.row.clisDesc)"></span>
      </template>
    </el-table-column>
   
    <el-table-column

      label="操作"
      width="250">
      <template slot-scope="scope">
        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
         <el-button @click="showChange(scope.row)" size="mini" icon="el-icon-edit-outline" >修改</el-button>
        <el-button @click="handleClick(scope.row)" size="mini" icon="el-icon-delete" type="danger">删除</el-button>
        
        
      </template>
    </el-table-column>
  </el-table>
     <!-- <div class="block" style="float:right;margin:10px;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
            </el-pagination>
      </div> -->

     <el-dialog title="添加服务项目" :visible.sync="dialogFormVisible" width="50%" >
                <el-form :model="form"  :rules="rules"    ref="ruleForm"  style="max-height:90%;">
                    <el-row>
                      <el-col :span="12">
                            <el-form-item label="分类名称" :label-width="formLabelWidth" prop="clisName">
                            <el-input v-model="form.clisName" ></el-input>
                            </el-form-item>
                      </el-col>
                    </el-row>
                 
                    <el-row>
                            <el-form-item label="图标" :label-width="formLabelWidth">
                                   <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
                                        <el-upload
                                            ref="upload"
                                            action=""
                                            :file-list="fileList"
                                            list-type="picture-card"
                                            :on-preview="handlePictureCardPreview"
                                            :multiple="false"
                                            :on-exceed="onExceed"
                                            :auto-upload="false"
                                            :limit="1"
                                            :on-change="loadChange"
                                            >
                                            <i class="el-icon-plus"></i>
                                            </el-upload>
                                            <!-- <el-dialog :visible.sync="dialogVisible">
                                            <img width="100%" :src="dialogImageUrl" alt="">
                                            </el-dialog> -->
                            </el-form-item>
                    </el-row>

                      <el-row>
                      <el-col :span="12">
                            <el-form-item label="分类描述："  prop="clisDesc" :label-width="formLabelWidth">
                               <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="请输入内容"
                                v-model="form.clisDesc">
                                </el-input>
                                
                            </el-form-item>
                      </el-col>
                    </el-row>
                
                     
                  

               
                    
                   
                    
                   


                  





                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </div>
            </el-dialog>



      <el-dialog :visible.sync="listdialogVisible">
            <img width="100%" :src="listdialogImageUrl" alt="">
      </el-dialog>






	</div>


    






</template>

<script>
import {clinicList,clinicAdd,clinicDelete ,clinicUpdate} from '../../../api/api'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
      data() {
      return {
          form:{},
          total:0,//总数
          listdialogVisible:false,
          listdialogImageUrl:'',
            formLabelWidth:'100px',
          dialogFormVisible:false,
          loading:true,
          fileList:[],
          dialogVisible:false,
          dialogImageUrl:'',
            rules: {
          clisName: [
            { required: true, message: '请输入服务名称', trigger: ['blur','change'] },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
         
          clisDesc: [
            { required: true, message: '请填写服务描述', trigger: ['blur','change'] }
          ]
        },
           currentPage4: 4,
        tableData: []
      }}, 
	computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'getCount'
      // ...
    ])
  },
  watch:{
    //   dialogFormVisible( val,old){
    //       if(val){
    //           this.$refs.upload.clearFiles();
    //           //清空
    //           this.fileList=[];

    //       }
    //   }
  },
    mounted() {
      this.getDetail();
    },
   methods: {
    ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
	  'decrement'
    ]),
    //预览图片
    priviewListImage(url){
        if(url){
            this.listdialogImageUrl=url;
            this.listdialogVisible=true;
        }
    },
    //加载
    loadChange(file,fileList){
                // this.fileList=[{url:file.row}]
             console.log(file);
   
             this.form.file=file.raw;
             
    },
    onExceed(){
         this.$notify({
                        title: "错误",
                        message:'请先删除之前上传的图片',
                        type: "error"
        });
      
    },
    getString(txts){

        if(!txts){
            return ''
        }
        txts=txts.replace(/\n/g,'<br>');
        return txts
    },
    getDetail(){
        var self=this;
        var param={}
        clinicList(param).then(function(res) {
               if(res.code!==200){
                   self.$notify({
                        title: "错误",
                        message: res.msg,
                        type: "error"
                    });
                    return
               }
            
             if(res.data&&res.data.body){
                 self.tableData=res.data.body;
                 self.total=res.data.totalNum
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
         
         this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

            this.delete(row.classifyId)

            //执行删除操作
        
        }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });          
        });
      },
      delete(id){
          var self=this;
        var param={data:{
            classifyId:id
        }}
        clinicDelete(param).then(function(res) {
               if(res.code!==200){
                   self.$notify({
                        title: "错误",
                        message: res.msg,
                        type: "error"
                    });
                    return
               }

                self.getDetail();
                self.$message({
                    type: 'success',
                    message: '删除成功!'
                });
           
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
      showChange(row){
          this.dialogFormVisible=true;
          this.fileList=[];
          this.form=Object.assign({},row);
          if(this.form.clisPic){
              this.fileList=[{url:this.form.clisPic}]
          }
      },
          handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
       add(){
        this.dialogFormVisible=true;
        this.form={};
        // this.$refs.upload.clearFiles();
    },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
        submitForm(formName) {
            var self=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
              
        var self=this;



         let param = new FormData(); //创建form对象
            if(self.form.file){
                param.append('file',self.form.file);
            }
            param.append('data',JSON.stringify(self.form));
            param.append('token',sessionStorage.getItem('token'));       



        
        if(self.form.classifyId){
            param.append('classifyId',self.form.classifyId);
                clinicUpdate(param).then(function(res) {
               if(res.code!==200){
                   self.$notify({
                        title: "错误",
                        message: res.msg,
                        type: "error"
                    });
                    return
               }
                   self.$notify({
                    title: '成功',
                    message: '恭喜您修改成功',
                    type: 'success'
                    })
                self.dialogFormVisible=false;
                self.getDetail();
              
            })
            .catch(function(error) {
          
              self.$notify({
                title: "错误",
                message: "网络错误",
                type: "error"
              });
              
            
            });
            return 

        }

        clinicAdd(param).then(function(res) {
               if(res.code!==200){
                   self.$notify({
                        title: "错误",
                        message: res.msg,
                        type: "error"
                    });
                    return
               }
                   self.$notify({
                    title: '成功',
                    message: '恭喜您新增成功',
                    type: 'success'
                    })
                self.dialogFormVisible=false;
                self.getDetail();
              
            })
            .catch(function(error) {
          
              self.$notify({
                title: "错误",
                message: "网络错误",
                type: "error"
              });
              
            
            });



          } else {
              self.$notify({
                        title: "错误",
                        message:'请填写完整信息',
                        type: "error"
                });
            return false;
          }
        });
      }
    //...mapActions({
    //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    //})
  }
}
</script>