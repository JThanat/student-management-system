import React, { Component } from 'react'
import Table from '../../../components/table/Table'
import { staticID } from '../../../utils/unique'
import TableConfig from './projectHeader'
import TableConfig2 from './projectListHeader'

class Project extends Component {

  constructor (props) {
    super(props)
    this.tableID = staticID('Project.table')
    this.tableID2 = staticID('ProjectList.table')
  }

  render () {
    const config = TableConfig
    const config2 = TableConfig2
    return (<div>
      <Table id={this.tableID2} config={config2} />
      <Table id={this.tableID} config={config} />
    </div>)
  }
}

export default Project
