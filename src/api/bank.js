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


//提现到零钱
export function getDeposit(query){
    return request ({
        url:"/api/DrawMoneyApi/WxPayToChange",
        method:"get",
        params:query
    })
}

//提现到银行卡
export function getDepositBank(data){
    return request ({
        url:"/api/DrawMoneyApi/WxPayToBank",
        method: 'post',
        data
    })
}

//发送验证码
export function setCodeSms(query){
    return request ({
        url:"/api/SmsApi/SmsCodeSend",
        method:"get",
        params:query
    })
}