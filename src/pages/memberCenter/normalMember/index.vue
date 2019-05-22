<template>
	<div>
        <h3>积分规则</h3>
				    		<div class="clearfix" style="background:#fff;padding:30px;">
				    				<div class="fl" style="margin-right:30px;">签到得积分规则规定:</div>
				    				<div class="fl">
				    							 <div class="text item">
												   	首次签到 <el-input-number v-model="firstIntegralIncrease" size="small"  :controls="false" controls-position="right" @change="handleChange" :min="1" ></el-input-number>积分
												  </div>
												  <div class="text item">
												   	每次增加 <el-input-number v-model="everyIntegralIncrease" size="small" :controls="false" controls-position="right" @change="handleChange" :min="1"></el-input-number>积分
												  </div>
												  <div class="text item">
												   	连续签到 <el-input-number v-model="continueIncreaseDays" size="small" :controls="false" controls-position="right" @change="handleChange" :min="1"></el-input-number>天后，下次签到得 <el-input-number v-model="nextIntegralIncrease" :controls="false" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>积分
												  </div>
				    				</div>
                                    <div>
				    			        签到规则说明：可设定连续签到N天后得N积分，中间断开再次签到时则算首次签到积分。如：根据默认规则，第一天签到得1积分，第二天签到的2积分，依次类推，连续到第7天得7积分，第七天后签到得7积分。第四天断开签到，第五天再次签到时，得1积分
				    		        </div>
				    		</div>	
				    			
				    		
				    						   <div>
				    							 <div class="text item"   style="margin-top:10px;">
												   	<h3>积分优惠  <el-switch v-model="scores"  @change="scoreChange">
															</el-switch> </h3>         
												  </div >
												  		<div  v-if="scores" style="background:#fff;padding:30px;">
											  				  <div class="text item">
															   	消费送积分     每消费 <el-input-number v-model="form.initcostMoneyUnit"  size="small" :precision="2" :controls="false" controls-position="right" @change="handleChange"></el-input-number>元，赠送  <el-input-number v-model="form.increaseBonus"       size="small"  :controls="false"  @change="handleChange" ></el-input-number>积分
															  </div>
															  <div class="text item">
															   	单次上限 <el-input-number   v-model="form.maxIncreaseBonus" size="small" :controls="false" controls-position="right"  @change="handleChange"></el-input-number>积分    （请设置单次增加积分的上限，不填写或填写0表示无限制）
															  </div>
															   <div class="text item">
															   	激活送积分 <el-input-number v-model="form.initIncreaseBonus" size="small"  :controls="false"  controls-position="right" @change="handleChange" ></el-input-number>积分    （请设置激活会员卡赠送的积分，不填写或填写0表示不赠送）
															  </div>
															   <div class="text item">
															   	积分抵扣    每使用 <el-input-number v-model="form.costBonusUnit" size="small"  :controls="false"  controls-position="right" @change="handleChange" ></el-input-number>积分，抵扣<el-input-number v-model="form.initreduceMoney" controls-position="right" @change="handleChange" size="small" :precision="2" :controls="false"></el-input-number>元
															  </div>
															   <div class="text item">
															   	抵扣条件   订单满（0.00代表不可用积分抵扣）<el-input-number v-model="form.initleastMoneytouseBonus"  size="small" :precision="2" :controls="false" controls-position="right" @change="handleChange" ></el-input-number>元可用，单笔上限<el-input-number v-model="form.maxReduceBonus" size="small"  :controls="false" controls-position="right" @change="handleChange" ></el-input-number>积分（0代表无上限）
															  </div> 
														  </div>
				    							</div>
							





                            
				    							 <div class="text item">
												   <h3>
                                                        享受折扣<el-switch
													  v-model="zhekou">
													</el-switch>   
                                                    </h3>
                                                    <div  v-if="zhekou" style="background:#fff;padding:30px;">
                                                        <span> 享受折扣<el-input-number v-model="form.initdiscount"  size="small" :controls="false"  :precision="1" :min="1"  :max="10"   controls-position="right" @change="handleChange" ></el-input-number>折 （请填写1-9.9之间的数字，精确到小数点后1位）
												        </span>
                                                    </div>
												   
												  </div>
												  <div class="text item">
												 
												  </div>
												
												  
									

                                        <h3>等级</h3>		  
									
							
 <el-table   :stripe=true ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
                                                <el-table-column prop="gradeName" label="等级名称">
                                                        <template slot-scope="scope">{{ scope.row.gradeName}}</template>
                                                </el-table-column>
                                                <el-table-column  label="积分区间">
                                                        <template slot-scope="scope">{{ scope.row.integralStart}}--{{scope.row.integralEnd}}</template>
                                                </el-table-column>
                                                <el-table-column prop="integralBenefit" label="等级权益">
                                                        <template slot-scope="scope">{{ scope.row.integralBenefit}}</template>
                                                </el-table-column>
                                                <el-table-column label="操作" width="300"  fixed="right">
                                                        <template slot-scope="scope">
                                                                <el-tooltip content="投放" placement="top">
                                                                        <el-button size="mini" icon="el-icon-edit" @click="modify(scope.$index, scope.row)">修改</el-button>
                                                                </el-tooltip>
                                                                
                                                              <!--   <el-tooltip content="详情" placement="top">
                                                                        <el-button size="mini" icon="el-icon-view" @click="lookDetail(scope.$index, scope.row)">详情</el-button>
                                                                </el-tooltip> -->
                                                        </template>
                                                </el-table-column>
                                        </el-table>
				    

	                                    <div style="text-align:center;margin-top:30px;">
									 		<el-button type="primary"  @click="changeMess">保存</el-button>
										</div>















			
				                <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
<el-form ref="form2"  :rules="rules" :model="form2" label-width="80px">
							
						<el-row>
								
									<el-form-item label="等级名称"  prop="gradeName">
									    <el-input v-model="form2.gradeName"></el-input>
									  </el-form-item>
								<!--   <el-form-item label="卡券名称"  prop="title">
								    <el-input v-model="form2.title"></el-input>
								  </el-form-item> -->
								  <el-form-item label="所需积分" prop="">
								  	<el-input-number v-model="form2.integralStart" size="small"  :controls="false" @change="handleChange" ></el-input-number>~~ <el-input-number v-model="form2.integralEnd" size="small"  :controls="false"></el-input-number>
								  		
								  </el-form-item>
								<!--   <el-form-item label="自动升级" prop="color">
								  		<el-switch v-model="form2.delivery"></el-switch>
								  		
								  </el-form-item > -->
								  
								   <el-form-item label="等级权益"  prop="integralBenefit">
												<el-input
										  type="textarea"
										  :rows="2"
										  placeholder="请输入内容"
										  v-model="form2.integralBenefit">
													</el-input>
									</el-form-item>
													
								  </el-row>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
</el-dialog>


				    	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    data(){
        return {
            scores:true,
            zhekou:true,
            form:{},
            form2:{},
            tableData3:[]
        }
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
    ])
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
</style>
