<template>
	<div>
		<div style="margin-bottom:30px;"><el-button type="primary"  icon="el-icon-d-arrow-left"  @click="goBack">回退</el-button>
				
				<div  class="fr">
				
				<el-button type="primary"  icon="el-icon-d-arrow-left"  @click="toChange">编辑d</el-button>
				
				
				</div>
				</div>
				
				
				<el-breadcrumb separator="/">
					  <el-breadcrumb-item>公众号管理</el-breadcrumb-item>
					  <el-breadcrumb-item>卡券管理</el-breadcrumb-item>
				</el-breadcrumb>
			<div class="clearfix" style="margin-top:30px;">
					
									
												<div class="float_left" style="width:325px;height:500px;background:#fff;margin-left:30px;">
													<el-row  class="card_list2" type="flex"  justify="space-between">
																								<el-col :span="20" style="padding-left:10px;"><i class="el-icon-arrow-left"></i></el-col>
																								<el-col :span="2"> <i class="el-icon-more"></i></el-col>
													</el-row>
													<div style="padding:10px 25px">
															<div class="card_head_box" :style="{background:color}">
																	<el-row style="margin-top:10px;">
																		<el-col :span="4">
																				<div class="card_head" :style="{background:'url('+form.logoUrl+') no-repeat center'}"></div>	
																		</el-col>
																		<el-col :span="20">
																		<div >{{form.brandName}}</div>
																		<div >{{form.title}}</div>
																		</el-col>
																	</el-row>
															</div>
													</div>
													<div class="card_list_box">
															<el-row  class="card_list" type="flex"  justify="space-between">
																		<el-col :span="20">会员中心</el-col>
																		<el-col :span="2"> <i class="el-icon-arrow-right"></i></el-col>
															</el-row>
															<el-row  class="card_list" type="flex"  justify="space-between">
																		<el-col :span="20">会员详情</el-col>
																		<el-col :span="2"> <i class="el-icon-arrow-right"></i></el-col>
															</el-row>
													</div>			
												</div>
												
												
												<div class="fl" style="margin-left:30px;">
														<div class="text item clearfix">
														   		<div class="detail_left fl">商户：</div>
														   		<div class="detail_right fl">{{form.brandName}}</div>
														 </div>
														 <div class="text item clearfix">
														   		<div class="detail_left fl">会员卡标题：</div>
														   		<div class="detail_right fl">{{form.title}}</div>
														 </div>
														 <div class="text item clearfix">
														   		<div class="detail_left fl">副标题：</div>
														   		<div class="detail_right fl"></div>
														 </div>
														 <div class="text item clearfix">
														   		<div class="detail_left fl">会员卡颜色：</div>
														   		<div class="detail_right fl">
														   				<div class="color_box" :style="{background:color}"></div>
														   		</div>
														 </div>
														 <div class="text item clearfix">
														   		<div class="detail_left fl">有效期：</div>
														   		<div class="detail_right fl">{{timeliness}}</div>
														 </div>
														  <div class="text item clearfix">
														   		<div class="detail_left fl">可用时段：</div>
														   		<div class="detail_right fl"></div>
														 </div>
														 <span>商户介绍</span>
														  <div class="text item clearfix">
														   		<div class="detail_left fl">客服电话：</div>
														   		<div class="detail_right fl">{{service_phone}}</div>
														 </div>
														  <div class="text item clearfix">
														   		<div class="detail_left fl">客服服务：</div>
														   		<div class="detail_right fl">{{bussiness_name}}</div>
														 </div>
														  <span>会员卡详情</span>
														   <div class="text item clearfix">
														   		<div class="detail_left fl">积分规则</div>
														   		<div class="detail_right fl" v-if="bonus_rule.cost_money_unit" >
														   			<div >没消费 {{bonus_rule.cost_money_unit?bonus_rule.cost_money_unit/100:''}}  元,赠送 {{bonus_rule.increase_bonus}}积分</div>
														   			<div>单次赠送上线 {{bonus_rule.max_increase_bonus}} 积分</div>
														   			<div>每使用{{bonus_rule.cost_bonus_unit}} 积分，抵扣{{bonus_rule.reduce_money?bonus_rule.reduce_money/100:''}} 元</div>
														   			<div>订单满{{bonus_rule.least_moneyto_use_bonus?bonus_rule.least_moneyto_use_bonus/100:''}}  元可用 ，单笔上限 {{bonus_rule.max_reduce_bonus}} 积分</div>
														   			<div>激活赠送  {{bonus_rule.init_increase_bonus}} 积分</div>
														   		</div>
														   		
														 </div>
														 <div class="text item clearfix">
														   		<div class="detail_left fl">享受折扣：</div>
														   		<div class="detail_right fl" >{{bonus_rule.discount}}</div>
														 </div> 
														 <span>服务消息</span>
														 <div class="text item clearfix">
														   		<div class="detail_left fl">适用门店：</div>
														  		<div class="detail_right fl" v-if="poiData.length>0">
														   				 <el-table   :stripe=true ref="multipleTable"    v-if="poiData.length>0" :data="poiData" tooltip-effect="dark" style="width: 100%">
								                                             	<el-table-column label="门店名称" >
								                                                        <template slot-scope="scope"  v-if="scope.row.base_info">{{ scope.row.base_info.business_name}}</template>
								                                                </el-table-column>
								                                                <el-table-column  label="地址">
								                                                        <template slot-scope="scope"   v-if="scope.row.base_info">{{ scope.row.base_info.address}}</template>
								                                                </el-table-column>
								                                        </el-table>  
														   		</div>
														   		<div class="detail_right fl" v-else>
														   					全部门店 
														   		</div> 
														 </div>
														 <div class="text item clearfix">
														   		<div class="detail_left fl">自定义入口：</div>
														   		<div class="detail_right fl"></div>
														 </div>
														 <span>领券设置</span>
														 <div class="text item clearfix">
														   		<div class="detail_left fl">分享设置：</div>
														   		<div class="detail_right fl">用户可以分享卡连接</div>
														 </div>
														 <div class="text item clearfix">
														   		<div class="detail_left fl">激活设置：</div>
														   		<div class="detail_right fl">
														   			{{activateText}}
														   		</div>
														 </div>
														 <div class="text item clearfix">
														   		<div class="detail_left fl">激活信息：</div>
														   		<div class="detail_right fl">
														   			<div v-if="optionalText">必填：  {{requiredText}}</div>
														   			<div v-if="optionalText">选填填：  {{optionalText}}</div>
														   		</div>
														 </div>
												</div>
									
						
			</div>
				
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
     data: function () {
    return {
    	  rules: {
    		  title: [
                { required: true, message: '请输入名称',  trigger: ['blur', 'change']  },
                { min: 1, max: 9, message: '长度在 1 到 9 个字符', trigger: ['blur', 'change'] }
              ],
              brandName: [
                  { required: true, message: '请输入名称',  trigger: ['blur', 'change']  },
                  { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: ['blur', 'change'] }
                ],
              notice: [
                { required: true, message: '使用须知',  trigger: ['blur', 'change']  }
              ],
              description: [
                  { required: true, message: '使用须知',  trigger: ['blur', 'change']  }
                ],
              color:[
            	  { required: true, message: '请选择颜色',  trigger: 'change' },
              ],
              dateInfoType: [
                  { required: true, message: '选择有效期',  trigger: 'change' },
                ],
	            quantity:[
	            	  { required: true, message: '请输入库存',  trigger: ['blur', 'change'] },
	            ],
	            	logoUrl:[
	            		{ required: true, message: '上传图片',  trigger: ['blur', 'change'] }
	            		
	            ],
	            prerogative:[
	            	{ required: true, message: '必填',  trigger: ['blur', 'change'] }
	            ]
            },
        business_list:[
        
        	
        ], //门店列表
        hit:true,
        tableData:[
    		{
    			name:'手机号',
    			checked:true,
    			must:true,
    			type:'USER_FORM_INFO_FLAG_MOBILE'
    		},
    		{
    			name:'性别',
    			checked:false,
    			must:false,
    			type:'USER_FORM_INFO_FLAG_SEX'
    		},
    		{
    			name:'姓名',
    			checked:false,
    			must:false,
    			type:'USER_FORM_INFO_FLAG_NAME'
    		},
    		{
    			name:'生日',
    			checked:false,
    			must:false,
    			type:'USER_FORM_INFO_FLAG_BIRTHDAY'
    		},
    		{
    			name:'身份证',
    			checked:false,
    			must:false,
    			type:'USER_FORM_INFO_FLAG_IDCARD'
    		},
    		{
    			name:'邮箱',
    			checked:false,
    			must:false,
    			type:'USER_FORM_INFO_FLAG_EMAIL'
    		},
    		{
    			name:'详细地址',
    			checked:false,
    			must:false,
    			type:'USER_FORM_INFO_FLAG_LOCATION'
    		},
    		{
    			name:'教育背景',
    			checked:false,
    			must:false,
    			type:'USER_FORM_INFO_FLAG_EDUCATION_BACKGRO'
    		},
    		{
    			name:'行业',
    			checked:false,
    			must:false,
    			type:'USER_FORM_INFO_FLAG_INDUSTRY'
    		},
    		{
    			name:'收入',
    			checked:false,
    			must:false,
    			type:'USER_FORM_INFO_FLAG_INCOME'
    		},
    		{
    			name:'兴趣爱好',
    			checked:false,
    			must:false,
    			type:'USER_FORM_INFO_FLAG_HABIT'
    		}
    	],
        backgroundColorList:[
        	{
        		name:'Color010',
        		color:'#63b359',
        		hit:true,
        		size:'small'
        	},
        	{
        		name:'Color020',
        		color:'#2c9f67',
        		hit:true,
        		size:'small'
        	},
        	{
        		name:'Color030',
        		color:'#509fc9',
        		hit:false,
        		size:'small'
        	},
        	{
        		name:'Color040',
        		color:'#5885cf',
        		hit:false,
        		size:'small'
        	},
        	{
        		name:'Color050',
        		color:'#9062c0',
        		hit:false,
        		size:'small'
        	},
        	{
        		name:'Color060',
        		color:'#d09a45',
        		hit:false,
        		size:'small'
        	},
        	{
        		name:'Color070',
        		color:'#e4b138',
        		hit:false,
        		size:'small'
        	},
        	{
        		name:'Color080',
        		color:'#ee903c',
        		hit:false,
        		size:'small'
        	},
        	{
        		name:'Color081',
        		color:'#f08500',
        		hit:false,
        		size:'small'
        	},
        	{
        		name:'Color082',
        		color:'#a9d92d',
        		hit:false,
        		size:'small'
        	},
        	{
        		name:'Color090',
        		color:'#dd6549',
        		hit:false,
        		size:'small'
        	},
        	{
        		name:'Color100',
        		color:'#cc463d',
        		hit:false,
        		size:'small'
        	}
        	
        ],
    	clinicName:'',  //诊所名称
    	poiData:[],
    	role:"",//角色
    	mobile:'',//登录手机
    	password:'',//密码
  
    	dialogVisible: false,
    	oldPassword:'',
    	newPassword:'',
    	confirmNewPassword:'',
    	clinicId:'',
    	doctorId:'',
    	access_token:"",
    	evaData:null,
    	color:'',//颜色
    	// "customCell1Name":"使用入口2",
	    //"customCell1Tips":"激活后显示",
	    //"customCell1Url":"https://sit.100care.cn/wechat_manage/login",
    	 form: {
    		 codeType:'CODE_TYPE_QRCODE',
    		 "getLimit":1,
    		    "useCustomCode":"0",
    		    "canGiveFriend":"0",
    		    "supplyBonus":"0",
    		    "supplyBalance":"0",
    		    "prerogative":"会员卡使用特权各种限制说明!",
                "autoActivate": '1',
           },
           
           pickerOptions2: {
               shortcuts: [{
                 text: '最近一周',
                 onClick(picker) {
                   const end = new Date();
                   const start = new Date();
                   start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                   picker.$emit('pick', [start, end]);
                 }
               }, {
                 text: '最近一个月',
                 onClick(picker) {
                   const end = new Date();
                   const start = new Date();
                   start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                   picker.$emit('pick', [start, end]);
                 }
               }, {
                 text: '最近三个月',
                 onClick(picker) {
                   const end = new Date();
                   const start = new Date();
                   start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                   picker.$emit('pick', [start, end]);
                 }
               }]
             },
             value6: '',
             value7: '',
             textarea:"",
             checkedCities:['积分', '等级'],
             checkedCities1: ['积分', '等级'],
             cities: ['积分', '余额', '等级', '折扣 ','优惠券'],
             fileList: [{
                 name: 'food.jpeg',
                 url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
               }, {
                 name: 'food2.jpeg',
                 url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
               }],
               checked:true,
               checked2:true,
               timeliness:'',//有效时长
               service_phone:'',
               bussiness_name:'',
               business_service:[{
              	 code:"BIZ_SERVICE_DELIVER",
              	 name:'外卖服务'
               },
               {
              	 code:'BIZ_SERVICE_FREE_PARK',
              	 name:"停车位"
               },
               {
              	 code:'BIZ_SERVICE_WITH_PET',
              	 name:"可带宠物",
              	 
               },
               {
              	 code:'BIZ_SERVICE_FREE_WIFI',
              	 name:'免费wifi'
               }
               ],
               bonus_rule:{},//积分规则
               activateText:'', //激活字段
      
    	
    }},
	computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'getCount'
      // ...
    ])
  },
    mounted: function () {
	  	console.log(this.cardId)
	  	this.getDetail();
	  	this.getCardDetail()
  },
   methods: {
    ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
	  'decrement'
    ]),
     getCardDetail:function(id){
		    	var self=this;
                
     },
     getDetail(){

     },
     goBack(){
         this.$router.go(-1)
     }
  }
}
</script>

<style scoped>
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 500px;
    height:100%;
  }
  .marginAuto{
  	margin:0 auto;
  }
  .al_center{
  text-align:center;
  }
  .el-upload-dragger{
  width:200px;}
  
  .float_left{
  	float:left;
  }
  .card_head_box{
  	border-radius:10px;
 	border:1px solid #eee;
  	width:100%;
  	height:150px;
  	overflow:hidden;
  	padding:10px;
  	box-sizing:border-box;
  	background-size:cover;
  }
  .card_head{
  	background-size:contain;
  }
  #app{
  	background:#eee;
  }
  .card_head{
  	width:30px;
  	height:30px;
  	border-radius:50%;
  	background:#fff;
  }
  .card_list_box{
  	padding:0 10px;
  	margin-top:20px;
  }
  .card_list_box2{
  	padding:0 10px;
  }
  .card_list{
  	width:100%;
  	height:40px;
  	border-top:1px solid #eee;
  	border-bottom:1px solid #eee;
  	line-height:40px;
  	cursor:pointer;
  }
  .card_list2{
  	width:100%;
  	height:40px;
 	cursor:pointer;
  	line-height:40px;
  }
  .card_list:nth-child(even){
   	border-top:none;
  }
  .card_text_notice{
  	background:#eee;
  	padding-left:10px;
  	height:35px;
  	line-height:35px;
  }
  .is-hit{
  	border:10px;
  }
  .fl{
  	float:left;
  }
  .fr{
  	float:right;
  }
  .color_box{
  height:40px;
  width:40px;
  border-radius:4px;
  }
  .detail_left{
  	color:#999
  }
</style>
