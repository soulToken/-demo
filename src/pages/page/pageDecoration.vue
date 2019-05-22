<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="tabPanel">
    <el-tab-pane  v-for="(items,index) in tabList" :label="items.label"  :key="index" :name="items.label">
      <el-col :span="8" class="template-classification" :key="index"  v-for="(item,index) in items.dataList">
        <h2>{{item.title}}</h2>
        <div class="grid-content"  :key="index"  v-for="(item1,index) in item.data">
          <img :src="item1.imgUrl" width="100%"/>
          <el-row>
            <el-button plain @click="checkedTemplate">使用该模板</el-button>
          </el-row>
        </div>
      </el-col>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import {clinicTempleteReal,clinicTempleteList} from '../../api/api'
    export default {
        data () {
            return {

                activeName: '用户管理',
                tabList:[
                    { label:"用户管理",
                      dataList:[
                          {
                            title:"简洁通用1",
                            data:[
                                {imgUrl:require ("../../assets/test.jpg")},
                            ]
                          },
                          {
                              title:"简洁通用2",
                              data:[
                                  {imgUrl:require ("../../assets/test.jpg")},
                              ]
                          },
                      ],
                    },
                    { label:"口腔模板1",
                        dataList:[
                            {
                                title:"简洁通用3",
                                data:[
                                    {imgUrl:require ("../../assets/test.jpg")},
                                ]
                            },
                            {
                                title:"简洁通用2",
                                data:[
                                    {imgUrl:require ("../../assets/test.jpg")},
                                ]
                            }
                        ],
                    },
                    { label:"口腔模板2",
                        dataList:[
                            {
                                title:"简洁通用4",
                                data:[
                                    {imgUrl:require ("../../assets/test.jpg")},
                                ]
                            },
                            {
                                title:"简洁通用2",
                                data:[
                                    {imgUrl:require ("../../assets/test.jpg")},
                                ]
                            }
                        ],
                    }
                ]
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            checkedTemplate(){
                console.log("选择该模板")
                this.getTemplate();
            },
            //clinicTempleteList
            getList(){
                           var self=this;
          var params={data:{templetClassfyItem:"218825-1"}}
                        clinicTempleteList(params)
                        .then(function(res) {
                        if(res.code!==200){
                            self.$notify({
                                    title: "错误",
                                    message: res.msg,
                                    type: "error"
                                });
                                return
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
            getTemplate(id){
                 var self=this;
          var params={data:{templetCode:id||'2'}}
             clinicTempleteReal(params)
            .then(function(res) {
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
                message: "发布成功",
                type: "success"
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
            }
        },
        mounted() {
            this.getList();
        }
    }
</script>

<style scoped>
  h2 {
    margin: 0;
    padding: 0;
  }
  .tabPanel {
    padding-left: 10px;
  }
  .template-classification {
    border: 1px solid red;
    text-align: center;
    padding: 10px
  }
  .template-classification h2 {
    padding: 0;
    font-size: 16px;
    margin-bottom: 15px;
  }
  .grid-content {
    border: 1px solid #1d74cc;
    padding: 15px 40px ;
  }
  .grid-content button {
    margin-top: 20px;
  }
</style>
