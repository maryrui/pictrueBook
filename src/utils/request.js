import axios from 'axios'

import store from '@/store'
import {baseUrl} from "./env";
import { Toast } from 'vant';
// import {getToken} from '@/utils/auth'

const service=axios.create({
    baseURL:baseUrl,
})

service.interceptors.request.use(config=>{
    Toast.loading({
        mask: true,
        duration: 0,
        message: '加载中...'
    })

    if(store.getters.token){
        config.headers['Authorization']=sessionStorage.getItem('token')
    }
    return config
},error=>{
        Promise.reject(error)
    }
)

service.interceptors.response.use(
        response=> {
            Toast.clear();
            if(!response.data.Success){
                if(response.data.Msg.code=='1004'){
                    return response.data
                }
                alert(response.data.Msg.message);

            }else if(response.data.Msg.code=='403'){
                alert(response.data.Msg.message);
            }

            return response.data
        },/*{
            const res = response.data;
            /!*if (!res.Success) {
                Message({
                    message: res.Msg.message,
                    duration: 5000,
                    type: "error"
                })
            } else {
                return response.data
            }*!/
        },*/

        error => {
            console.log('err' + error);
            alert( error.message)
            return Promise.reject(error)
        }

)

export default service