import request from '@/utils/request'



//获取银行卡
export function getBankList(query){
    return request({
        url: '/api/UserApi/GetMyBankCard',
        method: 'get',
        params:query
    })
}

//添加银行卡
export function addBank(data){
    return request({
        url: '/api/UserApi/CreateBankCard',
        method: 'post',
        data
    })
}

//根据卡号获取银行卡信息
export function getBankInfo(query){
    return request ({
        url:"/api/BankCardApi/GetBankCardInfo",
        method:"get",
        params:query
    })
}
