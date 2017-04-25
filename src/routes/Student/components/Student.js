import React, { Component } from 'react'
import Table from '../../../components/table/Table'
import { staticID } from '../../../utils/unique'

// import { Link } from 'react-router'

class Student extends Component {

  constructor (props) {
    super(props)
    this.tableID = staticID('Student.table')
  }

  render () {
    const config = {
      table: {
        add: (resolve, reject, newData) => {
          console.log(newData)
          resolve()
        }
      },
      header: [
        {
          title: 'Student ID',
          prop: 'student_id',
          isEditable: false
        },
        {
          title: 'Title',
          prop: 'title'
        },
        {
          title: 'First Name',
          prop: 'firstname'
        },
        {
          title: 'Last Name',
          prop: 'lastname'
        },
        {
          title: 'Email',
          prop: 'email'
        },
        {
          title: 'Birthday',
          prop: 'birthday'
        },
        {
          title: 'Gender',
          prop: 'gender'
        },
        {
          title: 'Citizen ID',
          prop: 'citizen_id'
        },
        {
          title: 'Nationality',
          prop: 'nationality'
        },
        {
          title: 'Edit',
          prop: 'edit',
          isEdit: true,
          onUpdate: (resolve, reject, data) => {
            setTimeout(() => resolve(data), 500)
          }
        },
        {
          title: 'Delete',
          prop: 'delete',
          isDelete: true,
          formatter: () => <div className='btn btn-danger btn-sm' data-attach-on-delete>Delete</div>,
          onDelete: (resolve, reject, data) => {
            setTimeout(() => resolve(), 500)
          }
        }
      ],
      pagination: {
        pageSize: 10,
        paginationBarSize: 5
      },
      src: {
        url: '../api/student/all',
        parser: (raw) => raw.data
      }
    }
    return (
      <Table id={this.tableID} config={config} />
    )
  }
}

export default Student
