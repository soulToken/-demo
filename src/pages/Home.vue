<template>
	<el-row class="panel">
		<el-col :span="24" class="panel-top">
			<el-col :span="20" style="font-size:26px;">


        <!-- <icon name="生活" scale="20" width="50" height="50"></icon> -->
<img src="../assets/index/100care_logo.jpg" @click="goIndex"  class="logo cursor_pointer"> 
<!-- <span>AD<i style="color:#20a0ff">MIN</i>
</span> -->
</el-col>
<el-col :span="4" class="rightbar">
	<el-dropdown trigger="click">
		<span class="el-dropdown-link" style="color:#c0ccda;cursor: pointer;"><img :src="getHeadUrl" class="head"> {{userName}}
</span>
<el-dropdown-menu slot="dropdown">
	<el-dropdown-item  @click.native="logout">退出登录</el-dropdown-item>
</el-dropdown-menu>
</el-dropdown>
</el-col>
</el-col>
<el-col :span="24" class="panel-center">
	<!--<el-col :span="4">-->
	<aside style="width:230px;height:100%;position:relative;">
<!-- :collapse="isCollapse" -->
<el-menu :default-active="currentPath" class="el-menu-vertical-demo"    text-color="#fff"    active-text-color="#ffd04b"    background-color="#324057"   @open="handleopen" @close="handleclose" @select="handleselect"
	theme="dark" unique-opened router>
	<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
		<el-submenu :index="index+''" v-if="!item.leaf"  v-bind:key="index">
			<template slot="title" >
                 <div  flex="dir:left  cross:center">
                 <icon  v-if="item.showIcon" :name="item.iconCls" style="margin-right:7px" scale="20" width="18" height="18"></icon>
                 <i  v-else :class="item.iconCls"></i>
                <span >
                    {{item.name}}
                </span>
                 </div>
            </template>
			<el-menu-item v-for="child in item.children" :index="child.path" v-bind:key="child.path">{{child.name}}</el-menu-item>
		</el-submenu>
		<el-menu-item v-if="item.leaf&&item.children&&item.children.length>0" :index="item.children[0].path" v-bind:key="item.children[0].path">
            <div  flex="dir:left  cross:center">
              <icon  v-if="item.showIcon" :name="item.iconCls" style="margin-right:7px" scale="20" width="18" height="18"></icon>
                 <i  v-else :class="item.iconCls"></i>
            {{item.children[0].name}}
            </div>
        </el-menu-item>
	</template>
</el-menu>


<div class="cursor_pointer" @click="logout" style="z-index:2;width:230px;position:absolute;bottom:15px;padding:20px 0;color:#fff;" flex="dir:left   cross:center"> 

       <icon name="退出"  scale="20" width="30" height="30" style="padding-left:30px;padding-right:10px;"></icon>
       <span  >
           退出登录
       </span>
       
</div>
</aside>
<!--</el-col>-->
<!--<el-col :span="20"    class="panel-c-c">-->
    <!-- :style="{left:width+'px'}" -->
<section class="panel-c-c" >
	<div class="grid-content bg-purple-light" style="height:100%;">
		<!-- <el-col :span="24" style="margin-bottom:15px;">
               <i style="float:left;" class="el-icon-d-arrow-left"  v-if="!isCollapse"  @click="isCollapse=!isCollapse">收缩</i>
                <i style="float:left;" class="el-icon-d-arrow-right" @click="isCollapse=!isCollapse" v-else>展开</i> 
                <strong style="width:200px;float:left;color: #475669;margin-left:20px;">{{currentPathName}}</strong>
                <el-breadcrumb separator="/" style="float:right;">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-if="currentPathNameParent">{{currentPathNameParent}}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="currentPathName">{{currentPathName}}</el-breadcrumb-item>
                </el-breadcrumb> 
        </el-col> -->
<el-col  class="hw100" :span="24" style="background-color:#fff;box-sizing: border-box;background:#f1f2f7;">
 <transition >
<router-view></router-view>
</transition>
</el-col>
</div>
</section>
<!--</el-col>-->
</el-col>
</el-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      currentPath: "首页",
      currentPathName: "",
      currentPathNameParent: "",
      headUrl:require("../assets/user.png"),
      userName: "",
      width: 62,
      isCollapse: true,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  created() {
   
   //展开
    this.currentPath = '/'+this.$route.path.split('/')[1];

    let user = sessionStorage.getItem("loginInfo");
    if (user) {
      this.userName = JSON.parse(user).userName;
    }
  },
  	computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'getHeadUrl'
      // ...
    ])
  },
  mounted () {
    
  },
  watch: {
    $route(to, from) {
      //监听路由改变

      this.currentPath = to.path;
      this.currentPathName = to.name;
      this.currentPathNameParent = to.matched[0].name;
    },
    isCollapse(old, news) {
      if (old) {
        this.width = 62;
      } else {
        this.width = 230;
      }
    }
  },
  methods: {
    goIndex(){
            this.$router.push('/')
    },
    onSubmit() {
      console.log("submit!");
    },
    handleopen() {
      //console.log('handleopen');
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function(a, b) {},
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {

            window.sessionStorage.removeItem("loginInfo")
            window.sessionStorage.removeItem("token")
          _this.$router.replace("/login");
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.panel {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}

.panel-top {
  height: 60px;
  line-height: 60px;
  background: #1f2d3d;
  color: #c0ccda;
}

.panel-top .rightbar {
  text-align: right;
  padding-right: 35px;
}

.panel-top .rightbar .head {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0px 10px 10px;
  float: right;
}

.panel-center {
  background: #324057;
  position: absolute;
  top: 60px;
  bottom: 0px;
  overflow: hidden;
}

.panel-c-c {
  background: #f1f2f7;
  position: absolute;
  right: 0px;
  top: 0px;
  bottom: 0px;
  left: 230px;
  overflow-y: scroll;
  padding: 20px;
}

.logout {
  background: url(../assets/logout_36.png);
  background-size: contain;
  width: 20px;
  height: 20px;
  float: left;
}

.logo {
  width: 100px;
  float: left;
  margin: 10px 10px 10px 18px;
}

.tip-logout {
  float: right;
  margin-right: 20px;
  padding-top: 5px;
}

.tip-logout i {
  cursor: pointer;
}

.admin {
  color: #c0ccda;
  text-align: center;
}
</style>