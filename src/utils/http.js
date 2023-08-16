import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import axios from 'axios'
import {useUserStore} from '@/stores/user'
import router from "@/router";
const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})
export default httpInstance
httpInstance.interceptors.request.use(config => {
    // 1.从pinia获取token数据
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    // 2.按照后端的要求拼接token数据
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))
httpInstance.interceptors.response.use(res => res.data, e =>{
    // console.log(e);
    ElMessage({type:'warning',
    message:e.response.data.message
})
if(e.response.status === 401){
    const userStore = useUserStore()  
    userStore.clearUserInfo()
    // 注意这里使用的router是来自@/router
    router.push('/login')
}
    Promise.reject(e)
})