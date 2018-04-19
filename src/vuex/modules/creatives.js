import axios from 'axios'
import vue from 'vue'

export default {
  state: {},
  mutations: {},
  actions: {
    upCreative({ commit }, payload) {
      axios.post('http://localhost:9999/dsp-creative/creative/up', Object.assign({ user: JSON.parse(localStorage.userInfo).user }, { creative: payload.data }))
        .then(res => {
          if (res.data.code === 0) {
            payload.prompt({
              title: '成功',
              message: '添加成功',
              type: 'success'
            })
          }
        })
    }
  }
}