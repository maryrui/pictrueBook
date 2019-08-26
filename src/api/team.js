import request from '@/utils/request'

//预估收益列表
export function getTeamList(query){
    return request({
        url: '/api/BookExchangeAPi/GetMyIntegralTeam',
        method: 'get',
        params: query
    })
}