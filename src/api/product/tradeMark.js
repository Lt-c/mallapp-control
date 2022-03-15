// 主要是品牌管理的请求模块
import request from '@/utils/request'

// 访问品牌页面，获取品牌数据 /admin/product/baseTrademark/{page}/{limit}     get
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

// 新增品牌 /admin/product/baseTrademark/save   post 携带 两个参数 品牌名称、logo， 不需要id，id由系统自动生成

// 修改品牌信息 /admin/product/baseTrademark/update put   携带三个参数 id，品牌名称。logo
export const reqAddOrUpdateTradeMark = (trademark) => {
  // 如果带给服务器id，那么就是修改
  if (trademark.id) {
    return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: trademark })
  } else {
    // 不携带id
    return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: trademark })
  }
}

// 伤处品牌 /admin/product/baseTrademark/remove/{id}   delete 携带一个参数 id
export const reqDeleteTradeMark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })
