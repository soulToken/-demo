<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="filters">
				
				<el-form-item>
					<el-button type="primary" @click="handleAdd"> <i class="el-icon-plus"></i> 新增</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="handleSearch"> <i class="el-icon-search"></i> 查询</el-button>
				</el-form-item>
					<el-button type="danger" v-on:click="handleDeleteAll" style="float:right;" icon="delete">批量删除</el-button>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;" height="720"  @selection-change="handleSelectionChange" 	ref="multipleTable">
				<el-table-column
					type="selection"
				>
				</el-table-column>
				<el-table-column type="index" width="">
				</el-table-column>
				<el-table-column prop="id" label="ID"  sortable>
				</el-table-column>
				<el-table-column prop="acupointName" label="穴位名称" :show-overflow-tooltip="true" >
				</el-table-column>
				<el-table-column prop="findAcupointPic" label="图片"  >
									<template scope="scope">
                     <img :src="scope.row.findAcupointPic"  v-if="scope.row.findAcupointPic" width="80" height="80">
                 	</template>
				</el-table-column>
				<el-table-column prop="findAcupointTxt" label="解释说明" :show-overflow-tooltip="true"  >
				</el-table-column>
				<el-table-column prop="findAcupointVideo" label="视频地址"  :show-overflow-tooltip="true">
				</el-table-column>
			
				<el-table-column inline-template :context="_self" label="操作" >
					<span>
						<el-button size="small" @click="handleEdit(row)" icon="edit">编辑</el-button>
						<el-button type="danger" size="small" @click="handleDel(row)" icon="delete">删除</el-button>
					</span>
				</el-table-column>
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
	<el-form :model="editForm" label-width="80px" ref="editForm">
		<!-- <el-form-item label="ID" prop="id" >
		
				<el-input v-model="editForm.id"></el-input>
			
		</el-form-item> -->
	
		<el-form-item label="穴位名称" >
			
			<el-input v-model="editForm.acupointName" ></el-input>
		
		</el-form-item>

		<el-form-item label="图片" prop="findAcupointPic">
		 	
			<img :src="editForm.findAcupointPic"  v-if="editForm.findAcupointPic" width="100" height="100" @click="handleRemove">

				<el-upload
						class="upload-demo"
						:action="upLoadUrl"
						:on-preview="handlePreview"
						:on-remove="handleRemove"
						:on-success="handleSuccess"
						:file-list="fileList"
            :show-file-list="picShow"
            >
						<el-button size="small" type="primary"> <i class="el-icon-upload"></i> 点击上传</el-button>
				</el-upload>
		</el-form-item>
		<!-- <el-form-item label="图片" prop="findAcupointPic">
		 	
		<el-upload
							class="upload-demo"
							action="https://jsonplaceholder.typicode.com/posts/"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:file-list="editForm.findAcupointPic"
							list-type="picture">
							<el-button size="small" type="primary">点击上传</el-button>
		</el-upload>
			
		</el-form-item> -->
		<el-form-item label="视频地址" prop="findAcupointVideo">
		 	
			<el-input v-model="editForm.findAcupointVideo" ></el-input>
			
		</el-form-item>
		<el-form-item label="穴位说明">
		<el-input
					type="textarea"
					:autosize="{ minRows: 4, maxRows: 8}"
					placeholder="请输入内容"
					v-model="editForm.findAcupointTxt">
				</el-input>
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
import {
  getAcupointList,
  acupointEditor,
  acupointAdd,
  acupointDelete,
  upLoadUrl
} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        name: ""
      },
      upLoadUrl:upLoadUrl,
      picShow:true,//上传图片是否应该提示
      fileList: [],
      users: [],
      total: 0,
      page: 1,
      multipleSelection: [], //选择的条数
      hide: false,
      listLoading: false,
      editFormVisible: false, //编辑界面显是否显示
      editFormTtile: "编辑", //编辑界面标题
      currentPage4: 20, //默认20条
      //编辑界面数据
      editForm: {
        acupointName: "",
        id: "",
        acupointName: "",
        findAcupointTxt: "",
        findAcupointPic: "",
        findAcupointVideo: ""
      },
      editLoading: false,
      btnEditText: "提 交",
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      }
    };
  },
  methods: {
    //图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.editForm.findAcupointPic=""
    },
    handlePreview(file) {
      console.log(file);
    },
    //图片上传成功
    handleSuccess(response) {
      this.editForm.findAcupointPic = response;
      this.picShow=false;
    },
    handleSelectionChange(val) {
      var _this = this;
      this.multipleSelection = val;
    },
    formatTen(num) {
      return num > 9 ? num + "" : "0" + num;
    },
    formatDate(date) {
      if (!date) {
        return;
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
      para = {
        acupointName: this.editForm.acupointName,
        findAcupointTxt: this.editForm.findAcupointTxt,
        findAcupointVideo: this.editForm.findAcupointVideo,
        findAcupointTxt: this.editForm.findAcupointTxt,
        position: this.currentPage4 * (this.page - 1),
        count: this.currentPage4
      };

      this.listLoading = true;
      NProgress.start();
      getAcupointList(para).then(res => {
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
        if (!res.data.result) {
          this.total = 0;
          this.listLoading = false;
          this.users = [];
          return;
        }
        this.total = res.data.result.totalCount;
        this.users = res.data.result.resultList;
        this.listLoading = false;
        NProgress.done();
      });
    },
    //批量删除
    handleDeleteAll() {
      var _this = this;
      if (this.multipleSelection.length == 0) {
        this.$notify({
          title: "错误",
          message: "请选择要删除的内容",
          type: "error"
        });
        return;
      }
      this.$confirm("确认删除选中记录吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          _this.willDelet();
          _this.listLoading = true;
          NProgress.start();
        })
        .catch(() => {});
    },
    //删除
    handleDel: function(row) {
      var _this = this;
      this.multipleSelection = [row];
      this.$confirm("确认删除该记录吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          _this.willDelet();
          _this.listLoading = true;
          NProgress.start();
        })
        .catch(() => {});
    },
    willDelet() {
      var _this = this;
      var arr = [];

      this.multipleSelection.forEach(element => {
        arr.push(element.id);
      });
      var para = {
        ids: arr
      };
      acupointDelete(para).then(res => {
        _this.listLoading = false;
				NProgress.done();
				if(res.data.resultCode!="1000"){
						 _this.$notify({
								title: "错误",
								message: res.data.message,
								type: "error"
							});
					return 
				}
        _this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success"
        });
        _this.getUsers();
      });
    },
    //显示编辑界面
    handleEdit: function(row) {
      this.editFormVisible = true;
      this.editFormTtile = "编辑";
      this.editForm.id = row.id;
      this.editForm.acupointName = row.acupointName;
      this.editForm.findAcupointTxt = row.findAcupointTxt;
      this.editForm.findAcupointPic = row.findAcupointPic;
      this.editForm.findAcupointVideo = row.findAcupointVideo;
    },
    //编辑 or 新增
    editSubmit: function() {
      var _this = this;
      if (this.editFormTtile == "新增") {
        this.add();
      } else if (this.editFormTtile == "编辑") {

        this.editor();
      } else {
        this.page = 1;
        this.getUsers();
      }
      // this.getUsers(1);
      this.editFormVisible = false;
    },
    //显示新增界面
    handleAdd: function() {
      var _this = this;
      this.editFormVisible = true;
      this.editFormTtile = "新增";
      (this.editForm.acupointName = ""), (this.editForm.findAcupointTxt = "");
      this.editForm.findAcupointPic = "";
      this.editForm.findAcupointVideo = "";
    },
    //穴位编辑
    editor() {
      var para = this.editForm;
      acupointEditor(para).then(res => {
        if (res.data.resultCode !== "1000") {
          self.$notify({
            title: "错误",
            message: res.data.message,
            type: "error"
          });
          return;
				}
				 this.editForm.acupointName="",
      	 this.editForm.findAcupointTxt="",
         this.editForm.findAcupointVideo="",
         this.editForm.findAcupointTxt="",
        this.getUsers();
        this.listLoading = false;
        NProgress.done();
      });
    },
    //穴位新增
    add() {
      var self = this;
      let para = {
        acupointName: this.editForm.acupointName,
        findAcupointTxt: this.editForm.findAcupointTxt,
        findAcupointPic: this.editForm.findAcupointPic,
        findAcupointVideo: this.editForm.findAcupointVideo
      };
      acupointAdd(para).then(res => {
        if (res.data.resultCode !== "1000") {
          self.$notify({
            title: "错误",
            message: res.data.message,
            type: "error"
          });
          return;
        }
        this.getUsers();
        this.listLoading = false;
        NProgress.done();
      });
    },
    //查询
    handleSearch() {
      this.editFormVisible = true;
      this.editFormTtile = "查询";
      this.editForm.acupointName = "",
      this.editForm.findAcupointTxt = "",
      this.editForm.findAcupointPic = "",
      this.editForm.findAcupointVideo = "";
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style scoped>

</style>