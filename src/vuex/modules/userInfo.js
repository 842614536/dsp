import http from '@/utils/http'
import router from '@/router'
import { login } from '@/utils/axios'

export default {
  state: {
    user: '',
    ps: '',
    token: ''
  },
  mutations: {
    updataUserInfo(state, payload) {
      // state = JSON.parse(JSON.stringify(Object.assign({}, state, {
      //   user: payload.userInfo.user,
      //   ps: payload.userInfo.ps,
      //   token: payload.token
      // })))
      state.user = payload.userInfo.user
      state.ps = payload.userInfo.ps
      state.token = payload.token
    }
  },
  actions: {
    login({ commit }, payload) {
      login(payload.userInfo)
        .then(result => {
          if (result.code === 0) {
            commit('updataUserInfo', result)
            localStorage.token = result.token
            localStorage.userInfo = JSON.stringify(result.userInfo)
            router.push('/index/index')
            payload.prompt({
              title: '成功',
              message: `欢迎${payload.userInfo.user}`,
              type: 'success'
            });
          } else {
            payload.error()
            payload.prompt({
              title: '错误',
              message: `用户名或密码输入错误`,
              type: 'error'
            });
          }
        })
    }
  }
}