<template>
<div class="container">
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
    <h3 class="title">百川管家管理程序</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号" :clearable="true"></el-input>
    </el-form-item>
    <div v-if="!codeLogin">
    <el-form-item prop="checkPass"  >
      <el-input type="password" v-model="ruleForm2.checkPass"  @keyup.enter.native="handleSubmit2"  :clearable="true"  :show-password="true"  placeholder="密码"></el-input>
    </el-form-item>
    </div>
    <div v-else>
     <el-form-item prop="code">
      <el-input type="password" v-model="ruleForm2.code"  @keyup.enter.native="handleSubmit2" placeholder="验证码">
            <template slot="append"  >
                <div @click="getCode" v-if="show" class="cursor_pointer">
                    {{text}}
                </div>
                <span v-show="!show" class="count">{{count}} s</span>
            </template>
      </el-input>
    </el-form-item>
    </div>

    <div flex="dir:left main:justify cross:center">
        <el-checkbox  style="opacity:0;" v-model="checked" checked >记住密码</el-checkbox>
        <!-- <span style="color:blue;" @click="changeLogin">{{codeLogin?'密码登录':"验证码登录"}}</span> -->
        <el-button type="text" @click="changeLogin">{{codeLogin?'密码登录':"验证码登录"}}</el-button>
    </div>
 
<el-form-item style="width:100%;margin-top:10px;">
<el-button type="primary" style="width:100%;"  @keyup.native="handleSubmit2"    @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
<!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
</el-form-item>
</el-form>
</div>
</template>

<script>
import { requestLogin,validateCode } from "../api/api";
import { gettest } from "../api/api";
import NProgress from "nprogress";
export default {
  data() {
    return {
      logining: false,
      codeLogin:false,//判断是否是验证码登录
      text:'获取验证码',
      show:true,
      count:'',
      ruleForm2: {
        account: "",
        checkPass: "",
        code:''
      },
      rules2: {
        account: [
          { required: true, message: "请输入账号", trigger: ["blur",'change'] }
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: ["blur",'change'] }
          //{ validator: validaePass2 }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: ["blur",'change'] }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  mounted() {
      console.log(this.$store.state)
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    //切换登录方式
    changeLogin(){
            this.codeLogin=!this.codeLogin;
    },
    getCode(){

        var self=this;
        var _this=this;
    
      





    if(!this.ruleForm2.account||this.ruleForm2.account.length!=11){
         _this.$notify({
                  title: "错误",
                  message: "输入账号有误",
                  type: "error"
                });
        return 
    }



    
     if (!this.timer) {
        var params={
           data:{
                mobile:this.ruleForm2.account
           }
        }
             validateCode(params)
            .then(function(res) {
                var resultCode=res.code;
              if (resultCode !== 200) {
                _this.$notify({
                  title: "错误",
                  message: msg,
                  type: "error"
                });
              } else {
                  debugger;
                    const TIME_COUNT = 60;
                     self.count = TIME_COUNT;
                self.show = false;
                self.timer = setInterval(() => {
                if (self.count > 0 && self.count <= TIME_COUNT) {
                    self.count--;
                    } else {
                    self.show = true;
                    clearInterval(self.timer);
                    self.timer = null;
                    }
                }, 1000)


              }
            })
            .catch(function(error) {
            
              _this.$notify({
                title: "错误",
                message: "网络错误",
                type: "error"
              });
                  //loading动画消失
                _this.logining = false;
            });

      
      }



     

    },
    handleSubmit2(ev) {
       
      var _this = this;

    //   判断跳转路由
    //   var redirect=this.$route.query.redirect
    //   if(redirect){
    //        _this.$router.push({ path:  redirect});
    //   }else{
    //     _this.$router.push({ path: "/table" });
    //   }
      
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          //_this.$router.replace('/table');
          this.logining = true;
          NProgress.start();
          if(_this.codeLogin){
              var data = {
                    mobile: this.ruleForm2.account,
                    verificationCode: this.ruleForm2.code,
                    loginType:_this.codeLogin?2:1
                };
          }else{
                var data = {
                    mobile: this.ruleForm2.account,
                    password: md5(this.ruleForm2.checkPass),
                    loginType:_this.codeLogin?2:1
                };
          }
          

          var params={
              data:data
          }
          requestLogin(params)
            .then(function(res) {
              _this.logining = false;
              NProgress.done();
             
              let resultCode = res.code;
         
              let msg = res.msg;
              let loginInfo = res.data;
              let token =res.token;
              if (resultCode !== 200) {
                _this.$notify({
                  title: "错误",
                  message: msg,
                  type: "error"
                });
                //loading动画消失
                _this.logining = false;
              } else {
                sessionStorage.setItem("loginInfo", JSON.stringify(loginInfo));
                sessionStorage.setItem("token",token)
                if (_this.$route.query.redirect) {
                  _this.$router.push({ path: _this.$route.query.redirect });
                } else {
                  _this.$router.replace({ path: "/" });
                }
              }
            })
            .catch(function(error) {
            
              _this.$notify({
                title: "错误",
                message: "网络错误",
                type: "error"
              });
                  //loading动画消失
                _this.logining = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.card-box {
  padding: 20px;
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin-bottom: 20px;
  background-color: #f9fafc;
  margin: 180px auto;
  width: 400px;
  border: 2px solid #8492a6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.loginform {
  width: 350px;
  padding: 35px 35px 15px 35px;
}
.container{
    width:100%;
    height:100%;
    background:#1F2D3D;
    position: absolute;
    top:0;
    bottom:0;
}
</style>