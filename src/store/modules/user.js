import {getProductDetail} from '@/api/index'
import {regUser} from '@/api/user'
const user={
    state:{
        goodsId:1001,
        userId:localStorage.getItem('userId'),
        phone:"",
        token:localStorage.getItem('token'),
        goods:null,
        userInfo:{}
    },
    mutations:{
        SET_TOKEN:(state,token)=>{
            state.token=token;
        },
        SET_USERID:(state,userId)=>{
            state.userId=userId;
        },
        SET_GOODS:(state,goods)=>{
            state.goods=goods;
        },
        SET_USERINFO:(state,userInfo)=>{
            state.userInfo=userInfo;
        }
    },
    actions:{
        getDetail({commit,state}){
            return new Promise((resolve,reject)=>{
                getProductDetail({productId:state.goodsId}).then(res=>{
                    commit('SET_GOODS',res.Data)
                    resolve(res)
                }).catch(error=>{
                    reject(error)
                })
            })
        },
        getUserInfo({commit,state}){
            return new Promise((resolve,reject)=>{
                regUser().then(res=>{
                    commit('SET_USERINFO',res.Data);
                    resolve(res)
                }).catch(error=>{
                    reject(error)
                })
            })
        }
    }
}

export default user