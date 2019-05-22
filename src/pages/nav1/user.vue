<template>
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
  <!-- Or manually control the data synchronization（或手动控制数据流） -->
</template>
<script>
 
  // you can also register quill modules in the component
  import Quill from 'quill'
  import IndentStyle from './IndentStyle.js';
  import {newUpload}  from "../../api/api"
//   import { someModule } from '../yourModulePath/someQuillModule.js'
//   Quill.register('modules/someModule', someModule)
    var Size = Quill.import('attributors/style/size');
    Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '32px'];
    Quill.register(Size, true);

  export default {
    data () {
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
        uniqueId:'Harry'
      }
    },
    // manually control the data synchronization
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
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
  },
    mounted() {
        console.log('this is current quill instance object', this.editor)
        this.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image", this.imgHandler)
    }
  }
</script>

<style>
.ql-toolbar{
  white-space: normal;
}
.ql-picker-item[data-value='10px']::before, .ql-picker-label[data-value='10px']::before {
  content: '10px' !important;
}

.ql-picker-item[data-value='12px']::before, .ql-picker-label[data-value='12px']::before {
  content: '12px' !important;
}

.ql-picker-item[data-value='14px']::before, .ql-picker-label[data-value='14px']::before {
  content: '14px' !important;
}

.ql-picker-item[data-value='16px']::before, .ql-picker-label[data-value='16px']::before {
  content: '16px' !important;
}

.ql-picker-item[data-value='18px']::before, .ql-picker-label[data-value='18px']::before {
  content: '18px' !important;
}

.ql-picker-item[data-value='20px']::before, .ql-picker-label[data-value='20px']::before {
  content: '20px' !important;
}

.ql-picker-item[data-value='24px']::before, .ql-picker-label[data-value='24px']::before {
  content: '24px' !important;
}

.ql-picker-item[data-value='30px']::before, .ql-picker-label[data-value='30px']::before {
  content: '30px' !important;
}

.ql-picker-item[data-value='32px']::before, .ql-picker-label[data-value='32px']::before {
  content: '32px' !important;
}

.ql-picker-item[data-value='36px']::before, .ql-picker-label[data-value='36px']::before {
  content: '36px' !important;
}
</style>