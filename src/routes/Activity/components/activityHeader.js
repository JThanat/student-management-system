import React from 'react'
import { Link } from 'react-router'

import {
  requestAndResponse,
  removeNull,
  convertObjectToQueryParams
} from '../../../utils/query'

const activityHeader = [{
    title: 'Edit',
    prop: 'edit',
    isEdit: true,
    onEdit: (resolve, reject, data, oldData) => {
      requestAndResponse(
        '../api/activity/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: removeNull(data),
            oldData: removeNull(oldData)
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
    formatter: () => <div className = 'btn btn-danger btn-sm' data-attach-on-delete> Delete </div>,
    onDelete: (resolve, reject, data) => {
      requestAndResponse(
        '../api/activity/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              student_id: data.student_id,
              activity_id: data.activity_id
            }
          })
        },
        resolve,
        reject
      )
    }
  },
  {
    title: 'Info',
    prop: 'student_id',
    isEditable: false,
    isAddable: false,
    formatter: (data) => (
      <Link to={'/student-info/' + data}className='btn btn-info btn-sm'>Info</Link>
    )
  },
  {
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
    title: 'รหัสกิจกรรม',
    prop: 'activity_id',
    isEditable: true,
    isNullable: false,
    isAddable: true
  },
  {
    title: 'ชื่อกิจกรรม',
    prop: 'activity_name',
    isEditable: false,
    isNullable: true,
    isAddable: false
  },
  {
    title: 'คำอธิบายกิจกรรม',
    prop: 'activity_description',
    isEditable: false,
    isNullable: true,
    isAddable: false
  },
  {
    title: 'คะแนนที่ได้รับ',
    prop: 'received_score',
    isEditable: true,
    isNullable: false,
    isAddable: true
  },
  {
    title: 'คะแนนเต็ม',
    prop: 'max_score',
    isEditable: false,
    isNullable: true,
    isAddable: false
  }
]

export default {
  table: {
    onAdd: (resolve, reject, newData) => {
      requestAndResponse(
        '../api/activity/insert', {
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
      const url = '../api/activity/all?' + convertObjectToQueryParams({
        where: filterStr
      })
      return {
        url
      }
    }
  },
  header: activityHeader,
  pagination: {
    pageSize: 25,
    paginationBarSize: 20
  },
  src: {
    url: '../api/activity/all',
    parser: (raw) => raw.data
  }
}
