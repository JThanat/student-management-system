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
      resolve()
    },
    (err) => reject(err)
  )
}

export const removeNull = (obj) => {
  let newObj = {}
  for (let key in obj) {
    if (obj[key]) {
      newObj[key] = obj[key]
    }
  }
  console.log(newObj)
  return newObj
}
