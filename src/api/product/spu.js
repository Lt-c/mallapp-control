import request from '@/utils/request'
// /admin/product/{page}/{limit}   get  获取spu列表  page limit category3Id
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id }})

// /admin/product/getSpuById/{spuId}  get  获取spu的基本信息
export const reqSpuInfo = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })

// /admin/product/baseTrademark/getTrademarkList get 获取品牌的解析
export const reqTradeMarkList = () => request({ url: `/admin/product/baseTrademark/getTrademarkList`, method: 'get' })

//  /admin/product/spuImageList/{spuId}  get   获取spu图片
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })

//  /admin/product/baseSaleAttrList  get  获取平台全部的销售属性 最多三个
export const reqBaseSaleAttrList = () => request({ url: `/admin/product/baseSaleAttrList`, method: 'get' })
