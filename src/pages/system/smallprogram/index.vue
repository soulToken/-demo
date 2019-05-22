<template>
	<div class="hw100">
        <!-- !authorization -->
		<div class="authorization_box" v-if="!authorization" flex="dir:top  cross:center">
            <div class="small_text"> 您还未授权小程序管理，请先授权</div>
              <el-button type="primary" @click="toBind">&nbsp;&nbsp;授权&nbsp;&nbsp;</el-button>
        </div>
        <div v-else class="alcenter">
          
            <!-- 恭喜您已经授权成功 -->
          
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                <el-tab-pane label="版本管理" name="first">
                            <el-card class="box-card" style="margin-top:15px;max-width:800px;">
                                    <div>
                                        <h3>线上版本</h3>
                                        <div flex="dir:left  box:justify">
                                                <div flex="dir:top cross:center">
                                                    <p>版本号</p>
                                                    <p>1.0.1</p>
                                                </div>
                                                 <div flex="dir:top " style="padding-left:30px;padding-right:30px;">
                                                    <p>发布者：100健康</p>
                                                    <p>发布时间：2019-03-5-555</p>
                                                    <p>描述： -03-sadasdasdasddddddddddddddxczsdasdsadad大萨达所大所发沙发发送阿法法师啊发顺丰安抚阿萨法师法师法师法师法法师sadasdasdasddddddddddddddxczsdasdsadad大萨达所大所发沙发发送阿法法师啊发顺丰安抚阿萨法师法师法师法师法法师sadasdasdasddddddddddddddxczsdasdsadad大萨达所大所发沙发发送阿法法师啊发顺丰安抚阿萨法师法师法师法师法法师-555</p>
                                                </div>
                                                <div flex="dir:top cross:center">
                                                    <el-button type="primary" >版本回退</el-button>
                                                </div>
                                        </div>
                                    </div>
                            </el-card>
                </el-tab-pane>
                <el-tab-pane label="模板消息" name="second">
                                    <el-table
                            :data="tableData"
                            :header-cell-style="rowClass"
                            style="width: 100%">
                            <el-table-column
                                prop="date"
                                label="消息名称"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="用途"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="推送示例">

                                <template slot-scope="scope">
                                        <el-button @click="textClick(scope.$index,scope.row)" type="text">文字按钮</el-button>
                                </template>

                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="接受对象">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="选用">

                                <template slot-scope="scope">
                                        <el-checkbox v-model="scope.checked"></el-checkbox>
                                </template>
                            </el-table-column>
                            </el-table>
                            <div style="text-align:center;margin-top:30px;">
                                    <el-button type="primary">保存</el-button>
                            </div>
                </el-tab-pane>
             
            </el-tabs>

        </div>




        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div>
            <p class="notice">为保证您的信息推送正常使用，将为您设置以下行业</p>
            <div class="notice"><span class="bolder"> 主营行业：</span>    <el-tag>IT科技</el-tag>   <el-tag>互联网电子商务</el-tag></div>
            <div class="notice"><span class="bolder">副营行业：   </span> <el-tag>医疗护理</el-tag>   <el-tag>医药医疗</el-tag></div>


        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>


          <el-dialog
        title="提示"
        :visible.sync="dialogVisible2"
        width="30%"
        :before-close="handleClose">
        <div>
         
        <img src="../../../assets/bg1.jpg" style="width:100%;" alt="">

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
        </span>
        </el-dialog>



	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import {isOrNotAuthorization,getComponentLoginPage,wechatAuth} from '../../../api/api'

export default {
    data() {
    return {
       authorization:false,
       dialogVisible:false,
       activeName2:'first',
         tableData: [{
            date: '预约成功通知',
            name: '关注公众号在愉悦中提醒',
            address: '用户',checked:true
          }, {
            date: '预约取消通知',
            name: '关注公众号在愉悦中提醒',
            address: '用户',checked:false
          }, {
            date: '医嘱提醒',
            name: '关注公众号在愉悦中提醒',
            address: '用户',checked:false
          }]
    };
  },
	computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'getCount'
      // ...
    ])
  },
  mounted(){
        if(this.$route.query.auth_code&&this.$route.query.expires_in){
            window.history.pushState({},0,window.location.href.split('?')[0])
            this.getAuth(this.$route.query.auth_code,this.$route.query.expires_in)
      }else{
            this.getDetail()
      }
  },
   methods: {
    ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
	  'decrement'
    ]),
    handleClick(tab, event) {
    console.log(tab, event);
    },
    textClick(index,row){
       console.log(index,row);
       this.dialogVisible2=true
    },
    rowClass({ row, rowIndex}) {
    console.log(rowIndex) //表头行下标
    return 'background:#999;color:#555' 
    },
    handleClose(done) {
        done();
    },
     getAuth(authCode,expiresIn){

           var self=this;
          var params={data:{authCode:authCode,expiresIn:expiresIn}}
             wechatAuth(params)
            .then(function(res) {
               if(res.code!==200){
                   self.$notify({
                        title: "错误",
                        message: res.msg,
                        type: "error"
                    });
                    return
               }
                if(res.data&&res.data.authCode==1){
                    self.getDetail();
              }else{
                    self.$notify({
                        title: "错误",
                        message: '授权失败请重新授权',
                        type: "error"
                    });
              }
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
    toBind(){
            var self=this;
          var params={data:{redirecturl:encodeURIComponent(window.location.href)}}
             getComponentLoginPage(params)
            .then(function(res) {
               if(res.code!==200){
                   self.$notify({
                        title: "错误",
                        message: res.msg,
                        type: "error"
                    });
                    return
               }
               
                if(res.data&&res.data.authUrl){
                  window.location.href=res.data.authUrl
              }else{
                  self.$notify({
                        title: "错误",
                        message: '未获取到url',
                        type: "error"
                    });
              }
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
    getDetail(){
         var self=this;
          var params={}
             isOrNotAuthorization(params)
            .then(function(res) {
               if(res.code!==200){
                   self.$notify({
                        title: "错误",
                        message: res.msg,
                        type: "error"
                    });
                    return
               }
              
              
               if(res.data&&res.data.categoryCode!==2&&res.data.categoryCode!==3){
                   self.authorization=false
               }else{
                    self.authorization=true
               }
             
            })
            .catch(function(error) {
              self.loading=false;
              self.$notify({
                title: "错误",
                message: "网络错误",
                type: "error"
              });
              
            
            });
    }
    //...mapActions({
    //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    //})
  }
}
</script>


<style scoped>

.headRow{
    background:red;
}
.small_text{
    margin-bottom: 15px;
    text-align: center;
}

.authorization_box{
    position:absolute;
    top:40%;
    left:40%;
}
.notice{
    margin:10px;
    color:#666;
}
.bolder{
    font-weight: 800;
    color:#000;
}

</style>