import request from '@/utils/request'

//获取产品详情
export function getProductDetail(query){
    return request({
        url: '/api/ProductApi/GetProductForId',
        method: 'get',
        params: query
    })
}

//