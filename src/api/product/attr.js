// 平台属性管理模块请求文件
import request from '@/utils/request'

// 获取一级分类数据接口 /admin/product/getCategory1   get
export const reqGetCategory1List = () => request({ url: `/admin/product/getCategory1`, method: 'get' })

// 二级分类接口  /admin/product/getCategory2/{category1Id} get
export const reqGetCategory2List = (category1Id) => request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })

// 三级分类接口  /admin/product/getCategory3/{category2Id} get
export const reqGetCategory3List = (category2Id) => request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get' })

// 根据categoryid 请求数据 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}  get
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
