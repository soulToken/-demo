<template>
	<div class="minWidth">
        <el-button type="primary" style="margin-top:10px;margin-bottom:10px;" @click="add">添加资讯</el-button>
	 <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
   
      prop="date"
      label="标题"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="副标题"
      >
    </el-table-column>
    <el-table-column
      prop="province"
      label="封面图"
      >
    </el-table-column>
    <el-table-column
      prop="city"
      label="排序"
     >
      <template slot-scope="scope">
       
      </template>
    </el-table-column>
    <el-table-column
      prop="address"
      label="创建时间"
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

     <el-dialog title="添加资讯" :visible.sync="dialogFormVisible" width="50%" >
                <el-form :model="form"  :rules="rules"    ref="ruleForm"  style="max-height:90%;">
                    <el-row>
                      <el-col :span="12">
                            <el-form-item label="标题" :label-width="formLabelWidth" prop="name">
                            <el-input v-model="form.name" ></el-input>
                            </el-form-item>
                      </el-col>
                    </el-row>
                 

                      <el-row>
                      <el-col :span="12">
                            <el-form-item label="副标题：" :label-width="formLabelWidth">
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
                        <el-form-item label="封面图片" :label-width="formLabelWidth">
                                    <el-upload
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        list-type="picture-card"
                                        :on-preview="handlePictureCardPreview"
                                        :on-remove="handleRemove">
                                        <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                        </el-dialog>
                        </el-form-item>
                    </el-row>

                   
                    
                   
                    
                   


                  

                  

                   

                       <el-row>
                    <el-form-item label="图文内容" :label-width="formLabelWidth">
                                <div>
  <!-- bidirectional data binding（双向数据绑定） -->
  <quill-editor v-model="content"
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


    






</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
  // you can also register quill modules in the component
  import Quill from 'quill'
  import IndentStyle from './IndentStyle.js';
  import {newUpload}  from "../../../api/api"
//   import { someModule } from '../yourModulePath/someQuillModule.js'
//   Quill.register('modules/someModule', someModule)
    var Size = Quill.import('attributors/style/size');
    Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '32px'];
    Quill.register(Size, true);

export default {
      data() {
      return {

            content: '<h2>I am Example</h2>',
        editorOption: {
          // some quill options
        },
        editorOption : {}  ,  // 编辑器选项
        uploadData : {},
        photoUrl :''   ,      // 上传图片地址
        uploadType : ''  ,  // 上传的文件类型（图片、视频）
        fullscreenLoading : false,
        uniqueId:'Harry',
          form:{},
            formLabelWidth:'100px',
          dialogFormVisible:false,
            rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
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
    mounted() {
        console.log('this is current quill instance object', this.editor)
        this.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image", this.imgHandler)
    },
   methods: {
    ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
	  'decrement'
    ]),
     handleClick(row) {
        console.log(row);
      },
          handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
       add(){
        this.dialogFormVisible=true;
    },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
        submitForm(formName) {
    
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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
            var reader = new FileReader();
            var img = event.target.files[0];
            let param = new FormData(); //创建form对象
            param.append('file',img);//通过append向form对象添加数据
            newUpload(param).then((res)=>{
                    var url=res.data.imgUrl
                   if(res.data.imgUrl){
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