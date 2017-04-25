import React, { Component } from 'react'
import Table from '../../../components/table/Table'
import { staticID } from '../../../utils/unique'
import StudentHeader from './studentHeader'

class Student extends Component {

  constructor (props) {
    super(props)
    this.tableID = staticID('Student.table')
  }

  render () {
    const config = {
      table: {
        add: (resolve, reject, newData) => {
          console.log('add', newData)
          resolve()
        }
      },
      header: StudentHeader,
      pagination: {
        pageSize: 25,
        paginationBarSize: 10
      },
      src: {
        url: '../api/student/all',
        parser: (raw) => raw.data
      }
    }
    return (<Table id={this.tableID} config={config} />)
  }
}

export default Student
