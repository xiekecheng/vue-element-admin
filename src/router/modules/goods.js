/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const goodsRouter = {
    path: '/goods',
    component: Layout,
    // component: () => import('@/views/goods/index'),
    redirect: '/goods/index',
    // alwaysShow: true,
    name: 'Goods',
    meta: {
        title: 'goods',
        icon: 'shopping',
        roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
            path: 'list',
            component: () => import('@/views/goods/goodslist'),
            name: 'goodsList',
            meta: {
                title: 'GoodsList',
                roles: ['admin'] // or you can only set roles in sub nav
            }
        },
        {
            path: 'edit',
            component: () => import('@/views/goods/goodsedit'),
            name: 'GoodsEdit',
            meta: {
                title: 'GoodsEdit',
                // if do not set roles, means: this page does not require permission
                roles: ['admin']
            }
        },
        {
            path: 'add',
            component: () => import('@/views/goods/goodsadd'),
            name: 'GoodsAdd',
            meta: {
                title: 'GoodsAdd',
                // if do not set roles, means: this page does not require permission
                roles: ['admin']
            }
        }
        // {
        //   path: 'role',
        //   component: () => import('@/views/permission/role'),
        //   name: 'RolePermission',
        //   meta: {
        //     title: 'Role Permission',
        //     roles: ['admin']
        //   }
        // }
    ]
}

// E 商品模块路由
export default goodsRouter
