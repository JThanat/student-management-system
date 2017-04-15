import { connect } from 'react-redux'
import { loadTable, changePage, changePageTab, updateRow, deleteRow } from './TableModules'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Table from './Table'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadTable : (src, config) => dispatch(loadTable(src, config, ownProps.id)),
  changePage : (page, config) => dispatch(changePage(page, config, ownProps.id)),
  changePageTab : (startPage) => dispatch(changePageTab(startPage, ownProps.id)),
  updateRow : (rowID, updateData, tableID) => dispatch(updateRow(rowID, updateData, tableID)),
  deleteRow : (rowID, tableID) => dispatch(deleteRow(rowID, tableID))
})

const mapStateToProps = (state, ownProps) => {
  const table = state.table.find((x) => x.id === ownProps.id) || []
  return {
    data: table.data || [],
    isLoading: table.isLoading,
    errorMsg: table.error,
    tableView: table.tableView
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
