import React from 'react'

import { requestAndResponse, convertObjectToQueryParams } from '../../../utils/query'
import { competitionTeamOptionList } from '../../../utils/tableSelectList'

const competitionHeader = [
  {
    title: 'Edit',
    prop: 'edit',
    isEdit: true,
    onEdit: (resolve, reject, data) => {
      requestAndResponse(
        '../api/competition/update',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              team_id: data.team_id,
              competition_name: data.competition_name,
              competition_description: data.competition_description,
              prize: data.prize
            }
          })
        },
        resolve,
        reject
      )
    }
  },
  {
    title: 'Delete',
    prop: 'delete',
    isDelete: true,
    formatter: () => <div className='btn btn-danger btn-sm' data-attach-on-delete>Delete</div>,
    onDelete: (resolve, reject, data) => {
      requestAndResponse(
        '../api/competition/delete',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: data
          })
        },
        resolve,
        reject
      )
    }
  },
  {
    title: 'ทีม',
    prop: 'team_id',
    isVisible: false,
    isEditable: false,
    isNullable: false,
    type: competitionTeamOptionList
  },
  {
    title: 'ชื่อทีม',
    prop: 'team_name',
    isVisible: true,
    isEditable: false,
    isNullable: true,
    isAddable: false
  },
  {
    title: 'ชื่อการแข่งขัน',
    prop: 'competition_name',
    isEditable: true,
    isNullable: false
  },
  {
    title: 'รายละเอียดการแข่งขัน',
    prop: 'competition_description',
    isEditable: true,
    isNullable: true
  },
  {
    title: 'รางวัลที่ได้รับ',
    prop: 'prize',
    isEditable: true,
    isNullable: false
  },
  {
    title: 'อาจารย์ที่ปรึกษา',
    prop: 'advisors',
    isEditable: false,
    isNullable: true,
    isAddable: false
  }
]

export default {
  table: {
    onAdd: (resolve, reject, newData) => {
      requestAndResponse(
        '../api/competition/insert',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              team_id: newData.team_id,
              competition_name: newData.competition_name,
              competition_description: newData.competition_description,
              prize: newData.prize
            }
          })
        },
        resolve,
        reject
      )
    },
    filterOptions: (filterStr) => {
      const url = '../api/competition/all?' + convertObjectToQueryParams({
        where: filterStr
      })
      return {
        url
      }
    }
  },
  header: competitionHeader,
  pagination: {
    pageSize: 25,
    paginationBarSize: 20
  },
  src: {
    url: '../api/competition/all',
    parser: (raw) => raw.data
  }
}

