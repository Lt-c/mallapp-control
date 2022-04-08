import request from '@/utils/request'

// 获取sku列表接口 /admin/product/list/{page}/{limit} get
export const reqSkuList = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' })

// sku产品的上下架处理 GET /admin/product/onSale/{skuId}  /admin/product/cancelSale/{skuId}  get
export const reqSale = (skuId) => request({ url: `/admin/product/onSale/${skuId}`, method: 'get' })
export const reqCancelSale = (skuId) => request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' })

// 获取sku详情 /admin/product/getSkuById/{skuId}
export const reqSkuInfo = (skuId) => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' })
