import request from '@/utils/request'
// /admin/product/{page}/{limit}   get  获取spu列表  page limit category3Id
export const reqSkuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id }})
