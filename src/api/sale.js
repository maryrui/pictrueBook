import request from '@/utils/request'

//预估收益列表
export function getSaleList(query){
    return request({
        url: '/api/UserApi/GetIncomeList',
        method: 'get',
        params: query
    })
}