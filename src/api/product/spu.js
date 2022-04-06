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

// 修改|添加spu 对于修改或者是添加spu携带给服务器的数据大致是相同的，唯一的区别是携带的数据是否有id
export const reqAddOrUpdateSku = (spu) => {
  // 修改spu
  if (spu.id) {
    return request({ url: `/admin/product/updateSpuInfo`, method: 'post', data: spu })
  } else {
    // 添加sku
    return request({ url: `/admin/product/saveSpuInfo`, method: 'post', data: spu })
  }
}

// 删除spu的api  /admin/product/deleteSpu/{spuId}  delete
export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })

// 获取sku图片数据 /admin/product/spuImageList/{spuId} get
export const reqSpuImgList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })

// 获取销售属性的数据 /admin/product/spuSaleAttrList/{spuId} get
export const reqSpuSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })

// 获取平台属性的数据  /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}  get
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })

// 保存sku信息的数据 /admin/product/saveSkuInfo post
export const reqSavaSkuInfo = (skuInfo) => request({ url: `admin/product/saveSkuInfo`, method: 'post', data: skuInfo })

// 获取单个spu的信息，展示sku /admin/product/findBySpuId/{spuId}  get
export const reqSkuList = (spuId) => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })
