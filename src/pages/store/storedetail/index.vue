<template>
	<div>
<el-card class="box-card" style="max-width:1000px;margin:0 auto;">
 <div>
     <el-row>
         <el-col :span="24">
     <el-form ref="form" :model="form" label-width="100px">
         <el-row>
          <el-col :span="12">
                <el-form-item label="门店名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
          </el-col>
        </el-row>
  <el-form-item label="门店类型">
    <el-select v-model="form.region" placeholder="请选择类型">
      <el-option label="口腔" value="shanghai"></el-option>
      <el-option label="牙科" value="beijing"></el-option>
    </el-select>
  </el-form-item>


   <el-row >
    <el-col :span="12">
                <el-form-item label="门店座机">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
    </el-col>
    <el-col :span="12">
                <el-form-item label="门店手机">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
    </el-col>
 </el-row>
  <el-form-item label="营业时间：">
    <el-row style="margin-bottom:15px;">
        <el-col :span="2">上午</el-col>
            <el-col :span="20">
            <el-time-select
    placeholder="起始时间"
    v-model="form.startTime"
    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }">
  </el-time-select>
  <el-time-select
    placeholder="结束时间"
    v-model="endTime"
    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }">
  </el-time-select>
    </el-col>
    </el-row>

     <el-row>
        <el-col :span="2">下午</el-col>
            <el-col :span="20">
            <el-time-select
    placeholder="起始时间"
    v-model="form.startTime"
    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }">
  </el-time-select>
  <el-time-select
    placeholder="结束时间"
    v-model="endTime"
    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }">
  </el-time-select>
    </el-col>
    </el-row>
    
    
  </el-form-item>

     <el-form-item label="所在地区"> 
            <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange">
            </el-cascader>
     </el-form-item>


     <el-form-item label="店铺地址"> 
          
                <el-input placeholder="请输入内容" v-model="form.input5" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
       
     </el-form-item>



     <el-form-item label="地图定位"> 
                <el-row :span="24">
                    <div id="container" style="width:100%;height:500px;"></div>
                </el-row>
               
       
     </el-form-item>
    <el-form-item label="详细地址">
        <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
 <el-row >
    <el-col :span="12">
                <el-form-item label="wifi名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
    </el-col>
    <el-col :span="12">
                <el-form-item label="wifi密码">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
    </el-col>
 </el-row>
    <el-row >
            <el-form-item label="wifi图片">
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
           <el-button style="margin:0 auto;" type="primary" @click="onSubmit">保存</el-button>
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