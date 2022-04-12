import request from '@/utils/request'

// 获取user列表
export const reqUserList = (page, limit) => request({ url: `/admin/acl/user/${page}/${limit}`, method: 'get' })
