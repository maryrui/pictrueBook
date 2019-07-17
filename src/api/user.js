import request from '@/utils/request'

//获取地址列表
export function getAddressList(query){
    return request({
        url: '/api/AddressApi/GetAddressList',
        method: 'get',
        params: query
    })
}

//新增或修改地址
export function setAddress(data){
    return request({
        url:'/api/AddressApi/RenovateAddress',
        method: 'post',
        data
    })
}

//删除单条地址
export function delAddress(query){
    return request({
        url:'/api/AddressApi/DeleteAddress',
        method: 'get',
        params: query
    })
}
//获取单条地址
export function getAddress(query){
    return request({
        url:'/api/AddressApi/GetAddress',
        method: 'get',
        params: query
    })
}

//获取我的页面的头像跟销售收益数据
export function getUserInfo(query){
    return request({
        url:'/api/UserApi/GetMyInfo',
        method: 'get',
        params: query
    })
}

//修改个人资料 /api/UserApi/ModifyMyInfo
export function setUserInfo(data){
    return request({
        url:'/api/UserApi/ModifyMyInfo',
        method: 'post',
        data
    })
}

//分页获取账单  搜索类型：本月 上月 今年 最近一年 （1，2，3，4）
export function getBill(query){
    return request({
        url:'/api/UserApi/GetMyBill',
        method: 'get',
        params: query
    })
}

//用户授权 code请求
export function regUser(query){
    return request({
        url:'/api/LoginApi/GetUserInfo',
        method: 'get',
        params: query
    })
}


//获取推广二维码
export function getGeneralize(query){
    return request({
        url:'/api/UserApi/GetUserQR',
        method: 'get',
        params: query
    })
}

//忘记密码验证信息
export function findPassValidateBank(data){
    return request({
        url:'/api/UserApi/ForgetDrawMoneyPassword',
        method: 'post',
        data
    })
}