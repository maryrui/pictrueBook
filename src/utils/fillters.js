export const myTime = {
    /**
     * 格式化时间戳(分:秒)
     * 61 -> 01:01
     */
    format(timestamp) {
        timestamp = Math.floor(timestamp)

        let minute = (Math.floor(timestamp / 60)).toString().padStart(2, '0')
        let second = (timestamp % 60).toString().padStart(2, '0')
        return `${minute}:${second}`
    },

    /*
    *  waitPay 待付款
        alreadyPay 已付款
        waitHarvest 待收货
        alreadyCancel 已取消
        finish 完成
        afterSale 售后中
        payFail 支付失败
    * */

}

export function orderState(state){
    if(state=='waitPay'){
        return '待付款'
    }
    else if(state=='alreadyPay'){
        return '待发货'
    }
    else if(state=='waitHarvest'){
        return '待收货'
    }
    else if(state=='alreadyCancel'){
        return '已取消'
    }
    else if(state=='finish'){
        return '已完成'
    }
    else if(state=='afterSale'){
        return '售后中'
    }
    else if(state=='payFail'){
        return '支付失败'
    }else{
        return '已删除'
    }
}

export function stateTip(state){
    if(state=='waitPay'){
        return '请先去付款'
    }
    else if(state=='alreadyPay'){
        return '请等待商家发货'
    }
    else if(state=='waitHarvest'){
        return '请等待收货'
    }
    else if(state=='alreadyCancel'){
        return '请重新下单'
    }
    else if(state=='finish'){
        return '如有售后请联系客服'
    }
    else if(state=='afterSale'){
        return '请点击售后查看详情'
    }
    else if(state=='payFail'){
        return '如有疑问请联系客服'
    }else{
        return '已删除'
    }
}