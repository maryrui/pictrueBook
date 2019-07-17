import request from '@/utils/request'

//预估收益列表
export function getTeamList(query){
    return request({
        url: '/api/UserApi/GetMyTeamForH5',
        method: 'get',
        params: query
    })
}