import React, { Component } from 'react'
import Table from '../../../components/table/Table'
import { staticID } from '../../../utils/unique'
import TableConfig from './projectHeader'

class Project extends Component {

  constructor (props) {
    super(props)
    this.tableID = staticID('Project.table')
  }

  render () {
    const config = TableConfig
    return (<Table id={this.tableID} config={config} />)
  }
}

export default Project
