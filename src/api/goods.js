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
function deleteGoodsByIds(params) {
    return request({
        url: '/goods/ids',
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
const addGoods = (data) => {
    return request({
        url: '/addGoods',
        method: 'post',
        data
    })
}
const updateGoods = (data) => {
    return request({
        url: '/updateGoods',
        method: 'post',
        data
    })
}
export default {
    getGoodsList,
    deleteGoodsById,
    getCateList,
    addGoods,
    deleteGoodsByIds,
    updateGoods
}
