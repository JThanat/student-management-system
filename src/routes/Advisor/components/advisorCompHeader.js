import React from 'react'

import {
  requestAndResponse,
  removeNull,
  convertObjectToQueryParams
} from '../../../utils/query'

const advisorHeader = [{
  title: 'รหัสนิสิต',
  prop: 'student_id',
  isEditable: false,
  isNullable: false,
  isAddable: true
},
{
  title: 'ชื่อจริง',
  prop: 'firstname',
  isEditable: false,
  isNullable: true,
  isAddable: false
},
{
  title: 'นามสกุล',
  prop: 'lastname',
  isEditable: false,
  isNullable: true,
  isAddable: false
},
{
  title: 'ชื่อทีม',
  prop: 'team_name',
  isEditable: false,
  isNullable: true,
  isAddable: false
},
{
  title: 'รายการแข่งขัน',
  prop: 'competition_name',
  isEditable: false,
  isNullable: true,
  isAddable: false
},
{
  title: 'รางวัลที่ได้รับ',
  prop: 'prize',
  isEditable: false,
  isNullable: true,
  isAddable: false
}
]

export default {
  table: {
    filterOptions: (filterStr) => {
      const url = '../api/advisor/advisees?' + convertObjectToQueryParams({
        where: filterStr
      })
      return {
        url
      }
    }
  },
  header: advisorHeader,
  pagination: {
    pageSize: 10,
    paginationBarSize: 20
  },
  src: {
    url: '../api/advisor/competition/advisees',
    parser: (raw) => raw.data
  }
}
