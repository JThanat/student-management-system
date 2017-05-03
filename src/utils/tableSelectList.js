import 'whatwg-fetch'

export const studentOptionList = (resolve) => {
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

export const projectOptionList = (resolve) => {
  fetch('/api/project/all-pid').then(data => data.json()).then(
    (response) => {
      const { data } = response
      let option = []
      for (const d of data) {
        option.push({
          title: d.project_name,
          val: d.project_id
        })
      }
      resolve(option)
    }
  )
}
