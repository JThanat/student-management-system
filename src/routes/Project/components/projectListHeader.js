import React from 'react'

import {
  requestAndResponse,
  removeNull,
  convertObjectToQueryParams
} from '../../../utils/query'

const projectHeader = [{
  title: 'Edit',
  prop: 'edit',
  isEdit: true,
  onEdit: (resolve, reject, data, oldData) => {
    requestAndResponse(
        '../api/project/list/update', {
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
  formatter: () => < div className='btn btn-danger btn-sm' data-attach-on-delete>Delete</div>,
  onDelete: (resolve, reject, data) => {
    requestAndResponse(
        '../api/project/list/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              student_id: data.student_id,
              project_id: data.project_id
            }
          })
        },
        resolve,
        reject
      )
  }
},
{
  title: 'รหัสโครงการ',
  prop: 'project_id',
  isAddable: false,
  isEditable: false,
  isNullable: true
},
{
  title: 'ชื่อโครงการ',
  prop: 'project_name',
  isAddable: true,
  isEditable: true,
  isNullable: false
},
{
  title: 'คำอธิบายโครงการ',
  prop: 'project_description',
  isAddable: true,
  isEditable: true,
  isNullable: true
}
]

export default {
  table: {
    onAdd: (resolve, reject, newData) => {
      requestAndResponse(
        '../api/project/list/insert', {
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
      const url = '../api/project/list/all?' + convertObjectToQueryParams({
        where: filterStr
      })
      return {
        url
      }
    }
  },
  header: projectHeader,
  pagination: {
    pageSize: 5,
    paginationBarSize: 20
  },
  src: {
    url: '../api/project/list/all',
    parser: (raw) => raw.data
  }
}
