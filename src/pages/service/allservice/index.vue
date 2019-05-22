<template>
	<div class="minWidth">
        <el-button type="primary" style="margin-top:10px;margin-bottom:10px;" @click="add">添加项目</el-button>
	 <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="serverName"
      label="项目名称"
    >
    </el-table-column>
    <el-table-column
      prop="classifyId"
      label="所属分类"
      >
        <template slot-scope="scope">
            {{getClassify(scope.row.classifyId)}}
      </template>
    </el-table-column>
    <el-table-column
      prop="serverPrice"
      label="价格"
      >
    </el-table-column>
    <el-table-column
      prop="isPayOnline"
      label="是否需要支付"
     >
      <template slot-scope="scope">
          {{scope.row.isPayOnline==1?'是':"否"}}
      </template>
    </el-table-column>
    <el-table-column
      prop="orderNum"
      label="排序"
      >
    </el-table-column>
   
    <el-table-column

      label="操作"
      width="150">
      <template slot-scope="scope">
        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
        <el-button type="text" size="small"  @click="handleClick(scope.row)">编辑</el-button>
        <el-button type="text" size="small" @click="handleDelete(scope.row)" style="color:red;">删除</el-button>
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

<div v-if="dialogFormVisible">
     <el-dialog title="添加服务项目" :visible.sync="dialogFormVisible" width="50%" >
                <el-form :model="form"  :rules="rules"    ref="ruleForm"  style="max-height:90%;">
                    <el-row>
                      <el-col :span="12">
                            <el-form-item label="项目名称" :label-width="formLabelWidth" prop="serverName">
                            <el-input v-model="form.serverName" ></el-input>
                            </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item label="项目分类" :label-width="formLabelWidth"  prop="classifyId" v-if="classsifyArr.length>0">

                     
                            <el-select v-model="form.classifyId" placeholder="请选择项目分类" @change="selectChange">
                                <el-option  v-for="item in classsifyArr" :key="item.classifyId" :label="item.clisName" :value="item.classifyId"></el-option>
                            </el-select>
                    </el-form-item>
                    <el-row>
                      <el-col :span="12">
                            <el-form-item label="项目简介：" :label-width="formLabelWidth" prop="serverDesc">
                               <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="form.serverDesc">
                                </el-input>   
                            </el-form-item>
                      </el-col>
                    </el-row>
                     <el-row>
                    

                      <el-col :span="12">
                            <el-form-item label="项目售价"  :label-width="formLabelWidth" prop="serverPrice">
                            
                                <el-input-number v-model="form.serverPrice" size="small" :controls="false"  :precision="2"   ></el-input-number>
                            </el-form-item>
                      </el-col>
                      <el-col :span="12">
                            <el-form-item label="排序" :label-width="formLabelWidth" prop="orderNum">
                            <el-input-number v-model="form.orderNum" size="small" :controls="false"     ></el-input-number>
                            </el-form-item>
                      </el-col>
                    </el-row>
                     <el-row>
                    <el-form-item label="是否需要支付" :label-width="formLabelWidth" prop="isPayOnline">
                                    <el-switch
                                        v-model="form.isPayOnline"
                                        :active-value="1"
                                        :inactive-value="0"
                                   >
                                    </el-switch>
                    </el-form-item>
                    </el-row>
                    <el-row>
                    <el-form-item label="封面图片" :label-width="formLabelWidth" prop="serverImg">
                                 <el-upload
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

                       <el-row>
                    <el-form-item label="轮播图片" :label-width="formLabelWidth">
                                 <el-upload
                                    :action="loadUrl"
                                     :data="data2"
                                    list-type="picture-card"
                                    :file-list="form.rollImages"
                                    :on-preview="handlePictureCardPreview"
                                    :on-success="onSuccess2"
                                    :on-remove="handleRemove">
                                    <i class="el-icon-plus"></i>
                                    </el-upload>
                                    <!-- <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog> -->
                    </el-form-item>
                    </el-row>
                     <el-row>
                    <el-form-item label="是否展示在公众号/小程序" :label-width="formLabelWidth" prop="isShowSmallProgram">
                                    <el-switch
                                        v-model="form.isShowSmallProgram"
                                        :active-value="1"
                                        :inactive-value="0"
                                   >
                                    </el-switch>
                    </el-form-item>
                    </el-row>
                    
                   
                    
                   


                  

                  

                   

                       <el-row>
                    <el-form-item label="项目详情" :label-width="formLabelWidth" prop="serverDetail">
                                <div>
  <!-- bidirectional data binding（双向数据绑定） -->
  <quill-editor v-model="form.serverDetail"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
                 @change="onEditorChange($event)"
                >
  </quill-editor>
    <!-- <form action="" method="post" enctype="multipart/form-data" id="uploadFormMulti"> -->
       <input style="display: none" :id="uniqueId" type="file" name="avator" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImg($event)"><!--style="display: none"-->
     <!-- </form> -->
    </div>
                    </el-form-item>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </div>
            </el-dialog>
            </div>










	</div>


    






</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
  // you can also register quill modules in the component
  import Quill from 'quill'
  import IndentStyle from './IndentStyle.js';
  import {newUpload,serviceItemList,serviceItemAdd,clinicList,loadUrl,serviceItemUpdate,serviceItemDelete,serviceItemDetail}  from "../../../api/api"
//   import { someModule } from '../yourModulePath/someQuillModule.js'
//   Quill.register('modules/someModule', someModule)
    var Size = Quill.import('attributors/style/size');
    Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '32px'];
    Quill.register(Size, true);

export default {
      data() {
      return {
        textValue:'',
        content: '',
         tableData2:[],
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
        editorOption: {
          // some quill options
        },
        classsifyArr:[],
        loadUrl:loadUrl,
        dialogVisible:false,
        dialogImageUrl:'',
        editorOption : {}  ,  // 编辑器选项
        uploadData : {},
        photoUrl :''   ,      // 上传图片地址
        uploadType : ''  ,  // 上传的文件类型（图片、视频）
        fullscreenLoading : false,
        uniqueId:'Harry',
          form:{
              rollImages:[],
              fileList:[],
          },
            formLabelWidth:'100px',
          dialogFormVisible:false,
            rules: {
          serverName: [
            { required: true, message: '请输入名称', trigger: ['blur','change'] },
            
          ],
          
           serverPrice: [
            { required: true, message: '请输入价格', trigger: ['blur','change'] },
            
          ],
          serverDesc: [
            { required: true, message: '请输入内容', trigger: ['blur','change'] },
            
          ],
          serverDetail:[
                { required: true, message: '请输入内容', trigger: ['blur','change'] },
          ],
          isPayOnline: [
            { required: true, message: '必填', trigger: ['blur','change'] },
            
          ],
           serverImg: [
            { required: true, message: '必填', trigger: ['blur','change'] },
            
          ],
          classifyId: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ],
         
         
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
           currentPage4: 1,
           totalNum:0,
           currentPageSize:10,
        tableData: [],
       
      }}, 
	computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'getCount'
      // ...
    ])
  },
    mounted() {
        
        console.log('this is current quill instance object', this.editor);
        this.getList();

        this.getDetail();
          // 页面加载完成
        //   this.$nextTick(() => {
        //       debugger;
        //      this.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image", this.imgHandler)
        //   })
      
    },
   methods: {
    ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
	  'decrement'
    ]),
    onSubmit(){
        console.log("回车事件")
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
                 self.classsifyArr=res.data.body;
     
           
               
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
    //获取分类汉字
    getClassify(id){
          var arr= this.classsifyArr.filter((item)=>{
                    return item.classifyId==id
            })
            if(arr.length>0){
               return arr[0].clisName
            }else{
                return ""
            }
    },
    //项目分类变化
    selectChange(val){
        console.log(val)  
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
                   this.form.orderNum=this.form.orderNum+'';
        var param={data:this.form}
        serviceItemAdd(param).then(function(res) {
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
 
    onExceed(){
        this.$notify({
                title: "错误",
                message: "请先删除之前上传的图片",
                type: "error"
        });
    },
   onSuccess(response){
       this.form.serverImg=response.data.url;
   },
   onSuccess2(response){
    this.form.rollImages.push({url:response.data.url,sortNum:this.form.rollImages.length})
   },
    getList(){
              var self=this;
        var param={data:{body:{currentPage:this.currentPage4,pageSize:this.currentPageSize}}}
        serviceItemList(param).then(function(res) {
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
    add(){
        //重置
     
        this.form={
            rollImages:[],
            fileList:[],
        }
    this.dialogFormVisible=true;
    this.$nextTick(()=>{
        this.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image", this.imgHandler)
    })
        
    },
    handleDelete(row){
            
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
    //删除
    delete(id){
          
                   var self=this;
        var param={data:{id:id}}
        serviceItemDelete(param).then(function(res) {
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
     handleRemove(file, fileList) {
        console.log(file, fileList);
        
        if(file.response&&file.response.data&&file.response.data.url){
             var url=file.response.data.url;
            this.form.rollImages= this.form.rollImages.filter((item)=>{
            return  item.url!=url
        })
        }

         if(file.url){
             var url=file.url;
            this.form.rollImages= this.form.rollImages.filter((item)=>{
            return  item.url!=url
        })
        
        }
       
       
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      
        console.log(this.$refs.myQuillEditor.quill.getContents())
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
  
        console.log('editor change!', quill, html, text)
        this.content = html
        this.form.serverDetail=html;
      },
        uploadImg: async function(e) {
            var vm = this
            vm.imageLoading = true
            var formData = new FormData(document.getElementById("uploadFormMulti"))
            vm.uploadImgReq(e)
            // try {
            //       const url = await vm.uploadImgReq(e)// 自定义的图片上传函数d\
            //             //  if (url != null && url.length > 0) {
            //             // var value = url
            //             // vm.addImgRange = vm.$refs.myQuillEditor.quill.getSelection()
            //             // value = value.indexOf('http') != -1 ? value : 'http:' + value
            //             // vm.$refs.myQuillEditor.quill.insertEmbed(vm.addImgRange != null?vm.addImgRange.index:0, 'image', value, Quill.sources.USER)
            //             // } else {
            //             //         vm.$message.warning("增加失败")
            //             // }
            //             // document.getElementById(vm.uniqueId).value=''
             
              
            // } catch ({message: msg}) {
            //     document.getElementById(vm.uniqueId).value=''
            //     vm.$message.warning(msg)
            // }
            vm.imageLoading = false
            },
            insertUrl(url){
                var vm=this;
                      if (url != null && url.length > 0) {
                        var value = url
                        vm.addImgRange = vm.$refs.myQuillEditor.quill.getSelection()
                        value = value.indexOf('http') != -1 ? value : 'http:' + value
                        vm.$refs.myQuillEditor.quill.insertEmbed(vm.addImgRange != null?vm.addImgRange.index:0, 'image', value, Quill.sources.USER)
                        } else {
                                vm.$message.warning("增加失败")
                        }
                        document.getElementById(vm.uniqueId).value=''
            },
        uploadImgReq(event){
            var vm=this;
            var self=this;
            var reader = new FileReader();
            var img = event.target.files[0];
            let param = new FormData(); //创建form对象
            param.append('file',img);//通过append向form对象添加数据;
            param.append('token',sessionStorage.getItem('token'));
            var data={
                fileType:1
            }
            param.append("data",JSON.stringify(data));
            newUpload(param).then((res)=>{
                if(!res.data||!res.data.data||!res.data.data.url){
                     self.$notify({
                        title: "错误",
                        message: "上传图片错误",
                        type: "error"
                    });
              
                    return
                }
                    var url=res.data.data.url
                   if(res.data.data.url){
                         if (url != null && url.length > 0) {
                            var value = url
                            let selection =vm.$refs.myQuillEditor.quill.getSelection()
                            let value = url.indexOf('http') != -1 ? url : 'http:' + url
                            let index = selection != null ? selection.index : 0
                            vm.$refs.myQuillEditor.quill.insertEmbed(index, 'image', value, Quill.sources.USER)
                            vm.$refs.myQuillEditor.quill.setSelection(index + 1, 0)
                        } else {
                                vm.$message.warning("增加失败")
                        }
                        document.getElementById(vm.uniqueId).value=''
                   }else{
                       return null
                   }
            })
        },
        imgHandler(image){
            this.addImgRange = this.$refs.myQuillEditor.quill.getSelection()
                if (image) {
                    var fileInput = document.getElementById(this.uniqueId) //隐藏的file文本ID
                    fileInput.click() //加一个触发事件
            }
        }
    //...mapActions({
    //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    //})
  }
}
</script>