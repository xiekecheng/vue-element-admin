import request from '@/utils/request'

function getGoodsList(params) {
    return request({
        url: '/goods/list',
        method: 'get',
        params
    })
}

function deleteGoodsById(params) {
    return request({
        url: '/goods/id',
        method: 'get',
        params
    })
}

function getCateList(params) {
    return request({
        url: '/cate/list',
        method: 'get',
        params
    })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-element-admin/user/logout',
//     method: 'post'
//   })
// }
export default {
    getGoodsList,
    deleteGoodsById,
    getCateList
}
