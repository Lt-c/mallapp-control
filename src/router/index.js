import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  // {
  //   path: '/canvas',
  //   component: Layout,
  //   meta: { title: 'Canvasdemo', icon: 'el-icon-collection' },
  //   children: [
  //     {
  //       path: 'demo1',
  //       name: 'Demo1',
  //       component: () => import('@/views/canvas/Demo1.vue'),
  //       meta: { title: 'Canvas' }
  //     },
  //     {
  //       path: 'svg',
  //       name: 'Svg',
  //       component: () => import('@/views/canvas/Demo2.vue'),
  //       meta: { title: 'Svg' }
  //     }
  //   ]
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]
// 异步路由，用于筛选符合条件的管理权限
export const asyncRoutes = [
  // 权限管理模块
  {
    path: '/acl',
    component: Layout,
    redirect: '/acl/user',
    alwaysShow: true, // will always show the root menu
    name: 'Acl',
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/acl/user'),
        name: 'User',
        meta: {
          title: '用户管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },

      {
        path: 'role',
        component: () => import('@/views/acl/role'),
        name: 'Role',
        meta: {
          title: '角色管理',
          roles: ['admin']
        }
      },
      {
        name: 'RoleAuth',
        path: 'role/auth/:id',
        component: () => import('@/views/acl/role/roleAuth'),
        meta: {
          activeMenu: '/acl/role/list',
          title: '角色授权'
        },
        hidden: true
      },
      {
        path: 'permission',
        name: 'Permission',
        component: () => import('@/views/acl/permission'),
        meta: {
          title: '权限管理'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  // 商品管理模块
  {
    path: '/product',
    name: 'Product',
    component: Layout,
    meta: { title: '商品管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'trademark',
        name: 'TradeMark',
        component: () => import('@/views/product/TradeMark'),
        meta: { title: '品牌管理' }
      },
      {
        path: 'attr',
        name: 'Attr',
        component: () => import('@/views/product/Attr'),
        meta: { title: '平台属性管理' }
      },
      {
        path: 'spu',
        name: 'Spu',
        component: () => import('@/views/product/Spu'),
        meta: { title: 'Spu管理' }
      },
      {
        path: 'sku',
        name: 'Sku',
        component: () => import('@/views/product/Sku'),
        meta: { title: 'Sku管理' }
      }
    ]
  },
  // 测试管理
  {
    path: '/test',
    name: 'Test',
    component: Layout,
    meta: { title: '测试管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'test1',
        name: 'Test1',
        component: () => import('@/views/test/test1'),
        meta: { title: '测试管理1' }
      },
      {
        path: 'test2',
        name: 'Test2',
        component: () => import('@/views/test/test2'),
        meta: { title: '测试管理2' }
      }
    ]
  }
]
// 任意路由，当路径出错时，重定向到404
export const anyRoutes = { path: '*', redirect: '/404', hidden: true }

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
