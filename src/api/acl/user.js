import request from '@/utils/request'

// 获取user列表
export const getPageList = (page, limit, searchObj) => request({ url: `/admin/acl/user/${page}/${limit}`, method: 'get', params: searchObj })

// 更新或者新增一个后台用户
export const add = (user) => request({ url: `/admin/acl/user/save`, method: 'post', data: user })
export const update = (user) => request({ url: `/admin/acl/user/update`, method: 'put', data: user })

// 获取当前用户的菜单权限列表
export const getMenu = () => request('/admin/acl/index/menu')

// 根据ID获取某个后台用户
export const getById = (Id) => request({ url: `/admin/acl/user/get/${Id}`, method: 'get' })

// 获取某个用户的所有角色
export const getRoles = (userId) => request({ url: `/admin/acl/user/toAssign/${userId}`, method: 'get' })

// 给某个用户分配角色
// roleId的结构: 字符串, 'rId1,rId2,rId3'
export const assignRoles = (userId, roleId) => request({ url: `/admin/acl/user/doAssign`, method: 'post', params: { userId, roleId }})

// 根据id删除用户
export const removeById = (Id) => request({ url: `/admin/acl/user/remove/${Id}`, method: 'delete' })

// 删除多个用户
export const removeUsers = (Ids) => request({ url: `/admin/acl/user/batchRemove`, method: 'delete', data: Ids })
