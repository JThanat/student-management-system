import React from 'react'

import { requestAndResponse, removeNull } from '../../../utils/query'

const leaveHeader = [
  {
    title: 'Edit',
    prop: 'edit',
    isEdit: true,
    onEdit: (resolve, reject, data, oldData) => {
      requestAndResponse(
        '../api/leave/update',
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
        '../api/leave/delete',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              student_id: data.student_id,
              leave_id: data.leave_id,
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
    title: 'รหัสนิสิต',
    prop: 'student_id',
    isEditable: false,
    isNullable: true
  },
  {
    title: 'ภาคการศึกษา',
    prop: 'semester',
    isEditable: false,
    isNullable: true,
    isAddable: false
  },
  {
    title: 'ปี',
    prop: 'year',
    isEditable: false,
    isNullable: true,
    isAddable: false
  },
  {
    title: 'ประเภทการลา',
    prop: 'leave_type',
    isEditable: false,
    isNullable: true,
    isAddable: false
  },
  {
    title: 'คำอธิบาย',
    prop: 'leave_description',
    isNullable: false
  }
]

export default {
  table: {
    add: (resolve, reject, newData) => {
      requestAndResponse(
        '../api/leave/insert',
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
  header: leaveHeader,
  pagination: {
    pageSize: 25,
    paginationBarSize: 20
  },
  src: {
    url: '../api/leave/all',
    parser: (raw) => raw.data
  }
}

