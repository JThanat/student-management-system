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

export const activityOptionList = (resolve) => {
  fetch('/api/activity/all-aid').then(data => data.json()).then(
    (response) => {
      const { data } = response
      let option = []
      for (const d of data) {
        option.push({
          title: d.activity_name,
          val: d.activity_id
        })
      }
      resolve(option)
    }
  )
}

export const competitionTeamOptionList = (resolve) => {
  fetch('/api/competition/team').then(data => data.json()).then(
    (response) => {
      const { data } = response
      let option = []
      for (const d of data) {
        option.push({
          title: d.team_name,
          val: d.team_id
        })
      }
      resolve(option)
    }
  )
}

export const punishmentCriteriaOptionList = (resolve) => {
  fetch('/api/punishment/criteria').then(data => data.json()).then(
    (response) => {
      const { data } = response
      let option = []
      for (const d of data) {
        option.push({
          title: d.punishment_name,
          val: d.punishment_id
        })
      }
      resolve(option)
    }
  )
}
