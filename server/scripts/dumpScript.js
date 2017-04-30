const db = require('../utilities/db')
const utils = require('../utilities/utils')
const config = require('../config/config.js')
const constant = require('./dumpConstant')

let connection = null

function createQueryPromise (sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) return reject(err)
      return resolve(result)
    })
  })
}

const SCHEMA = 'Faculties'

db.connect(config.test ? db.MODE_TEST : db.MODE_PRODUCTION, (err) => {
  if (err) {
    console.error(err)
  } else {
    connection = db.getConnection()
    // dumpFacultyTable(db.getConnection())
    // dumpFacultyMemberTable(db.getConnection())
    // dumpPunishmentCriteria(connection)
    // dumpActivities(connection)
    // dumpStudentsActivities(connection)
    // dumpCompetitionTeams(connection)
    // dumpTeamsStudents(connection)
  }
})
// ---------------------------- Faculty  -------------------------
const faculties = constant.faculties
function dumpFacultyTable () {
  Object.keys(faculties).map((key, index) => {
    const sql = `INSERT INTO ${SCHEMA} (faculty_id,faculty_name) VALUES (${key},"${faculties[key]}")`
    console.log(sql)
    createQueryPromise(sql).then((result) => {
      console.log(result)
      return result
    }).catch((err) => {
      console.error(err)
      return err
    })
  })
}

// ---------------------------- Punishment Criteria -------------------------
const punishments = constant.punishment_criteria
function dumpPunishmentCriteria () {
  punishments.map((punishment, index) => {
    const sql = `INSERT INTO punishment_criteria (${constant.punishment_criteria_column.join(',')}) VALUES ("${punishment.name}","${punishment.deduction}","${punishment.description}")`
    createQueryPromise(sql).then((result) => {
      console.log(result)
      return result
    }).catch((err) => {
      console.error(err)
      return err
    })
  })
}

// ---------------------------- Activities -------------------------
const activities = constant.activities
function dumpActivities () {
  activities.map((activity, index) => {
    const sql = `INSERT INTO activities (${constant.activities_column.join(',')}) VALUES 
      ("${activity.activity_name}","${activity.activity_description}",${activity.max_score})`
    createQueryPromise(sql).then((result) => {
      console.log(result)
      return result
    }).catch((err) => {
      console.error(err)
      return err
    })
  })
}

// ------------------------Students Activities -----------------------
function dumpStudentsActivities () {
  for (var i = 0; i < activities.length; i++) {
    for (var j = 0; j < 100; j++) {
      const sql = `INSERT INTO students_activities 
        (activity_id, sid, received_score) VALUES 
        (${i},${Math.floor(Math.random() * 1000)},
        ${Math.floor(Math.random() * activities[i].max_score)})`
      createQueryPromise(sql).then((result) => {
        console.log(result)
        return result
      }).catch((err) => {
        console.error(err)
        return err
      })
    }
  }
}

// ---------------------------- Competition Teams -------------------------
const competition_teams = constant.competition_teams
function dumpCompetitionTeams () {
  competition_teams.map((team, index) => {
    const sql = `INSERT INTO competition_teams (${constant.competition_teams_column.join(',')}) VALUES ("${team.team_name}")`
    createQueryPromise(sql).then((result) => {
      console.log(result)
      return result
    }).catch((err) => {
      console.error(err)
      return err
    })
  })
}

// ----------------------------- Teams Students ----------------------------
function dumpTeamsStudents () {
  for (var i = 0; i < competition_teams.length; i++) {
    for (var j = 0; j < 6; j++) {
      const sql = `INSERT INTO teams_students 
        (team_id, sid) VALUES 
        (${i},${Math.floor(Math.random() * 1000)})`
      createQueryPromise(sql).then((result) => {
        console.log(result)
        return result
      }).catch((err) => {
        console.error(err)
        return err
      })
    }
  }
}

