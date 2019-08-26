import request from '@/utils/request'

//预估收益列表
export function getSaleList(query){
    return request({
        url: '/api/BookExchangeAPi/GetExpectIntegralList',
        method: 'get',
        params: query
    })
}

//获取可用积分详情
export function getIntegralDetail(query){
    return request({
        url: '/api/BookExchangeAPi/GetIntegralDetailForUserId',
        method: 'get',
        params: query
    })
}