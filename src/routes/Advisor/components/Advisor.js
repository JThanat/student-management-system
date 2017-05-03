import React, { Component, PropTypes } from 'react'
import Table from '../../../components/table/Table'
import { staticID } from '../../../utils/unique'
import TableConfig from './advisorHeader'
import TableConfigProj from './advisorProjHeader'
import TableConfigComp from './advisorCompHeader'

import { connect } from 'react-redux'

class Advisor extends Component {

  static propTypes = {
    advisor_id: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.tableID = staticID('Advisor.table')
    this.tableIDProj = staticID('AdvisorProj.table')
    this.tableIDComp = staticID('AdvisorComp.table')
  }

  render () {
    return (<div>
      <div>{this.props.advisor_id}</div>
      <Table id={this.tableID} config={TableConfig} />
      <hr />
      <Table id={this.tableIDProj} config={TableConfigProj} />
      <hr />
      <Table id={this.tableIDComp} config={TableConfigComp} />
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    advisor_id: state.login.role.substr(7) || '1'
  }
}

export default connect(mapStateToProps)(Advisor)
