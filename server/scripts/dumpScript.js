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
    dumpPunishmentCriteria(db.getConnection())
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
// ---------------------------- Faculty Member -------------------------
function dumpFacultyMemberTable () {
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
