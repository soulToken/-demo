<template>
	<div class="demo-dynamic" style="max-width:600px;">
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
  <el-form-item
    prop="email"
    label="商户号"
    :rules="[
      { required: true, message: '请输入商户号', trigger: ['blur', 'change'] },
    ]"
  >
    <el-input v-model="dynamicValidateForm.email"></el-input>
  </el-form-item>
  <el-form-item
    prop="email"
    label="商户秘钥"
    :rules="[
      { required: true, message: '请输入商户秘钥', trigger: ['blur', 'change'] },
    ]"
  >
    <el-input v-model="dynamicValidateForm.email2"></el-input>
  </el-form-item>
    <el-form-item
    prop="email"
    label="支付证书"
        :rules="[
        { required: true, message: '请上传中证书', trigger: ['blur', 'change'] },
        ]"
    >
    <el-upload
    ref="upload"
    class="upload-demo"
    :auto-upload="false"
    :on-change="loadChange"
    :show-file-list="false"
    :multiple="false"
    :limit="1"
    drag
    action="https://jsonplaceholder.typicode.com/posts/"
    >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
   
  </el-form-item>







  <el-form-item>
      <el-button style="margin-left:80px;" type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
    
    
  </el-form-item>
</el-form>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
     data() {
      return {
           fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        dynamicValidateForm: {
          email: '',
          email2:''
        }
      };
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

    loadChange(){
debugger;
    },
     submitForm(formName) {
              console.log(this.$refs.upload.uploadFiles)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      }
    //...mapActions({
    //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    //})
  }
}
</script>

<style scoped>
.demo-dynamic{
    max-width: 800px;
}
</style>
