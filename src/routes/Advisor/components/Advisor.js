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
    let tableConfig = { ...TableConfig }
    tableConfig.src = {
      ...tableConfig.src,
      url: `${TableConfig.src.url}?memberID=${this.props.advisor_id}`
    }
    let tableConfigProj = { ...TableConfigProj }
    tableConfigProj.src = {
      ...tableConfigProj.src,
      url: `${TableConfigProj.src.url}?memberID=${this.props.advisor_id}`
    }
    let tableConfigComp = { ...TableConfigComp }
    tableConfigComp.src = {
      ...tableConfigComp.src,
      url: `${TableConfigComp.src.url}?memberID=${this.props.advisor_id}`
    }
    return (<div>
      <Table id={this.tableID} config={tableConfig} />
      <hr />
      <Table id={this.tableIDProj} config={tableConfigProj} />
      <hr />
      <Table id={this.tableIDComp} config={tableConfigComp} />
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
