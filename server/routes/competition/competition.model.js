const query = require('../../utilities/query')

const CompetitionColumns = [
  'team_id',
  'competition_name',
  'prize',
  'competition_description'
]

const TABLE_NAME = 'competitions'

const getAllCompetitions = (where) => `SELECT competition_name, competition_description, prize, T12.team_id, T12.team_name, group_concat( member_name SEPARATOR ', ') as advisors FROM (                    
	SELECT competition_name, competition_description, prize, T1.team_id, T5.team_name, T2.member_id FROM competitions as T1
		LEFT JOIN teams_advisors as T2 ON T1.team_id = T2.team_id
		LEFT JOIN competition_teams as T5 ON T1.team_id = T5.team_id) as T12
			LEFT JOIN faculty_members as T3 ON T12.member_id = T3.member_id
${where}
group by competition_name, competition_description, prize, T12.team_id, T12.team_name`

const filterCompetitions = (filterList) => {
  return query.transformToSQL.filter(TABLE_NAME, filterList)
}

const insertCompetition = (dataSet) => {
  return query.transformToSQL.insert(TABLE_NAME, dataSet)
}

const updateCompetition = (dataSet) => {
  let setCondition = []
  for (let key in dataSet) {
    setCondition.push(`${key} = '${dataSet[key]}'`)
  }
  return `UPDATE competitions SET 
    ${setCondition.join(', ')} WHERE team_id=${dataSet.team_id} AND competition_name='${dataSet.competition_name}';`
}

const deleteCompetition = (conditionSet) => {
  return query.transformToSQL.delete(TABLE_NAME, conditionSet)
}

module.exports = {
  CompetitionColumns,
  getAllCompetitions,
  filterCompetitions,
  deleteCompetition,
  insertCompetition,
  updateCompetition
}


