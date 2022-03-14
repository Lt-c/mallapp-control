// 主要是品牌管理的请求模块
import request from '@/utils/request'

export function getTradeMarkList() {
  return request({
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'get'
  })
}
