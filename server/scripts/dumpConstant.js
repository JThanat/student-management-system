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

const punishment_criteria = [
  {
    name: 'Does not maintain Unity',
    deduction: '10',
    description: 'Students does not maintain the unity, order, and reputation of the university',
  },
  {
    name: 'Does not act in compliance with morals',
    deduction: '5',
    description: 'Students does not act in compliance with the accepted morals, manner, and culture of Thai society on every occasion.',
  },
  {
    name: 'Does not behave in an appropriate manner',
    deduction: '12',
    description: `Students does not behave in an appropriate manner and must not constitute any disgrace to oneself, one’s parents, or one’s university.`,
  },
  {
    name: 'Does not act in accordance with all the laws',
    deduction: '20',
    description: 'Students does not act in accordance with all the laws, principles, rules, announcements, or orders of the university or the faculty. ',
  },
  {
    name: 'Does not obey the order or advice',
    deduction: '5',
    description: 'Students does not obey the order or advice of the instructors or officers of the university who conduct their duty in an appropriate manner',
  }
]

const punishment_criteria_column = [
  'punishment_name',
  'score_deduction',
  'punishment_description'
]

const activities = [
  {
    activity_name: 'CU 100',
    activity_description: 'The celebrations to commemorate 100 years of CU pride.',
    max_score: 10
  },
  {
    activity_name: 'Larngear Camp #16',
    activity_description: 'A Camp for high school student to explore faculty of engineering.',
    max_score: 20
  },
  {
    activity_name: 'Fe Camp #16',
    activity_description: 'PAT3 tutorial camp for Mathayom 6 students.',
    max_score: 20
  },
  {
    activity_name: 'Chula Expo 2017',
    activity_description: 'An exhibition opened for outsiders to explore chula students innovation.',
    max_score: 20
  }
]

const activities_column = [
  'activity_name',
  'activity_description',
  'max_score'
]

const competition_teams = [
  { team_name: 'CPCUCPU' },
  { team_name: 'Thinc. Warrior' },
  { team_name: 'Good food is not bad food' },
  { team_name: 'PyMonster' },
  { team_name: 'MaMiMuMeMoMeMiMoMa' },
  { team_name: 'PH21' },
  { team_name: 'Piazza' },
  { team_name: 'Wongwan' },
  { team_name: 'Setwang' }
]

const competition_teams_column = [
  'team_name'
]

const projects = [
  {
    project_name: '',
    project_description: ''
  },
  {
    project_name: '',
    project_description: ''
  },
  {
    project_name: '',
    project_description: ''
  },
  {
    project_name: '',
    project_description: ''
  },
  {
    project_name: '',
    project_description: ''
  },
  {
    project_name: '',
    project_description: ''
  },
  {
    project_name: '',
    project_description: ''
  },
  {
    project_name: '',
    project_description: ''
  },
  {
    project_name: '',
    project_description: ''
  },
  {
    project_name: '',
    project_description: ''
  }
]

const projects_column = [
  'project_name',
  'project_description'
]

module.exports = {
  faculties,
  punishment_criteria,
  punishment_criteria_column,
  competition_teams,
  competition_teams_column,
  projects,
  projects_column
}
