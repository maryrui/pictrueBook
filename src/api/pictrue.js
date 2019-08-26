import request from '@/utils/request'

//获取绘本首页内容
export function getPictrue(query){
    return request({
        url: '/api/BookExchangeAPi/GetHomeCategory',
        method: 'get',
        params: query
    })
}

//获取绘本热门专区
export function getHotPictrue(query){
    return request({
        url: '/api/BookExchangeAPi/GetHotBook',
        method: 'get',
        params: query
    })
}


//根据分类获取相关内容
export function getTypePictrue(query){
    return request({
        url: '/api/BookExchangeAPi/GetBookForCategory',
        method: 'get',
        params: query
    })
}
//根据绘本详情
export function getPictrueDetail(query){
    return request({
        url: '/api/BookExchangeAPi/GetBookForId',
        method: 'get',
        params: query
    })
}

//根据年龄段获取列表
export function getAgePictrue(query){
    return request({
        url: '/api/BookExchangeAPi/GetBookForAge',
        method: 'get',
        params: query
    })
}

//下单兑换
export function downSubmit(data){
    return request({
        url: '/api/BookExchangeAPi/ExchangeBook',
        method: 'post',
        data
    })
}