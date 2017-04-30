import React from 'react'

import { requestAndResponse, removeNull } from '../../../utils/query'

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
            competition_id: data.competition_id,
            data: removeNull(data)
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
            where: {
              student_id: data.student_id
            }
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
    isNullable: false
  },
  {
    title: 'ชื่อทีม',
    prop: 'team_name',
    isVisible: true,
    isEditable: false,
    isNullable: false
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
    isNullable: true
  }
]

export default {
  table: {
    add: (resolve, reject, newData) => {
      requestAndResponse(
        '../api/competition/insert',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: removeNull(newData)
          })
        },
        resolve,
        reject
      )
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

