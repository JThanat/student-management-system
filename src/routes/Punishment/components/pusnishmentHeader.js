import React from 'react'

import { requestAndResponse, removeNull, convertObjectToQueryParams } from '../../../utils/query'
import { studentOptionList, punishmentCriteriaOptionList } from '../../../utils/tableSelectList'

const punishmentHeader = [
  {
    title: 'Edit',
    prop: 'edit',
    isEdit: true,
    onEdit: (resolve, reject, data, oldData) => {
      requestAndResponse(
        '../api/punishment/update',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: removeNull(data),
            oldData: oldData
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
        '../api/punishment/delete',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              student_id: data.student_id,
              punishment_id: data.punishment_id,
              timestamp: data.timestamp
            }
          })
        },
        resolve,
        reject
      )
    }
  },
  {
    title: 'Student ID',
    prop: 'sid',
    isEditableVisible: false,
    isEditable: false,
    isVisible: false,
    type: studentOptionList
  },
  {
    title: 'รหัสนิสิต',
    prop: 'student_id',
    isEditable: false,
    isAddable: false,
    isNullable: true
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
    title: 'การลงโทษ',
    prop: 'punishment_name',
    isEditable: false,
    isNullable: true,
    isAddable: false
  },
  {
    title: 'รหัสการลงโทษ',
    prop: 'punishment_id',
    isNullable: false,
    type: punishmentCriteriaOptionList
  },
  {
    title: 'วัน-เวลา',
    prop: 'timestamp',
    isEditable: false,
    isNullable: true,
    isAddable: false
  },
  {
    title: 'คะแนนที่ถูกหัก',
    prop: 'score_deduction',
    isEditable: true,
    isNullable: true,
    isAddable: false
  }
]

export default {
  table: {
    onAdd: (resolve, reject, newData) => {
      requestAndResponse(
        '../api/punishment/insert',
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
    },
    filterOptions: (filterStr) => {
      const url = '../api/punishment/all?' + convertObjectToQueryParams({
        where: filterStr
      })
      return {
        url
      }
    }
  },
  header: punishmentHeader,
  pagination: {
    pageSize: 25,
    paginationBarSize: 20
  },
  src: {
    url: '../api/punishment/all',
    parser: (raw) => raw.data
  }
}

