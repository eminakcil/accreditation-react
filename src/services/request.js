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
          reject(result)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const post = (url, data) => request(url, data, 'POST')
export const postJSON = (url, data) => request(url, data, 'POST', 'JSON')
export const deleteRequest = (url, data) => request(url, data, 'DELETE', 'JSON')
export const get = (url) => request(url)
