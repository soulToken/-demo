<template>
	<div>
<el-card class="box-card" style="max-width:1000px;margin:0 auto;">
 <div>
     <el-row>
         <el-col :span="24">
     <el-form ref="form" :model="form" label-width="100px">
       
    <el-form-item label="品牌介绍">
        <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>

    <el-row >
            <el-form-item label="门店头像">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                            <el-dialog :visible.sync="dialogVisible" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-upload>
            </el-form-item>
    </el-row>
    <el-row >
            <el-form-item label="就诊环境">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                            <el-dialog :visible.sync="dialogVisible" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-upload>
            </el-form-item>
    </el-row>
       <el-row >
            <el-form-item label="宣传图片">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                            <el-dialog :visible.sync="dialogVisible" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-upload>
            </el-form-item>
    </el-row>




  <el-form-item>
      <div style="text-align:center">
           <el-button style="margin:0 auto;" type="primary" @click="onSubmit">保存修改</el-button>
      </div>
  </el-form-item>
</el-form>
         </el-col>
</el-row>








 </div>
</el-card>

  
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
export default {
    data () {
      return {
        options: regionData,
        geocoder:null,
          dialogImageUrl: '',
        dialogVisible: false,
        selectedOptions: [],
         form: {
          name: '',
          region: '',
          input5:'',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
	computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'getCount'
      // ...
    ])
  },
  mounted(){
// 百度地图API功能
var self=this;
    this.$nextTick(() => {
            var center = new qq.maps.LatLng(39.916527,116.397128);
                var map = new qq.maps.Map(document.getElementById('container'),{
                    center: center,
                    zoom: 15
                });
    //调用地址解析类
           var  geocoder = new qq.maps.Geocoder({
                complete : function(result){
                    map.setCenter(result.detail.location);
                    var marker = new qq.maps.Marker({
                        map:map,
                        position: result.detail.location
                    });
                }
            });
            self.geocoder=geocoder;
    })
  },
   methods: {
    ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
	  'decrement'
    ]),
      onSubmit() {
        console.log('submit!');
      },
     handleChange (value) {
         //TextToCode  转汉字  CodeToText转code
        console.log(CodeToText[value[0]])
    
      },
      search(){
          debugger;
            this.geocoder.getLocation(this.form.input5);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    //...mapActions({
    //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    //})
  }
}
</script>