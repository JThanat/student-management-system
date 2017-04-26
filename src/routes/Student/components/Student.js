import React, { Component } from 'react'
import Table from '../../../components/table/Table'
import { staticID } from '../../../utils/unique'
import TableConfig from './studentHeader'

class Student extends Component {

  constructor (props) {
    super(props)
    this.tableID = staticID('Student.table')
  }

  render () {
    const config = TableConfig
    return (<Table id={this.tableID} config={config} />)
  }
}

export default Student
