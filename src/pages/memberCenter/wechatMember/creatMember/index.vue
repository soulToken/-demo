<template>
	<div >
        <el-row type="flex" class=""   style="margin-top:30px;">
					 <el-row :span="18" > 
						<el-form ref="form"  :rules="rules" :model="form" label-width="80px">
								<div style="margin-bottom:10px;">会员卡公众字段:</div>
						<el-row>
								<el-col :span="12">
									<el-form-item label="商户名称"  prop="brandName">
									    <el-input v-model="form.brandName"></el-input>
									  </el-form-item>
								  <el-form-item label="卡券名称"  prop="title">
								    <el-input v-model="form.title"></el-input>
								  </el-form-item>
								  <el-form-item label="卡面颜色" prop="color">
								  		
								  			<el-tag style="margin-right:10px;" :key="index"   @click="tagClick(index)" :size="item.size" :color="item.color" :hit="item.hit" v-for="(item,index) in backgroundColorList">&nbsp;&nbsp;&nbsp;</el-tag>
								  </el-form-item>
								   <el-form-item label="有效期"  prop="dateInfoType">
								  			  	 <el-radio v-model="form.dateInfoType"  @change="timeChoose" label="DATE_TYPE_PERMANENT">永久有效</el-radio>
								  			   <!--   <el-radio v-model="form.dateInfoType" @change="timeChoose" label="DATE_TYPE_FIX_TERM_RANGE">固定日期</el-radio> -->
		  									  <!--    <el-date-picker
		  									     	  v-if="form.dateInfoType=='DATE_TYPE_FIX_TERM_RANGE'"
												      v-model="value7"
												      type="daterange"
												      align="right"
												      unlink-panels
												      range-separator="至"
												      start-placeholder="开始日期"
												      end-placeholder="结束日期"
												      @change="timeChange"
												      value-format="timestamp"
												      :picker-options="pickerOptions2">
												 </el-date-picker>
 -->								  </el-form-item>
								  <el-form-item  v-if="!canChange" label="卡券库存"  prop="quantity">
								     <el-input-number v-model="form.quantity"  :min="1" :max="100000000" label="库存"></el-input-number>
								  </el-form-item>
								  <el-form-item label="适用门店">
								   			   <el-radio  @change="business_name_change" v-model="form.useAllLocations" label="1">全部门店</el-radio>
								   			   <el-checkbox-group v-model="checkList"  @change="business_name_change2"  v-if="business_list.length>0">
								   			   		<el-checkbox :label="item.base_info.poi_id" :key="index"   v-for="(item,index) in business_list">{{item.base_info.business_name}}</el-checkbox>
								   			   </el-checkbox-group>
								  </el-form-item>
								  
								  
								  <el-form-item  v-if="!canChange" label="是否自动激活">
								   			 <el-switch
												  v-model="form.autoActivate"
												  active-text="是"
												  active-value="1"
												  inactive-value="0"
												  @change="autoChange"
												  inactive-text="否">
												</el-switch>
								  </el-form-item>
								 <el-form-item v-if="!canChange" label="是否一键开卡">
								   			 <el-switch
												  v-model="form.wxActivate"
												  active-text="是"
												  active-value="1"
												  inactive-value="0"
												  @change="activeChange"
												  inactive-text="否">
												</el-switch>
								  </el-form-item> 
								<!--   <el-form-item label="激活url"  prop="activateUrl">
									    <el-input v-model="form.activateUrl"></el-input>
								  </el-form-item> -->
								  
								   <el-form-item label="卡券使用说明" prop="description">
								   			 	<el-input
												  type="textarea"
												  :rows="5"
												  :max="1024"
												  placeholder="请输入内容"
												  v-model="form.description">
												</el-input>
								  </el-form-item>
								</el-col>	
										<el-col :span="12">
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
										</el-col>			
						</el-row>
						  <div style="margin-bottom:10px;">微信渠道专用字段:</div>
						  <el-row>
							<el-col :span="12">
						  	   <el-form-item label="卡面logo"  prop="logoUrl">
						   			 			<el-upload
													 ref="upload"
													  class="upload-demo"
													  drag
													  action="http://clinic.100care.cn" 
													  :on-success="uploading"
													  :show-file-list="false"
													>
													  <i class="el-icon-upload"></i>
													  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
													  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
												</el-upload>	
						  		</el-form-item>
						  		 <el-form-item label="标准栏位" prop="supplyBonus">
								   			  <el-checkbox-group 
											    v-model="checkedCities1"
											    
											    
											    :min="0"
											    :max="3">
											    <el-checkbox v-for="city in cities"    @change="supplyChange"  :label="city"  :disabled="city=='余额'" :key="city">{{city}}</el-checkbox>
											  </el-checkbox-group>
											  
											  <!-- 	<el-input  @change="customField1UrlChange"   v-model="access_token"></el-input> -->
											  
											  
											  <el-form-item  v-if="form.customField1NameType&&form.customField1NameType=='FIELD_NAME_TYPE_LEVEL'||form.customField1NameType=='1'" label="等级url:"  >
											    	
											    	
											    	<!-- <el-input v-if="canChange"    v-model="customField1Url"></el-input> -->
											    	<el-input    v-model="form.customField1Url"></el-input>
											  </el-form-item>
											  
											  <el-form-item  v-if="form.customField2NameType&&form.customField2NameType=='FIELD_NAME_TYPE_DISCOUNT'" label="折扣url:"  >
											    	<el-input v-model="form.customField2Url"></el-input>
											  </el-form-item>
											  
											  <el-form-item  v-if="form.customField3NameType&&form.customField3NameType=='FIELD_NAME_TYPE_COUPON'" label="优惠券url:"  >
											    	<el-input   v-model="form.customField3Url"></el-input>
											  </el-form-item>
											  
											  
											  
											  <!-- <div  v-if="form.customField1NameType&&form.customField1NameType=='1'">
													<el-input v-model="form.customField1Url">
														 <template slot="prepend">等级跳转url</template>
													</el-input>
                                              </div> -->
											 <!-- 积分跳转url:<el-input v-model="form.customField1Url"></el-input> -->
											  
											  <p style="color:#999">
											  		未提交《单用途预付款卡备案》的用户不可使用余额
											  </p>
											  <p style="color:#999">
											  		最多选择三种信息进行展示（提示：会员信息设置后，暂不支持对积分,余额的修改）
											  </p>			  
								  </el-form-item>
						  		
						  		
						  		  <el-form-item label="快速入口"  >
								    		<el-switch @change="quickly" v-model="form.delivery"></el-switch>	
								    		<div v-if="form.delivery">
										      <el-form-item label="入口名称"  prop="customCell1Name" style="margin-top:15px;">
											    <el-input v-model="form.customCell1Name"></el-input>
											  </el-form-item>
											  <el-form-item label="提示语"  prop="customCell1Tips" style="margin-top:15px;">
											    <el-input v-model="form.customCell1Tips"></el-input>
											  </el-form-item>
											  <el-form-item label="跳转链接"  prop="customCell1Url" style="margin-top:15px;">
											    <el-input v-model="form.customCell1Url"></el-input>
											  </el-form-item>
								    		</div>
								    
								  </el-form-item>
								  
								   <el-form-item label="营销入口">
								   					 
								   					   <el-button plain  @click="add"  v-if="!addPromotion">增加入口</el-button>
								   					  
								   						<div v-else  style="margin-top:15px;">
								   								<div class="clearfix">
								   									<el-button style="float:right;"  @click="delectAdd" type="text">删除</el-button>
								   								</div>
															      <el-form-item label="入口名称"  prop="promotionUrlName" style="margin-top:15px;">
																    <el-input v-model="form.promotionUrlName"></el-input>
																  </el-form-item>
																  <el-form-item label="提示语"  prop="promotionUrlSubTitle" style="margin-top:15px;">
																    <el-input v-model="form.promotionUrlSubTitle"></el-input>
																  </el-form-item>
																  <el-form-item label="跳转链接"  prop="promotionUrl" style="margin-top:15px;">
																    <el-input v-model="form.promotionUrl"></el-input>
																  </el-form-item>
								    					</div>
								    					
								   					<!--   <p>
											  				注：最多可添加两个入口
											  			</p> -->
								  </el-form-item>
						</el-col>
						</el-row>
								  
								  
							<div style="margin-top:30px;">
				
								<div style="margin-bottom:10px;">会员卡详情:</div>
						<el-row>
							<el-col :span="12">
								  
								   <el-form-item label="使用提醒" prop="notice">
								   			 	<el-input
												  type="textarea"
												  :rows="2"
												  :max="16"
												  placeholder="请输入内容"
												  v-model="form.notice">
												</el-input>
								  </el-form-item>
									      <el-form-item label="卡券特权说明" prop="prerogative">
									   			 	<el-input
													  type="textarea"
													  :rows="5"
													  :max="1024"
													  placeholder="请输入内容"
													  v-model="form.prerogative">
													</el-input>
									  	   </el-form-item>
									  <el-form-item label="电话">
								    	<el-input v-model="form.servicePhone" type="number"></el-input>
								  	  </el-form-item>
								  		<el-form-item  v-if="!canChange" label="商户服务">
											  <el-checkbox-group v-model="form.businessService2" @change="handleCheckedCitiesChange">
											    <el-checkbox v-for="(item,index) in business_service" :label="item.code" :key="index">{{item.name}}</el-checkbox>
											  </el-checkbox-group>
										</el-form-item>	 
										
										
										<el-form-item  v-if="!canChange" label="图文介绍">
										
													<div v-if="showTextImage">
														
														<el-upload
													 ref="upload"
													  class="upload-demo"
													  drag
													  action="http://clinic.100care.cn" 
													  :on-success="uploading2"
													  :show-file-list="false"
													>
													  <i class="el-icon-upload"></i>
													  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
													
													  
												</el-upload>	
													  <el-input
													  type="textarea"
													  :rows="5"
													  :max="1024"
													  placeholder="请输入内容"
													  v-model="listText">
													</el-input>
													 <div class="clearfix">
													 	<el-button type="primary" style="float:right;"  @click="confirmList">确定</el-button>
													 </div> 
													</div>
										
													<el-button type="primary" icon="el-icon-circle-plus-outline"  @click="addTextImage">添加图文</el-button>
										</el-form-item>	 
										
										
							</el-col>
									<el-col :span="12">
											<div class="float_left" style="width:325px;height:500px;background:#fff;overflow:auto;margin-left:30px;overflow-y:scroll;">
														<el-row  class="card_list2" type="flex"  justify="space-between">
																			<el-col :span="20" style="padding-left:10px;"><i class="el-icon-arrow-left"></i></el-col>
																			<el-col :span="2"> <i class="el-icon-more"></i></el-col>
														</el-row>
														
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
														
														<div  v-if="!canChange" v-for="(item,index) in  form.text_image_list"  :key="index">
																<el-button  type="text"  @click="delectText_image(index)">删除</el-button>
																<img :src="item.image_url" />
																<div style="text-align:center">{{item.text}}</div>
														</div>
														
														
											</div>
									</el-col>
								</el-row>
						
							</div>
									
								
								<div style="margin-top:30px;"  v-if="!canChange">
				
											<div style="margin-bottom:10px;">开卡资料:  手机号必填</div> 
						<el-row>
							<el-col :span="12">
										  <el-table
										   ref="multipleTable"
									      :data="tableData"
									      style="width: 100%">
											      <el-table-column
											        prop="name"
											        label="信息名称"
											        >
											      </el-table-column>
											      <el-table-column
											        prop="checked"
											        label="启用"
											       >
											        <template slot-scope="scope"><el-checkbox v-model="scope.row.checked"  @change="messChange(scope.$index,scope.row)"  ></el-checkbox></template>
											      </el-table-column>
											      <el-table-column
											        prop="must"
											        label="必填">
											        
											          <template slot-scope="scope"><el-checkbox v-model="scope.row.must"  @change="messChange2(scope.$index,scope.row)"></el-checkbox></template>
											      </el-table-column>
   											</el-table>
										
						
										
								  	
							</el-col>
											<el-col :span="12">
												  	<div class="float_left" style="width:325px;height:500px;background:#fff;margin-left:30px;overflow-y:auto;">
												  			<el-row  class="card_list2" type="flex"  justify="space-between">
																			<el-col :span="20" style="padding-left:10px;"><i class="el-icon-arrow-left"></i></el-col>
																			<el-col :span="2"> <i class="el-icon-more"></i></el-col>
															</el-row>
												  			<div class="card_text_notice">
												  				必填
												  			</div>
												  			<div class="card_list_box2">
																<el-row		v-for="(item,index) in requiredFormCommonFieldIdList" :key="index"  type="flex" justify="space-between">
																			<el-col :span="20">{{item}}</el-col>
																			<el-col :span="2"> <i class="el-icon-arrow-right"></i></el-col>
																</el-row>
															</div>
															<div class="card_text_notice">
												  				选填
												  			</div>
												  			<div class="card_list_box2">
																<el-row		v-for="(item,index) in optionalFormCommonFieldIdList" :key="index"  class="card_list" type="flex"  justify="space-between">
																			<el-col :span="20">{{item}}</el-col>
																			<el-col :span="2"> <i class="el-icon-arrow-right"></i></el-col>
																</el-row>
															</div>
												  	</div>
										  	</el-col>	
								</el-row>
						</div>
					
						
						<div style="margin-top:10px;">会员卡优惠</div> 
								  		<el-col :span="24"     >
								  				 <el-form-item   label="">
										  				<el-checkbox v-model="checked">积分优惠</el-checkbox>
										  				<el-checkbox v-model="checked2">折扣优惠</el-checkbox>
										  		 </el-form-item>	
						</el-col>
						
						 						<div  v-if="checked">
										  				  <div class="text item">
														   	消费送积分     每消费 <el-input-number v-model="form.initcostMoneyUnit"  size="small" :precision="2" :controls="false" controls-position="right" @change="handleChange"></el-input-number>元，赠送  <el-input-number v-model="form.increaseBonus"       size="small"  :controls="false"  @change="handleChange" ></el-input-number>积分
														  </div>
														  <div class="text item">
														   	单次上线（选填） <el-input-number v-model="form.maxIncreaseBonus" size="small" :controls="false" controls-position="right"  @change="handleChange"></el-input-number>积分    （请设置单次增加积分的上限，不填写表示无限制）
														  </div>
														   <div class="text item">
														   	激活送积分（选填） <el-input-number v-model="form.initIncreaseBonus" size="small"  :controls="false"  controls-position="right" @change="handleChange" ></el-input-number>积分    （请设置激活会员卡赠送的积分，不填写表示不赠送）
														  </div>
														   <div class="text item">
														   	积分抵扣    每使用 <el-input-number v-model="form.costBonusUnit" size="small"  :controls="false"  controls-position="right" @change="handleChange" ></el-input-number>积分，抵扣<el-input-number v-model="form.initreduceMoney" controls-position="right" @change="handleChange" size="small" :precision="2" :controls="false"></el-input-number>元
														  </div>
														   <div class="text item">
														   	抵扣条件（选填）   订单满<el-input-number v-model="form.initleastMoneytouseBonus"  size="small" :precision="2" :controls="false" controls-position="right" @change="handleChange" ></el-input-number>元可用，单笔上限<el-input-number v-model="form.maxReduceBonus" size="small"  :controls="false" controls-position="right" @change="handleChange" ></el-input-number>积分
														  </div>
												  </div>
												  <div class="text item" v-if="checked2">
												   	折扣<el-input-number v-model="form.initdiscount"  size="small" :controls="false" :min="1"  :max="10"   controls-position="right" @change="handleChange" ></el-input-number>
												  </div>	  
										 <el-form-item>
										    <el-button type="primary" @click="onSubmit">{{canChange?'修改':'立即创建'}}</el-button>
										    <el-button>取消</el-button>
										  </el-form-item>  
						</el-form>
						
					</el-row>
					
			</el-row>
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
	            ],
	            supplyBonus:[
	            	{ required: true, message: '必填',  trigger: 'change' }
	            ],
	            customCell1Name:[
	            	{ required: true, message: '必填',  trigger: ['blur', 'change'] }
		            ],
	    	    customCell1Tips:[
	            	{ required: true, message: '必填',  trigger: ['blur', 'change'] }
		            ],
	    	    customCell1Url:[
	            	{ required: true, message: '必填',  trigger: ['blur', 'change'] }
		        ],
            },
            checkList:[],
        business_list:[
        	 {
                 "base_info":{
                     "business_name":"深圳百川健康",
                     "address":"麻雀岭工业区M-10栋4楼A06号",
                     "qualification_name":"百川(深圳)健康科技有限公司",
                     "on_show":true,
                     "city":"深圳市",
                     "latitude":22.5545291901,
                     "open_time":"09:00-18:30",
                     "telephone":"075526923137",
                     "qualification_num":"91440300MA5EWYWK32",
                     "photo_list":[
                         {
                             "photo_url":"http://mmbiz.qpic.cn/mmbiz_png/pJZRqsA7oSAOvkql8xLib9JSjvya7IjTEuAPiaBzzdsq6ibPEWu49eiaY8ce7ldyDicNCZ0udA9JvzJ8vhxvB5M9Elw/0?wx_fmt=png"
                         }
                     ],
                     "qualification_list":[

                     ],
                     "province":"广东省",
                     "district":"南山区",
                     "categories":[

                     ],
                     "poi_id":"491846522",
                     "longitude":113.94757843,
                     "status":1
                 }
             }
        ], //门店列表
        hit:true,
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
    	customField1Url:'',
    	color:'',//颜色
    	listText:'',//图文消息内容
    	changeChecked:false,
    	requiredFormCommonFieldIdList:[],//必填相关字段
    	optionalFormCommonFieldIdList:[],//选填相关字段
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
    	canChange:false,
    	addPromotion:false,//自定义营销入口按钮
    	// "customCell1Name":"使用入口2",
	    //"customCell1Tips":"激活后显示",
	    //"customCell1Url":"https://sit.100care.cn/wechat_manage/login",
    	showTextImage:false,
    	 form: {
    		 codeType:'CODE_TYPE_QRCODE',
    		 "getLimit":1,
    		    "useCustomCode":"0",
    		    "canGiveFriend":"0",
    		    'supplyBonus':'0',
    		    "supplyBalance":"0",
    		    "prerogative":"",
                "autoActivate": '0',
                 wxActivate:'1',
                businessService2:[
                	
                ],
                delivery:false,
                text_image_list:[],
                locationIdList:[],
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
             checkedCities:[],
             checkedCities1: [],
             cities: ['积分', '余额', '等级', '折扣','优惠券'],
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
             fileList: [{
                 name: 'food.jpeg',
                 url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
               }, {
                 name: 'food2.jpeg',
                 url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
               }],
               checked:false,
               checked2:false
      
    	
    }},



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
     //门店选中值变化
	  business_name_change:function(e){
		  	delete this.form.locationIdList;
		  	this.checkList=[];
	
	  },
	   customField1UrlChange:function(e){
	    	debugger;
	    },
	   getRequest() {
		  var url = window.location.search; //获取url中"?"符后的字串
		  var theRequest = new Object();
		  if (url.indexOf("?") != -1) {
		    var str = url.substr(1);
		    strs = str.split("&");
		    for(var i = 0; i < strs.length; i ++) {
		       
		      theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
		       
		    }
		  }
		  return theRequest;
		},
	  //适用分门店
	  business_name_change2:function(e){

			delete 	this.form.useAllLocations;
			this.form.locationIdList=this.checkList.join(',');
	  },
	  // 打开快速入口
	  quickly:function(e){
		 if(e){
			 
		 }
	  },
	  //
	  activeChange:function(){
		  if(this.form.wxActivate==1){
			  this.form.autoActivate='0'
		  }else{
			  this.form.autoActivate='1'
		  }
	  },
	  autoChange:function(){
		  if(this.form.autoActivate==1){
			  this.form.wxActivate='0'
		  }else{
			  this.form.wxActivate='1'
		  }
	  },
	  //标准栏位变化
	  supplyChange:function(e){

		  var arr=this.checkedCities1.filter((item)=>{
			  return item=='积分'
		  })
		  if(arr.length>0){
			  this.form.supplyBonus='1'
		  }else{
			  this.form.supplyBonus='0'
		  }
		  
		  var arr2=this.checkedCities1.filter((item)=>{
			  return item=='等级'
		  })
		  
		  if(arr2.length>0){
			  this.form.customField1NameType='FIELD_NAME_TYPE_LEVEL'
		  }else{
			  this.form.customField1NameType=''
		  }
		  
		  
		  
		  var arr3=this.checkedCities1.filter((item)=>{
			  return item=='折扣'
		  })
		  if(arr3.length>0){
			  this.form.customField2NameType='FIELD_NAME_TYPE_DISCOUNT'
		  }else{
			  this.form.customField2NameType=''
		  }
		  
		  
		  var arr4=this.checkedCities1.filter((item)=>{
			  return item=='优惠券'
		  })
		  if(arr4.length>0){
			  this.form.customField3NameType='FIELD_NAME_TYPE_COUPON'
		  }else{
			  this.form.customField3NameType=''
		  }
		  
	  },
	  //时间的选择变化函数
	  timeChoose:function(e){
		  	if(e=='DATE_TYPE_PERMANENT'){
		  		//删除起始日期字段
		  		delete this.form.beginTimestamp;
		  		delete this.form.endTimestamp;
		  	}
		
	  },
	  //自定义 营销入口
	  add:function(){
	
		  	this.addPromotion=true;
	  },
	  
	  delectAdd:function(){
		  this.addPromotion=false;
	  },
	  //固定日期选择变化
	  timeChange:function(){
		  var arr=this.value7
		 if(arr.length==2){
			 this.form.beginTimestamp=arr[0];
			 this.form.endTimestamp=arr[1];
		 }
	  },
	  //点击选择颜色
	  tagClick:function(index){
		 
		  this.backgroundColorList.forEach((item)=>{
			  	item.size='small'
		  })
		  this.backgroundColorList[index].size="medium";
		  this.color=this.backgroundColorList[index].color;
		  this.form.color=this.backgroundColorList[index].name;
	  },
	  elClick:function(){
		  debugger;
	  },
	  handleChange:function(file, fileList) {
	        this.fileList = fileList.slice(-3);
	  },
	  handleCheckedCitiesChange:function(){
		
	  },
	  messChange:function(index,row,e){
			this.$forceUpdate();
			this.$set(this.tableData[index],"checked",row.checked);
			this.getMess()
			
	  },
	  messChange2:function(index,row,e){
		  this.$forceUpdate();
		  this.$set(this.tableData[index],"must",row.must);
		  this.$set(this.tableData[index],"checked",true);
		  this.getMess()
		/*  	this.tableData[index].must=!this.tableData[index].must;*/
//		  	if(this.tableData[index].must){
//		  		this.changeChecked=true
//				this.tableData[index].checked=true
//			}else{
//				this.changeChecked=false
//			}
		  	
		  
	  },
	  
	  //获取相关信息
	  getMess:function(){
		  var mustArr=_.filter(this.tableData,(item)=>{
			   return item.must
		  })
		  var checkedArr=_.filter(this.tableData,(item)=>{
			   return !item.must&&item.checked
		  })
		  var requiredFormCommonFieldIdList=[];
		  var optionalFormCommonFieldIdList=[];
		  
		  _.each(mustArr,(item)=>{
			  requiredFormCommonFieldIdList.push(item.name)
		  })
		  
		    _.each(checkedArr,(item)=>{
		    	optionalFormCommonFieldIdList.push(item.name)
		  })
		  this.requiredFormCommonFieldIdList=requiredFormCommonFieldIdList;
		  this.optionalFormCommonFieldIdList=optionalFormCommonFieldIdList;
	  },
	  goList:function(){
		  var pathName = window.location.pathname.substring(1);  
	     	 var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));  
	     	 var head = window.location.protocol + '//' + window.location.host + '/' + webName + '/';  	 
	     	 window.location.href=head+"resources/wechat/carList.jsp";
	     	 return
	  },
	  onSubmit:function() {
		  var self=this;
		
		  	delete this.form.creationDate;
	      	delete this.form.lastUpdatedDate
		  if(!self.form.logoUrl){
			  self.form.logoUrl="http://mmbiz.qpic.cn/mmbiz/iaL1LJM1mF9aRKPZ/0"
		  }
		  console.log(this.tableData);
		  console.log(this.form)
	/*	  this.form.logoUrl="http://mmbiz.qpic.cn/mmbiz_png/NPVIoBdHWONrbDZjkgmp6aoK29wVVibvyTE9E5DUWELaJcJibvRUic4bEibz4x6eprZrG3WeX5bFG008d1sonTZvuA/0"*/
		  var mustArr=_.filter(this.tableData,(item)=>{
			   return item.must
		  })
		  var checkedArr=_.filter(this.tableData,(item)=>{
			   return !item.must&&item.checked
		  })
		  var requiredFormCommonFieldIdList=[];
		  var optionalFormCommonFieldIdList=[];
		  
		  _.each(mustArr,(item)=>{
			  requiredFormCommonFieldIdList.push(item.type)
		  })
		  
		    _.each(checkedArr,(item)=>{
		    	optionalFormCommonFieldIdList.push(item.type)
		  })
		  
		  if(requiredFormCommonFieldIdList.length>0&&_.isArray(requiredFormCommonFieldIdList)){
			  this.form.requiredForm=requiredFormCommonFieldIdList.join(',')
		  }
		  if(optionalFormCommonFieldIdList.length>0&&_.isArray(optionalFormCommonFieldIdList)){
			  this.form.optionalForm=optionalFormCommonFieldIdList.join(',')
		  }
		  
		  if(this.form.businessService2&&this.form.businessService2.length>0&&_.isArray(this.form.businessService2)){
			  this.form.businessService=this.form.businessService2.join(',')
		  }
		  
		  if(this.form.text_image_list&&this.form.text_image_list.length>0&&_.isArray(this.form.text_image_list)){
			  this.form.text_image_list=JSON.stringify(this.form.text_image_list)
		  }
		  
		  if(this.form.locationIdList&&this.form.locationIdList.length>0&&_.isArray(this.form.locationIdList)){
			  this.form.locationIdList=this.form.locationIdList.join(',')
		  }
		  if(this.form.initdiscount){
			  this.form.discount=(100-parseFloat(this.form.initdiscount)*10)
		  }
		  
		  if(this.form.initcostMoneyUnit){
			  this.form.costMoneyUnit=this.form.initcostMoneyUnit*100
		  }
		  if(this.form.initreduceMoney){
			  this.form.reduceMoney=this.form.initreduceMoney*100
		  }
		  if(this.form.initleastMoneytouseBonus){
			  this.form.leastMoneytouseBonus=this.form.initleastMoneytouseBonus*100
		  }
		  
		  
		  
		
		  this.$refs['form'].validate((valid) => {
	          if (valid) {
	        	  
	        	
	        	  
	          } else {
	        	  self.$message.error("必填信息一定要传哦");
	            return false;
	          }
	        });
	  },
	  goBack:function(){
		  	window.history.go(-1)
	  },
	  creatCard:function(){
		  
	  },
	  uploading:function(res){
		  if(res.resultCode=="1000"){
			  var url=res.result.wechatUrl;
			  	var newUrl=JSON.parse(url);
			  if(url&&newUrl&&newUrl.url){
				  
				  this.$message({
	                  message: '图片上传成功',
	                  type: 'success'
	                });
				  this.form.logoUrl=newUrl.url
			  }else{
				  this.$message.error("上传失败");
			  }
		  }
	  },
	  //图文上传字段
	  uploading2:function(res){
		  if(res.resultCode=="1000"){
			  var url=res.result.wechatUrl;
			  	var newUrl=JSON.parse(url);
			  if(url&&newUrl&&newUrl.url){
				  
				  this.$message({
	                  message: '图片上传成功',
	                  type: 'success'
	                });
				  //newUrl.url
				  this.form.text_image_list.push({
					  image_url:newUrl.url
				  })
			  }else{
				  this.$message.error("上传失败");
			  }
		  }
	  },
	  //删除相关 图文
	  delectText_image:function(index){
		  this.form.text_image_list.splice(index,1);
	  },
	  confirmList:function(){
		  var length=this.form.text_image_list.length;
		  if(length){
			  this.form.text_image_list[length-1].text=this.listText;
		  }
		  this.showTextImage=false;
	  },
	  //点击确定按钮
	  addTextImage:function(){
		
		  this.showTextImage=true;
		  this.listText='';
	  },
	  //getAccessToken
	  upload:function(res){
		
	  },
	  handleInput:function(e){
		  if (this.input10) {
			    this.$nextTick(() => {
			    	 this.input10=e.replace(/[\u4e00-\u9fa5]/ig,'')
			    })
		  }
	  },
	  toChange:function(){
		this.dialogVisible=true  
	  },
	  changePassword:function(){
		  var self=this;
		  	if(!this.oldPassword){
		  		this.$message.error('请先输入旧密码')
		  		return 
		  	}
		  	if(!this.newPassword){
		  		this.$message.error('请先输入新密码')
		  		return
		  	}
		  	if(!this.confirmNewPassword){
		  		this.$message.error('请先输入确认新密码')
		  		return
		  	}
		  	if(this.confirmNewPassword!=this.newPassword){
		  		this.$message.error('新密码与确认密码不一致')
		  		return
		  	}
		  	
	  },
	  handleClose2:function(done) {
		  	this.dialogVisible=false;
//	        this.$confirm('确认关闭？')
//	          .then(_ => {
//	            done();
//	          })
//	          .catch(_ => {});
	   },
//	  inputChange(val){
//		  this.$nextTick(() => {
//			  this.input10=val.replace(/[\u4e00-\u9fa5]/ig,'')
//			  console.log(this.input10)
//		    })
//	  },
	   timestampToTime(timestamp) {
	        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	        Y = date.getFullYear() + '-';
	        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	        D = date.getDate() + ' ';
	        h = date.getHours() + ':';
	        m = date.getMinutes() + ':';
	        s = date.getSeconds();
	        return Y+M+D+h+m+s;
	    },  
	    //里面取消
		innerCancle:function(){
			this.innerVisible=false;
		},
		innerConfirm:function(){
			var newPwd=md5(this.input10)
			this.DelectUrl(this.userId,newPwd)
		},
  
    fileImport:function(e){
    
    },
    
    
    getCardDetail:function(id){
    	var self=this;
    	
    },
 
    getDetail:function(){
    	var  self=this;
    	
    },
    getBusList:function(id){
    	
    },
    //修改内容接口
    institutionEdit:function(param){
      var self=this;
     
     
    },
    //查询机构名字
    searchClinic: function () {
      var self=this;
      this.byNameSearch()
         // to do 调用 查找接口
      console.log('submit!');
    },
    delect:function(index, row){
   	 this.confirmVisible = true;
        this.message = "删除";
        this.confirmVisible = true;
        this.id=row.id;
   },
    findManageRole:function(){
      
    },
    
    
    //通过名字查找函数
    byNameSearch:function(){

    },
    cancle:function(){
    	this.dialogFormVisible = false
    	this.byNameSearch()
    },
   
    //添加认证医师信息
    addClinic: function () {
      this.dialogFormVisible = true;
      this.title = "添加用户";
      this.fileList1=[]
      this.form = {
      
      };
    },
    roleChange:function(value){
    	this.newRoleId=value
    },
    //确定按钮
    addConfirm:function(formName){
      var self=this;
      this.$refs[formName].validate(function(valid) {
        if (valid) {
          //修改资料的话需要调用修改接口
          if( self.title == "修改资料"){
        	  //取相关参数
        	  var params=Object.assign({},self.form)
        	  var param={
        		  id:params.id,
        		  bannerUrl:params.bannerUrl,
        		  linkUrl:params.linkUrl,
        		  appType:params.appType,
        		  pageType:params.pageType,
        		  orderNum:params.orderNum
        	  }
              self.institutionEdit(param)
            return 
          }
          var param=Object.assign({},self.form)
          self.institutionAdd(param)
        } else {
          console.log('error submit!!');
          self.$message.error('请将必填信息填写完整');
          return false;
        }
      });

      // this.dialogFormVisible = false
    },
  
    handleSelectionChange: function (val) {
      this.multipleSelection = val;
    },
    //修改密码操作
    //编辑电子档案
    editEl:function(index,row){
    	this.message = "修改密码";
    	 this.confirmVisible = true;
    	 this.userId=row.userId;
    },
    //启用操作
    enable: function (index, row) {
      this.confirmVisible = true;
      this.message = "启用"
      console.log(index, row)
     
      this.id=row.id
      if(row.status=="1"){
    	  this.status="0"
      }else{
    	  this.status="1"
      }
    },
  
    //停用操作
    disable: function (index, row) {
      this.confirmVisible = true;
      this.message = "停用"
      console.log(index, row)
      this.index=index;
      this.id=row.id;
      if(row.status=="1"){
    	  this.status="0"
      }else{
    	  this.status="1"
      }
    },
  
    //修改操作
    modify: function (index, row) {
      var self=this;
      this.title = "修改资料";
      this.dialogFormVisible = true;
      this.giveUpFilesArr=[];
      if(row.bannerUrl){
    	  self.fileList1=[];
		  self.fileList1.push({url:row.bannerUrl})
	  }
	  if(row.operationImage){
		  self.fileList2=[];
		  self.fileList2.push({url:row.operationImage})
	  }
	  if(row.workCardImage){
		  self.fileList3=[];
		  self.fileList3.push({url:row.workCardImage})
	  }
	  //深度复制
	  this.oldRoleId=row.roleId;
      this.form=Object.assign({}, row);
      console.log(this.form)
    },
    originalUrlRemove:function(file, fileList) {
  	  this.giveUpFilesArr.push(file.url);
      console.log(file, fileList);
    },
    originalUrlPreview:function(file) {
    /*  this.ruleForm.originalUrl = file.url;*/
      this.dialogVisible1 = true;
    },
    //图片成功
    originalUrlSuccess:function(response){
  	
      this.form.bannerUrl=response.imgUrl;
    },
    headUrlExceed:function(files, fileList){
  	  this.$message({
            message: '请先删除之前的照片在上传',
            type: 'warning'
          });
    },
    //跳转到机构科室操作
    ClinicDepartment: function (index, row) {
      //to do 传 参数 跳转
    	window.location.href="/wechat_manage/manage/clinic/clinicOfficePage?clinicId="+row.clinicId
    },
    //跳转到机构环境操作
    ClinicEnvironment: function (index, row) {
      //to do 传 参数 跳转
    	window.location.href="/wechat_manage/manage/clinic/clinicEnvironmentPage?clinicId="+row.clinicId
    },
    //跳转到 机构服务操作
    ClinicService: function (index, row) {
      //to do 传 参数 跳转
     var pathName = window.location.pathname.substring(1);  
   	 var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));  
   	 var head = window.location.protocol + '//' + window.location.host + '/' + webName + '/';  
   	 window.location.href=head+"pagehome/clinicservicelist?id="+row.clinicId;
    },
    //关闭弹框之前操作
    handleClose: function () {
    	debugger;
      this.confirmVisible = false;
    },
    //点击确定
    confirm: function () {
      this.confirmVisible = false;
      //to do
      if(this.message == "删除"){
    	  this.EnableUrl(this.status,this.id)
        // to do  删除接口
      }else if(this.message == "停用"){
        this.DisableUrl(this.status,this.id)
      }else if(this.message == "启用"){
       this.EnableUrl(this.status,this.id)
      }else if(this.message == "修改密码" ){
    	 this.innerVisible=true
      }
    },
    // 删除操作
    handleDelete: function (index, row) {
      this.confirmVisible = true;
      this.message = "删除"
      console.log(index, row);
      this.batchId=row.id;
    },
    handleSizeChange:function (val) {
      console.log('每页 '+val+'条');
      this.pageSize=val;
      this.byNameSearch();
    },
    handleCurrentChange: function (val) {
      console.log('当前页: '+val);
      this.currentPage4=val;
      this.byNameSearch();
    },
    handleRemove: function (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview: function (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //判断form对象是否为空
    isEmpty:function(obj){
    	return _.isEmpty(obj);
    },
    //判断性别显示
    getSex:function(sex){
    	if(sex&&sex=="1"){
    		return "男"
    	}
    	if(sex=="0"){
    		return "女"
    	}
    	return null
    },
    getDate:function(timestamp){
    	
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            Y = date.getFullYear() + '/';
            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
            D = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
            return Y+M+D
    },
    //三级联动
 // 城市三级选择
    handleChange:function(value) {
      this.form.province = this.form.selectedOptions[0];
      this.form.city = this.form.selectedOptions[1]
      this.form.area = this.form.selectedOptions[2]
    },
    querySearchAsync:function(queryString, cb){
    	if(queryString==""){
    		cb([])
    		return 
    	}
    	this.clinicNameSearch(queryString,cb)
    	
    },
   
    //选择
    handleSelect(item) {
        console.log(item);
        this.form.clinicId=item.id
    },
    //...mapActions({
    //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
    //})
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
</style>
