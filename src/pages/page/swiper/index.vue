<template>
	<div class="minWidth" v-loading="loading" >
        <el-button type="primary" style="margin-top:10px;margin-bottom:10px;" @click="add">新增</el-button>
	 <el-table
    :data="tableData"
    style="width: 100%">

     <el-table-column
   
      prop="bannerName"
      label="banner名称"
    >
    
    </el-table-column>
    
     <el-table-column
   
      prop="linkUrl"
      label="跳转链接"
    >
    
    </el-table-column>
    <el-table-column
   
      prop="pageType"
      label="类型"
    >
     <template slot-scope="scope">
           {{scope.row.pageType==1?'首页':'其他'}}
      </template>
    </el-table-column>
  
    <el-table-column
      prop="bannerUrl"
      label="图片"
     >
      <template slot-scope="scope">
            <img @click="priviewListImage(scope.row.bannerUrl)" :src="scope.row.bannerUrl" style="height:50px;" />
      </template>
    </el-table-column>
    <el-table-column
      prop="orderNum"
      label="排序"
      >
     
     
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

     <el-dialog title="添加服务项目" :visible.sync="dialogFormVisible" width="50%" >
                <el-form :model="form"  :rules="rules"    ref="ruleForm"  style="max-height:90%;">
                    <el-row>
                      <el-col :span="12">
                            <el-form-item label="banner名称" :label-width="formLabelWidth" prop="bannerName">
                            <el-input v-model="form.bannerName" ></el-input>
                            </el-form-item>
                      </el-col>
                      <el-col :span="12">
                            <el-form-item label="跳转链接" :label-width="formLabelWidth" prop="linkUrl">
                            <el-input v-model="form.linkUrl" ></el-input>
                            </el-form-item>
                      </el-col>
                    </el-row>
                     <el-row>
                     <el-col :span="12">
                            <el-form-item label="排序" :label-width="formLabelWidth" prop="orderNum">
                            <el-input-number v-model="form.orderNum" size="small" :controls="false"     ></el-input-number>
                            </el-form-item>
                    </el-col>
                     </el-row>
                    <el-row>
                            <el-form-item label="图片" :label-width="formLabelWidth">
                                   <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
                                        <el-upload
                                                ref="upload"
                                              :action="loadUrl"
                                                :data="data"
                                                list-type="picture-card"
                                                :file-list="form.fileList"
                                                :multiple="false"
                                                :on-exceed="onExceed"
                                                :limit="1"
                                                :on-success="onSuccess"
                                                :on-preview="handlePictureCardPreview"
                                            >
                                            <i class="el-icon-plus"></i>
                                            </el-upload>
                                            <!-- <el-dialog :visible.sync="dialogVisible">
                                            <img width="100%" :src="dialogImageUrl" alt="">
                                            </el-dialog> -->
                            </el-form-item>
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
import {swiperList,swiperAdd,swiperDelete ,swiperUpdate,loadUrl,} from '../../../api/api'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
      data() {
      return {
          form:{
              pageType:1,
          },
          total:0,//总数
          loadUrl:loadUrl,
         data:{
            token:window.sessionStorage.getItem("token"),
            data:JSON.stringify({
                fileType:2
            })
         },
          listdialogVisible:false,
          listdialogImageUrl:'',
            formLabelWidth:'100px',
          dialogFormVisible:false,
          loading:true,
          fileList:[],
          dialogVisible:false,
          dialogImageUrl:'',
            rules: {
        //   clisName: [
        //     { required: true, message: '请输入服务名称', trigger: ['blur','change'] },
        //     // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        //   ],
         
        //   clisDesc: [
        //     { required: true, message: '请填写服务描述', trigger: ['blur','change'] }
        //   ]
        },
            currentPage4: 1,
           totalNum:0,
           currentPageSize:10,
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
      dialogFormVisible( val,old){
          if(!val){
            //   this.$refs.upload.clearFiles();
              //清空

              this.form.fileList=[];

          }
      }
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
              var param={data:{currentPage:this.currentPage4,pageSize:this.currentPageSize,body:{pageType:1}}};
        swiperList(param).then(function(res) {
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

            this.delete(row.id)

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
            id:id
        }}
        swiperDelete(param).then(function(res) {
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
        //   if(this.form.clisPic){
        //       this.fileList=[{url:this.form.clisPic}]
        //   }

            if(this.form.bannerUrl){
                    this.form.fileList=[{url:this.form.bannerUrl}]
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
        this.form={pageType:1};
        // this.$refs.upload.clearFiles();
    },
    onSuccess(response){
       this.form.bannerUrl=response.data.url;
   },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      listUpdate(){
        var self=this;
        this.form.orderNum=this.form.orderNum+'';
        var param={data:this.form}
        swiperUpdate(param).then(function(res) {
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
                     self.getDetail();
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
                   this.form.orderNum=this.form.orderNum+'';
        var param={data:this.form}
        swiperAdd(param).then(function(res) {
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
                     self.getDetail();
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