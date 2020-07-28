import axios from 'axios'
import ElementUI from 'element-ui';
import store from './store'
import router from './router'
axios.defaults.baseURL="http://121.43.102.125:8080/vueblog"
// axios.defaults.baseURL="http://localhost:9000"

//前置拦截
axios.interceptors.request.use(config =>{
    return config;
})

//后置拦截
axios.interceptors.response.use(response=>{
    let res=response.data;
    if(res.code===200){
        return response;
    }else {
        ElementUI.Message.error("你的密码可能有问题",{duration:3000});
        return Promise.reject(response.data.msg)
    }
},
    error => {
    if(error.response.data){
        error.message=error.response.data.msg
    }
            if(error.response.status===401){
                store.commit("REMOVE_INFO")
                router.push("/login")
            }else {
                ElementUI.Message.error(error.message,{duration:3000});
                return Promise.reject(error)
            }

        }
    )