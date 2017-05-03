import 'whatwg-fetch'

export const sidOptionList = (resolve) => {
  fetch('/api/student/all-sid').then(data => data.json()).then(
    (response) => {
      const { data } = response
      let option = []
      for (const d of data) {
        option.push({
          title: d.student_id,
          val: d.sid
        })
      }
      resolve(option)
    }
  )
}
