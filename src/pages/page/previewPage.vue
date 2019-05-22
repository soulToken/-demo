<template>
  <el-row>
    <el-col :span="12">
      <div id="phone-component" class="iphone" style="transform: scale(1); transform-origin: center top;">
        <div class="phone-head">
          <span class="page-title" title="首页">首页</span>
          <span id="go-back">返回</span>
        </div>
        <div id="phone-container" class="phone-content">
          <iframe class="preview-iframe" id="preview-iframe" frameborder="0" allowtransparency="true" seamless="" src="https://mp.csdn.net"></iframe>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div id="qrcode" ref="qrcode"></div>
    </el-col>
  </el-row>
</template>
<script>
    // import Quill from 'quill'
    import QRCode from 'qrcodejs2'
    export default {
      components: {QRCode},
      data () {
          return {
          }
      },
      methods: {
          qrcodeScan () {//生成二维码
              let qrcode = new QRCode('qrcode', {
                  width: 200,  // 二维码宽度
                  height: 200, // 二维码高度
                  text: 'https://mp.csdn.net'
              })
          },
      },
      mounted() {
          this.qrcodeScan();
      }
    }
</script>

<style scoped>
  #phone-component.iphone {
    width: 402px;
    height: 742px;
    background: url(http://cdn.jisuapp.cn/static/official/images/preview/iphone.png) no-repeat;
    background-size: 100% 100%;
  }
  .phone-head{
    position: absolute;
    top: 81px;
    left: 22px;
    width: 288px;
    height: 58px;
    background: url(http://cdn.jisuapp.cn/zhichi_frontend/static/webapp/images/phone-head.jpg) no-repeat;
    background-size: 100% 100%;
    text-align: center;
  }

  #phone-component.iphone .phone-head {
    top: 14px;
    left: 14px;
    width: 374px;
    height: 46px;
    border-radius: 18px 18px 0 0;
    background-image: url(http://cdn.jisuapp.cn/static/official/images/preview/head-black.png);
  }
  .phone-head #go-back{
    color: #fff;
    cursor: pointer;
    position: absolute;
    left: 10px;
    top: 13px;
    font-size: 14px;
    line-height: 25px;
    padding-left: 14px;
    background-size: auto 15px;
    background: url(http://cdn.jisuapp.cn/static/webapp/images/left.png) no-repeat left center;
  }
  #phone-component.iphone .page-title {
    margin-top: 12px;
    display: inline-block;
    color: #fff;
    font-size: 16px;
  }

  .phone-content {
    position: absolute;
    top: 139px;
    left: 22px;
    width: 288px;
    height: 454px;
    overflow: hidden;
    background-color: #fff;
  }
  #phone-component.iphone .phone-content {
    top: 60px;
    left: 14px;
    width: 374px;
    height: 664px;
    border-radius: 0px 0px 18px 18px;
  }
  .preview-iframe {
    display: block;
    position: relative;
    width: 320px;
    height: 504px;
    transform: scale(0.9);
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    -moz-transform: scale(0.9);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    -moz-transform-origin: 0 0;
    outline: none;
    border: none;
  }
  #phone-component.iphone .preview-iframe {
    width: 320px;
    height: 568px;
    border-radius: 0px 0px 18px 18px;
    transform: scale(1.17);
    -webkit-transform: scale(1.17);
    -ms-transform: scale(1.17);
    -moz-transform: scale(1.17);
  }
  #phone-component .page::-webkit-scrollbar,
  iframe::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  #phone-component .page.dialog-page {
    background-color: rgba(0,0,0,.5);
  }
  .nav-component {
    display: inline-block;
    width: 100%;
    vertical-align: top;
    text-align: left;
  }
  .nav-component .box-title {
    color: #535353;
    font-size: 14px;
    margin-bottom: 15px;
  }
  .nav-component .box-title.title2{
    margin-top: 30px;
    margin-bottom: 15px;
  }
  .app-link-wrap {
    position: relative;
    text-align: left;
    margin-top: 10px;
  }
  .app-link-wrap label {
    display: inline-block;
    width: 40px;
    margin-left: 40px;
  }
  .app-link-wrap input{
    margin-left: 49px;
    width: 159px;
    height: 24px;
    padding: 0 10px 0 5px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #535353;
    font-size: 14px;
    line-height: 24px;
    outline: none;
  }
  .app-link-wrap .copy-link-btn {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 204px;
    width: 45px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #efbf1f;
    color: #efbf1f;
    background: #fff;
    text-align: center;
    cursor: pointer;
  }
  .nav-component .group-page-container {
    max-height: 500px;
    line-height: 32px;
    color: #666;
    background-color: #fff;
    overflow-y: auto;
  }
  .nav-component .group-page-nav .group-nav {
    position: relative;
    cursor: pointer;
    line-height: 40px;
    border-bottom: 1px solid #d6d6d6;
    z-index: 1;
  }
  .nav-component .group-page-nav.active .group-nav {
    box-shadow: 0 0 7px #C7C5C5;
    border-bottom: none;
  }
  .group-page-nav .group-nav::after {
    content: "";
    display: block;
    position: absolute;
    top: 16px;
    left: 12px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 8px solid #666;
    border-right: 0;
    transition: all linear .3s;
  }
  .group-page-nav.active .group-nav::after {
    transform: rotateZ(90deg);
    -webkit-transform: rotateZ(90deg);
    -moz-transform: rotateZ(90deg);
    -ms-transform: rotateZ(90deg);
  }
  .group-page-nav .group-nav .icon-folder {
    margin-left: 32px;
    width: 16px;
    display: inline-block;
    margin-right: 5px;
    height: 16px;
    font-size: 16px;
    vertical-align: middle;
  }
  .group-page-nav .group-nav .group-nav-text {
    vertical-align: middle;
  }
  .nav-component .group-page-nav .page-navs {
    display: none;
    color: #666;
    cursor: pointer;
  }
  .nav-component .group-page-nav.active .page-navs {
    display: block;
  }
  .nav-component .group-page-nav .page-navs .page-nav {
    position: relative;
    padding-left: 15px;
    line-height: 35px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  .nav-component .group-page-nav .page-navs .page-nav:hover {
    background-color: #f7f7f7;
  }
  .nav-component .group-page-nav .page-navs .active{
    color: #efbf1f;
    border: 1px solid #efbf1f;
    outline: 1px solid #efbf1f;
    z-index: 1;
  }
  .nav-component .group-page-nav .page-navs li{
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .nav-component .group-page-nav .page-navs .empty-group-tip {
    background-color: #fff!important;
    color: #666;
    text-align: center;
    text-indent: 0;
    cursor: default;
  }
  #preview-code {
    width: 200px;
    height: 200px;
  }
  .code-container {
    position: relative;
    display: inline-block;
    width: 200px;
    height: 218px;
    margin: 40px 0 10px ;
    border: 1px solid #ccc;
  }
  .cata-phone-tab {
    position: relative;
    display: inline-block;
    width: 100%;
    font-size: 0;
    cursor: pointer;
    border-bottom: 1px solid #c6c6c6;
    z-index: 2;
  }
  .cata-phone-tab::after {
    content: "";
    display: block;
    position: absolute;
    top: 13px;
    left: 50%;
    border-right: 1px solid #e6e6e6;
    height: 24px;
  }
  .cata-phone-tab > div {
    position: relative;
    display: inline-block;
    padding: 15px 0;
    width: 50%;
    color: #666;
    font-size: 14px;
  }
  .cata-phone-tab > div.active {
    color: #efbf1f;
    border-bottom: 1px solid #efbf1f;
    margin-bottom: -1px;
  }
  .cata-phone-tab > div.active::before {
    content: "";
    display: block;
    position: absolute;
    left: 69px;
    bottom: 0px;
    border-style: solid;
    border-width: 7px;
    border-color: transparent;
    border-bottom-color: #efbf1f;
  }
  .phone-model {
    display: none;
  }
  /* .phone-model-list {
      color`lign: center;
  } */
  .phone-model-list li {
    position: relative;
    padding-left: 15px;
    line-height: 35px;
    background-color: #fff;
    border-bottom: 1px solid #c6c6c6;
    overflow: hidden;
    cursor: pointer;
  }
  .phone-model-list li.active {
    color: #efbf1f;
    border: 1px solid #efbf1f;
    outline: 1px solid #efbf1f;
    z-index: 1;
  }
  .phone-model-list li:hover {
    background-color: #f7f7f7;
  }
  #phone-component.phone-6plus {
    width: 332px;
    height: 670px;
    background-image: url(http://cdn.jisuapp.cn/zhichi_frontend/static/webapp/images/phone/6s.png);
  }
  #phone-component.phone-6plus .phone-head {
    top: 81px;
    left: 22px;
    width: 288px;
  }
  #phone-component.phone-6plus .phone-content {
    top: 139px;
    left: 22px;
    width: 288px;
    height: 446px;
  }
  #phone-component.phone-6plus .preview-iframe {
    width: 320px;
    height: 495px;
    transform: scale(0.9);
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    -moz-transform: scale(0.9);
  }
  #phone-component.phone-5s {
    width: 312px;
    height: 648px;
    background-image: url(http://cdn.jisuapp.cn/zhichi_frontend/static/webapp/images/phone/5s.png);
  }
  #phone-component.phone-5s .phone-head {
    top: 93px;
    left: 25px;
    width: 262px;
  }
  #phone-component.phone-5s .phone-content {
    top: 150px;
    left: 26px;
    width: 260px;
    height: 405px;
  }
  #phone-component.phone-5s .preview-iframe {
    width: 320px;
    height: 498px;
    transform: scale(0.8125);
    -webkit-transform: scale(0.8125);
    -ms-transform: scale(0.8125);
    -moz-transform: scale(0.8125);
  }
  #phone-component.phone-note4 {
    width: 340px;
    height: 665px;
    background-image: url(http://cdn.jisuapp.cn/zhichi_frontend/static/webapp/images/phone/note4.png);
  }
</style>
