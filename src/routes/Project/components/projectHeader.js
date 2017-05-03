import React from 'react'
import { Link } from 'react-router'

import {
  requestAndResponse,
  removeNull,
  convertObjectToQueryParams
} from '../../../utils/query'

import { projectOptionList, studentOptionList } from '../../../utils/tableSelectList'

const projectHeader = [
  {
    title: 'Edit',
    prop: 'edit',
    isEdit: true,
    onEdit: (resolve, reject, data, oldData) => {
      requestAndResponse(
          '../api/project/update', {
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
          '../api/project/delete', {
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
    isEditable: true,
    isNullable: false,
    isVisible: false,
    isAddable: true,
    type: projectOptionList
  },
  {
    title: 'ชื่อโครงการ',
    prop: 'project_name',
    isEditable: false,
    isNullable: true,
    isAddable: false
  },
  {
    title: 'คำอธิบายโครงการ',
    prop: 'project_description',
    isNullable: true,
    isEditable: false,
    isAddable: false
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
    title: 'sid',
    prop: 'sid',
    isEditableVisible: false,
    isEditable: false,
    isVisible: false,
    isNullable: false,
    type: studentOptionList
  },
  {
    title: 'รหัสนิสิต',
    prop: 'student_id',
    isEditable: false,
    isNullable: true,
    isAddable: false
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
  }
]

export default {
  table: {
    name: 'Project Student List',
    onAdd: (resolve, reject, newData) => {
      requestAndResponse(
        '../api/project/insert', {
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
      const url = '../api/project/all?' + convertObjectToQueryParams({
        where: filterStr
      })
      return {
        url
      }
    }
  },
  header: projectHeader,
  pagination: {
    pageSize: 25,
    paginationBarSize: 20
  },
  src: {
    url: '../api/project/all',
    parser: (raw) => raw.data
  }
}
