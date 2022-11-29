import { setUser } from '@store/authSlice'
import store from '@store/index'
import { UserService } from '.'

function parseData(data) {
  const formData = new FormData()
  for (let [key, value] of Object.entries(data)) {
    formData.append(key, value)
  }
  return formData
}

function request(url, data = false, method = 'GET', type = 'FORM_DATA') {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers: {},
    }

    const fetchData = (inner = false) => {
      let {
        auth: { user },
      } = store.getState()

      if (user) {
        options.headers.Authorization = ['Bearer', user.tokens.accessToken].join(' ')
      }

      if (data) {
        if (type === 'JSON') options.headers['Content-Type'] = 'application/json'
        options.body = type === 'JSON' ? JSON.stringify(data) : parseData(data)
      }

      fetch(import.meta.env.VITE_API_URL + url, options)
        .then(async (response) => {
          const result = await response.json()
          if (response.ok) {
            resolve(result)
          } else {
            if ('message' in result) {
              switch (result.message) {
                case 'not logged in':
                  store.dispatch(setUser(false))
                  break
                case 'jwt expired': {
                  console.log('token yenile')
                  if (!inner) {
                    UserService.refreshToken({
                      refreshToken: user.tokens.refreshToken,
                    })
                      .then((response) => {
                        console.log('cevap', response)
                        store.dispatch(setUser({ ...user, tokens: response, ne: 'tamam' }))
                        fetchData(true)
                      })
                      .catch((error) => {
                        reject(error)
                      })
                  }
                  return
                }

                default:
                  break
              }
            }
            reject(result)
          }
        })
        .catch((error) => {
          reject(error)
        })
    }

    fetchData()
  })
}

export const post = (url, data) => request(url, data, 'POST')
export const postJSON = (url, data) => request(url, data, 'POST', 'JSON')
export const deleteRequest = (url, data) => request(url, data, 'DELETE', 'JSON')
export const get = (url) => request(url)
