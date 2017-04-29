const db = require('../utilities/db')
const utils = require('../utilities/utils')
const config = require('../config/config.js')

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
const faculties = {
  '21': 'FACULTY OF ENGINEERING',
  '22': 'FACULTY OF ARTS',
  '23': 'FACULTY OF SCIENCE',
  '24': 'FACULTY OF POLITICAL SCIENCE',
  '25': 'FACULTY OF ARCHITECTURE',
  '26': 'FACULTY OF COMMERCE AND ACCOUNTANCY',
  '27': 'FACULTY OF EDUCATION',
  '28': 'FACULTY OF COMMUNICATION ARTS',
  '29': 'FACULTY OF ECONOMICS',
  '30': 'FACULTY OF MEDICINE',
  '31': 'FACULTY OF VETERINARY SCIENCE',
  '32': 'FACULTY OF DENTISTRY',
  '33': 'FACULTY OF PHARMACEUTICAL SCIENCES',
  '34': 'FACULTY OF LAW',
  '35': 'FACULTY OF FINE AND APPLIED ARTS',
  '36': 'FACULTY OF NURSING',
  '37': 'FACULTY OF ALLIED HEALTH SCIENCES',
  '38': 'FACULTY OF PSYCHOLOGY',
  '39': 'FACULTY OF SPORTS SCIENCE'
}

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

db.connect(config.test ? db.MODE_TEST : db.MODE_PRODUCTION, (err) => {
  if (err) {
    console.error(err)
  } else {
    connection = db.getConnection()
    dumpFacultyTable(db.getConnection())
    dumpFacultyMemberTable(db.getConnection())
  }
})

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
