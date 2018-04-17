let absolute = '';

if (process.env.NODE_ENV === 'development') {
  absolute = 'http://localhost:9999'
} else if (process.env === 'production') {
  absolute = 'http://www.lb717.com'
}

const $http = {
  get(url, params) {
    let type = Object.prototype.toString.call(params).slice(8, -1)
    if (type === 'Object') {
      let queryString = '?';
      for (let key in params) {
        queryString += key + '=' + params[key] + '&'
      }
      url = encodeURI(url + queryString.slice(0, -1))
      return fetch(absolute + url, {
        headers: {
          "content-type": "application/json;chaset=utf-8"
        }
      }).then(res => res.json())
    } else {
      return {
        then(callback) {
          callback(new Error('入参格式不正确'))
          return {
            catch(err) {
              err(new Error('我就是为了不让程序终止运行'))
            }
          }
        }
      }
    }
  },
  post(url, params) {
    let type = Object.prototype.toString.call(params).slice(8, -1)
    if (type === 'Object') {
      console.log(params)
      return fetch(absolute + url, {
        body: JSON.stringify(params),
        headers: {
          "content-type": "application/json;chaset=utf-8",
        },
        method: "POST"
      }).then(res => res.json())
    } else {
      return {
        then(callback) {
          callback(new Error('入参格式不正确'))
          return {
            catch(err) {
              err(new Error('我就是为了不然程序终止运行'))
            }
          }
        }
      }
    }
  }
}

export default $http
