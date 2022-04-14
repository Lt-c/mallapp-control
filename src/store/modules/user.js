import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, anyRoutes, constantRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    // 服务器返回的菜单信息，根据不同的角色返回的标记信息，数组中的元素是字符串
    routes: [],
    // 角色信息
    roles: [],
    // 按钮的权限信息
    buttons: [],
    // 对比之后【项目中已有的异步路由，需要与服务器返回的路由表作对比，
    resultRoutes: [],
    // 用户最终展示的路由
    resultAllRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  // 重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 存储用户信息
  SET_USERINFO: (state, userInfo) => {
    state.name = userInfo.name
    state.avatar = userInfo.avatar
    state.routes = userInfo.routes
    state.roles = userInfo.roles
    state.buttons = userInfo.buttons
  },
  // 最终计算出来的异步路由
  SET_RESULTASYNCROUTES(state, asyncRoutes) {
    // 此时只是展示异步路由   但是一个用户完整路由，包含有常量、异步、任意路由
    state.resultAsyncRoutes = asyncRoutes
    // 计算出完整的路由表
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes)
    // 给路由添加新的路由
    console.log(state.resultAllRoutes)
    router.addRoutes(state.resultAllRoutes)
  }
}

export const computedAsyncRoutes = (asyncRoutes, router) => {
  // console.log(router)
  return asyncRoutes.filter((item) => {
    // console.log(item)
    if (router.includes(item.name)) {
      // 使用递归，判断是否有二级、三级。。。路由
      if (item.children && item.children.length) {
        item.children = computedAsyncRoutes(item.children, router)
      }
      return true
    }
  })
}

const actions = {
  // user login处理登陆业务
  async login({ commit }, userInfo) {
    // 解构出用户名和密码
    const { username, password } = userInfo
    const result = await login({ username: username.trim(), password: password })
    // 当前使用的是mock数据，mock数据的code是20000
    if (result.code === 20000) {
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // 返回的信息有name用户名 avatar头像
        // routes 返回的标识，不同的用户应该展示哪些菜单的标记
        // roles 用户角色信息
        // buttons 按钮的信息 按钮权限用的标识
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        commit('SET_USERINFO', data)
        // comiit 最后的路由结果
        commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(asyncRoutes, data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

