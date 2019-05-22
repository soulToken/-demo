import axios from 'axios';
import router from '../router/index'
// 这边是所有的请求接口的配置文件，不同环境修改 这个 base 就好了， 包括正式环境 也是修改 这里面（在这里测试一下 登录接口， 我随便用了之前项目的一个接口）  下面的都是 promise 语法，在其他组件里面调用就行了
// let base='http://clinic.100care.cn'
// let base="http://sit.100care.cn:80"
let base="/apis"
axios.interceptors.request.use(
    config => {
        // if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        //     config.headers.Authorization = `token ${store.state.token}`;
        // }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 405:
                    // 返回 401 清除token信息并跳转到登录页面
                    // store.commit(types.LOGOUT);
                    // debugger;
                    // router.replace({
                    //     path: '/login',
                    //     query: {redirect: router.currentRoute.fullPath}
                    // })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });

// var token=  sessionStorage.getItem("token")||''
// debugger;
//登录接口
export const requestLogin = params => { return axios.post(`${base}/login/auth`, params).then(res => res.data); };
//获取验证码
export const validateCode = params => { return axios.post(`${base}/validateCode/get`,  params).then(res => res.data); };
//主页接口
export const headpage = params => { return axios.post(`${base}/headpage/statistics`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
//判断是否授权
export const isOrNotAuthorization = params => { return axios.post(`${base}/wechatAuth/isOrNotAuthorization`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
//去授权 
export const getComponentLoginPage = params => { return axios.post(`${base}/wechatAuth/getComponentLoginPage`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
//授权之后传给后台 /wechatAuth/callBack
export const wechatAuth = params => { return axios.post(`${base}/wechatAuth/callBack`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
//获取服务分类 /clinic/serviceclassify/list
export const clinicList = params => { return axios.post(`${base}/clinic/serviceclassify/list`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
//新增服务分类  /clinic/serviceclassify/add
export const clinicAdd = params => { return axios.post(`${base}/clinic/serviceclassify/add`,  params).then(res => res.data); };
//修改服务分类   /clinic/serviceclassify/update
export const clinicUpdate = params => { return axios.post(`${base}/clinic/serviceclassify/update`,  params).then(res => res.data); };
// 删除服务分类   /clinic/serviceclassify/delete
export const clinicDelete = params => { return axios.post(`${base}/clinic/serviceclassify/delete`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
//服务项目列表  /clinic/serviceItem/list
export const serviceItemList = params => { return axios.post(`${base}/clinic/serviceItem/list`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
// 服务项目新增   /clinic/serviceItem/add
export const serviceItemAdd = params => { return axios.post(`${base}/clinic/serviceItem/add`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
//服务项目修改 /clinic/serviceItem/update
export const serviceItemUpdate = params => { return axios.post(`${base}/clinic/serviceItem/update`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
//删除  /clinic/serviceItem/delete
export const serviceItemDelete = params => { return axios.post(`${base}/clinic/serviceItem/delete`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
//详情  /clinic/serviceItem/detail
export const serviceItemDetail = params => { return axios.post(`${base}/clinic/serviceItem/detail`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
export const newUpload = params => { return axios.post(`${base}/common/fileUpload`,params); };
export const loadUrl=`${base}/common/fileUpload`;
//横幅列表/clinic/banner/list
export const swiperList = params => { return axios.post(`${base}/clinic/banner/list`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
//横幅新增 /clinic/banner/add
export const swiperAdd = params => { return axios.post(`${base}/clinic/banner/add`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
//修改   /clinic/banner/update
export const swiperUpdate = params => { return axios.post(`${base}/clinic/banner/update`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
//删除  /clinic/banner/delete
export const swiperDelete = params => { return axios.post(`${base}/clinic/banner/delete`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
//发布模板   /wechatTemplete/clinicTempleteReal/use
export const clinicTempleteReal = params => { return axios.post(`${base}/wechatTemplete/clinicTempleteReal/use`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
//查询模板列表   /wechatTemplete/clinicTemplete/list
export const clinicTempleteList = params => { return axios.post(`${base}/wechatTemplete/clinicTemplete/list`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
//同事模块  同事列表  /clinic/doctor/list
export const doctorList = params => { return axios.post(`${base}/clinic/doctor/list`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
//新增同事   /clinic/doctor/add
export const doctorAdd = params => { return axios.post(`${base}/clinic/doctor/add`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };
//删除同事 /clinic/doctor/delete
export const doctorDelete = params => { return axios.post(`${base}/clinic/doctor/delete`, sessionStorage.getItem("token")?Object.assign({token:sessionStorage.getItem("token")},params) : params).then(res => res.data); };



export const getUserList = params => { return axios.post(`${base}/moxIntlBlackGround/customer/getList`, token?Object.assign({token:token},params) : params); };

//用户列表
export const getUserListPage = params => { return axios.post(`${base}/moxIntlBlackGround/customer/getList`, token?Object.assign({token:token},params) : params); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: token?Object.assign({token:token},params) : params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: token?Object.assign({token:token},params) : params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: token?Object.assign({token:token},params) : params }); };

//测试mock接口    axios.get('msg').then(res=>{

       

export const mock = params => { return axios.get(`${base}/msg`, { params: token?Object.assign({token:token},params) : params }); };


//登陆接口
export const gettest = params => { return axios.post(`${base}/moxIntlBlackGround/manager/checkLogin`, token?Object.assign({token:token},params) : params); };

//穴位列表
export const getAcupointList = params => { return axios.post(`${base}/moxIntlBlackGround/acupoint/getList`, token?Object.assign({token:token},params) : params); };

//穴位编辑

export const acupointEditor = params => { return axios.post(`${base}/moxIntlBlackGround/acupoint/edit`, token?Object.assign({token:token},params) : params); };

//穴位新增

export const acupointAdd = params => { return axios.post(`${base}/moxIntlBlackGround/acupoint/add`, token?Object.assign({token:token},params) : params); };

//删除穴位

export const acupointDelete = params => { return axios.post(`${base}/moxIntlBlackGround/acupoint/delete`, token?Object.assign({token:token},params) : params); };

//症状列表

export const symptomList = params => { return axios.post(`${base}/moxIntlBlackGround/symptom/getList`, token?Object.assign({token:token},params) : params); };

//症状编辑

export const symptomEditor = params => { return axios.post(`${base}/moxIntlBlackGround/symptom/edit`, token?Object.assign({token:token},params) : params); };

//症状新增

export const symptomAdd = params => { return axios.post(`${base}/moxIntlBlackGround/symptom/add`, token?Object.assign({token:token},params) : params); };

//症状删除

export const symptomDelet = params => { return axios.post(`${base}/moxIntlBlackGround/symptom/delete`, token?Object.assign({token:token},params) : params); };

//上传图片地址

export const upLoadUrl = `${base}/common/uploadPic`;

export const newUpload2 = params => { return axios.post(`${base}/wechat_manage/homepage/clinic/uploadimage`,params); };