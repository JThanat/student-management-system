import 'whatwg-fetch'

export const requestAndResponse = (url, reqObj, resolve, reject) => {
  fetch(url, reqObj).then((response) => {
    return response.json().then((data) => {
      if (response.status === 200) {
        if (data.success) return data
        return data.err
      } else {
        return Promise.reject(new Error(`Response with ${response.status} (${data.err})`))
      }
    })
  }).then(
    (response) => {
      console.log(response)
      resolve(data)
    },
    (err) => reject(err)
  )
}