import React, { Component } from 'react'
import Table from '../../../components/table/Table'
import { staticID } from '../../../utils/unique'
import TableConfig from './advisorHeader'
import TableConfigProj from './advisorProjHeader'
import TableConfigComp from './advisorCompHeader'

class Advisor extends Component {

  constructor (props) {
    super(props)
    this.tableID = staticID('Advisor.table')
    this.tableIDProj = staticID('AdvisorProj.table')
    this.tableIDComp = staticID('AdvisorComp.table')
  }

  render () {
    const config = TableConfig
    return (<div>
      <Table id={this.tableID} config={config} />
      <Table id={this.tableIDProj} config={TableConfigProj} />
      <Table id={this.tableIDComp} config={TableConfigComp} />
    </div>
    )
  }
}

export default Advisor
