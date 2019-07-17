import {getProductDetail} from '@/api/index'
import {getUserInfo} from '@/api/user'
const user={
    state:{
        goodsId:1001,
        token:sessionStorage.getItem('token'),
        userId:sessionStorage.getItem('userId'),
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
        GetUserInfo({commit,state}){
            return new Promise((resolve,reject)=>{
                getUserInfo({userId:state.userId}).then(res=>{
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