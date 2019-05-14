import request from '@/utils/request'

//确认下单
export function submitOrder(data){
    return request({
        url: '/api/ProductApi/PlaceAnOrder',
        method: 'post',
        data: data
    })
}

//获取下单列表
export function getOrderList(query){
    return request({
        url: '/api/ProductApi/GetOrderList',
        method: 'get',
        params: query
    })
}

//获取订单详情
export function getOrder(query){
    return request({
        url: '/api/ProductApi/GetOrder',
        method: 'get',
        params: query
    })
}

//换货售后
export function replaceGoods(query){
    return request({
        url: '/api/ProductApi/ReplaceProduct',
        method: 'get',
        params: query
    })
}


//退货售后
export function returnGoods(query){
    return request({
        url: '/api/ProductApi/ReturnProduct',
        method: 'get',
        params: query
    })
}

//修改订单状态 /api/ProductApi/ConfirmOrderState

export function setOrderState(data){
    console.log(data);
    return request({
        url: '/api/ProductApi/ConfirmOrderState',
        method: 'post',
        data: data
    })
}


//订单修改收货地址

export function setOrderAddress(data){
    return request({
        url: '/api/ProductApi/UpdateOrderAddress',
        method: 'post',
        data: data
    })
}


//获取售后列表
export function getAfterList(query){
    return request({
        url:'/api/ProductApi/GetAfterSaleList',
        method: 'get',
        params: query
    })
}


//退货申请 
export function commitReturn(data){
    return request({
        url:'/api/ProductApi/ReturnProduct',
        method: 'post',
        data
    })
}

//换货申请 /api/ProductApi/ReturnProduct
export function commitReplace(data){
    return request({
        url:'/api/ProductApi/ReplaceProduct',
        method: 'post',
        data
    })
}

//上传页面 /api/FileApi/PostFile
export function uploadImg(data){
    return request({
        url:'/api/FileApi/UploadBase64Files',
        method: 'post',
        data
    })
}

//获取售后详情
export function getAfterDetail(query){
    return request({
        url:'/api/ProductApi/GetAfterSaleDetail',
        method: 'get',
        params: query
    })
}


//获取快递公司列表
export function getExpressList(query){
    return request({
        url:'/api/ProductApi/GetExpressCompany',
        method: 'get',
        params: query
    })
}


//添加售后快递信息 
export function setExpress(data){
    return request({
        url:'/api/ProductApi/AddAfterSaleShipment',
        method: 'post',
        data
    })
}

//获取销售明细列表
export function getSaleList(query){
    return request({
        url:'/api/ProductApi/GetSaleList',
        method: 'get',
        params:query
    })
}

//重新支付
export function againPay(query){
    return request({
        url:'/api/ProductApi/RePayment',
        method: 'get',
        params:query
    })
}

//获取物流信息
export function getExpressState(query){
    return request({
        url:'/api/UserApi/GetKdniaoResult',
        method: 'get',
        params:query
    })
}
