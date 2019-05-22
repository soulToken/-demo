<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="filters">
				<!-- <el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" @click="handleAdd"> <i class="el-icon-search"></i> 查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;" height="720">
				<el-table-column type="index" width="">
				</el-table-column>
				<el-table-column prop="nickName" label="昵称"  :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column prop="sex" label="性别"  :formatter="formatSex" >
				</el-table-column>
				<el-table-column prop="email" label="邮箱"  :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column prop="birthday" label="生日"  :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column prop="mobile" label="电话"  :show-overflow-tooltip="true">
				</el-table-column>
				<!-- <el-table-column inline-template :context="_self" label="操作" >
					<span>
						<el-button size="small" @click="handleEdit(row)">编辑</el-button>
						<el-button type="danger" size="small" @click="handleDel(row)">删除</el-button>
					</span>
				</el-table-column> -->
			</el-table>
</template>

<!--分页-->
<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
<!-- <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;"> -->
	<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="currentPage4"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
	  style="float:right;">
    </el-pagination>
</el-pagination>
</el-col>

<!--编辑界面-->
<el-dialog :title="editFormTtile" v-model="editFormVisible" :close-on-click-modal="false"  size="tiny">
	<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
		<el-form-item label="姓名" prop="nickName" >
				<el-input v-model="editForm.nickName" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item label="性别">
			<!--<el-select v-model="editForm.sex" placeholder="请选择性别">
						<el-option label="男" :value="1"></el-option>
						<el-option label="女" :value="0"></el-option>
					</el-select>-->
			<el-radio-group v-model="editForm.sex">
				<el-radio class="radio" :label="1">男</el-radio>
				<el-radio class="radio" :label="0">女</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="电话">
			
			<el-input v-model="editForm.mobile" ></el-input>
		
		</el-form-item>
		<el-form-item label="邮箱">
		 	
			<el-input v-model="editForm.email" ></el-input>
			
		</el-form-item>
		<el-form-item label="生日">
			<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birthday"></el-date-picker>
		</el-form-item>
	</el-form>
	<div slot="footer" class="dialog-footer">
		<el-button @click.native="editFormVisible = false">取 消</el-button>
		<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
	</div>
</el-dialog>
</section>
</template>

<script>
import util from "../../common/util";
import NProgress from "nprogress";
import { getUserListPage, removeUser, editUser, addUser ,mock} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        name: ""
      },
      users: [],
      total: 0,
      page: 1,
      hide:false,
      listLoading: false,
      editFormVisible: false, //编辑界面显是否显示
      editFormTtile: "编辑", //编辑界面标题
      currentPage4: 20, //默认20条
      //编辑界面数据
      editForm: {
        nickName: "",
        id: 0,
        email: "",
        mobile: "",
        sex: "",
        birthday: ""
      },
      editLoading: false,
      btnEditText: "提 交",
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      }
    };
  },
  mounted:function(){
    // this.getUsers();
       mock().then(function(res){
           console.log(res.data)
       })
  },
  methods: {
    formatTen(num) { 
      return num > 9 ? (num + "") : ("0" + num); 
    },
    formatDate(date) { 
      if(!date){
        return 
      }
      var year = date.getFullYear(); 
      var month = date.getMonth() + 1; 
      var day = date.getDate(); 
      var hour = date.getHours(); 
      var minute = date.getMinutes(); 
      var second = date.getSeconds(); 
      return year + "-" + this.formatTen(month) + "-" + this.formatTen(day); 
    }, 
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    //页码改变
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },
    //每页显示的数量改变
    handleSizeChange(val) {
      // this.hide=false
      this.currentPage4 = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers(params) {
      var self = this;
      var para = "";
      if (params) {
        para = {
          birthday:this.formatDate(this.editForm.birthday),
          mobile:this.editForm.mobile,
          nickName:this.editForm.nickName,
          email:this.editForm.email ,
          sex:this.editForm.sex
        }
      } else {
        para = {
          email: "",
          mobile: "",
          sex: "",
          nickName: "",
          birthday: "",
          position: this.currentPage4 * (this.page - 1),
          count: this.currentPage4
        };
      }

      this.listLoading = true;
      NProgress.start();
      getUserListPage(para).then(res => {
        if (res.data.resultCode !== "1000") {
          self.$notify({
            title: "错误",
            message: res.data.message,
            type: "error"
          });
          if(res.data.resultCode=="1004"){
            sessionStorage.removeItem("loginInfo")
            self.$router.replace('/login');
          }
          return;
        }
        if(!res.data.result){
          this.total=0;
          this.listLoading = false;
          this.users=[]
          return
        }
        this.total = res.data.result.totalCount;
        this.users = res.data.result.resultList;
        this.listLoading = false;
        NProgress.done();
      });
    },
    //删除
    handleDel: function(row) {
      //console.log(row);
      var _this = this;
      this.$confirm("确认删除该记录吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          _this.listLoading = true;
          NProgress.start();
          let para = { id: row.id };
          removeUser(para).then(res => {
            _this.listLoading = false;
            NProgress.done();
            _this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success"
            });
            _this.getUsers();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(row) {
      this.editFormVisible = true;
      this.editFormTtile = "编辑";
      this.editForm.id = row.id;
      this.editForm.name = row.name;
      this.editForm.sex = row.sex;
      this.editForm.age = row.age;
      this.editForm.birth = row.birth;
      this.editForm.addr = row.addr;
    },
    //编辑 or 新增
    editSubmit: function() {
      var _this = this;
      this.getUsers(1);
      this.editFormVisible = false;
      //   _this.$refs.editForm.validate(valid => {
      //     if (valid) {
      //       _this.$confirm("确认提交吗？", "提示", {}).then(() => {
      //         _this.editLoading = true;
      //         NProgress.start();
      //         _this.btnEditText = "提交中";

      //         if (_this.editForm.id == 0) {
      //           //新增
      //           let para = {
      //             name: _this.editForm.name,
      //             sex: _this.editForm.sex,
      //             age: _this.editForm.age,
      //             birth:
      //               _this.editForm.birth == ""
      //                 ? ""
      //                 : util.formatDate.format(
      //                     new Date(_this.editForm.birth),
      //                     "yyyy-MM-dd"
      //                   ),
      //             addr: _this.editForm.addr
      //           };
      //           addUser(para).then(res => {
      //             _this.editLoading = false;
      //             NProgress.done();
      //             _this.btnEditText = "提 交";
      //             _this.$notify({
      //               title: "成功",
      //               message: "提交成功",
      //               type: "success"
      //             });
      //             _this.editFormVisible = false;
      //             _this.getUsers();
      //           });
      //         } else {
      //           //编辑
      //           let para = {
      //             id: _this.editForm.id,
      //             name: _this.editForm.name,
      //             sex: _this.editForm.sex,
      //             age: _this.editForm.age,
      //             birth:
      //               _this.editForm.birth == ""
      //                 ? ""
      //                 : util.formatDate.format(
      //                     new Date(_this.editForm.birth),
      //                     "yyyy-MM-dd"
      //                   ),
      //             addr: _this.editForm.addr
      //           };
      //           editUser(para).then(res => {
      //             _this.editLoading = false;
      //             NProgress.done();
      //             _this.btnEditText = "提 交";
      //             _this.$notify({
      //               title: "成功",
      //               message: "提交成功",
      //               type: "success"
      //             });
      //             _this.editFormVisible = false;
      //             _this.getUsers();
      //           });
      //         }
      //       });
      //     }
      //   });
    },
    //显示新增界面
    handleAdd: function() {
      var _this = this;
      this.editFormVisible = true;
      this.editFormTtile = "";
      this.editForm.nickName = "";
      this.editForm.sex = 1;
      this.editForm.email = "";
      this.editForm.birthday = "";
      this.editForm.mobile = "";
    }
  },
//   mounted() {
//     this.getUsers();
//   }
};
</script>

<style scoped>

</style>